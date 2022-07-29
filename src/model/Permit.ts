import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { Utils } from './Utils';
import { BaseStore } from '../stores/BaseStore';
import { ErrorModel } from './Error';
import { PermitStore } from '../stores/PermitStore';

export interface IPermitItem {
    id: string;
    carId: string;
    from: Date;
    to: Date;
    entered: Date;
    left: Date;
    state: number;
}

export enum PermitState {
    planned = 0,
    inTerritory = 1,
    completed = 2,
    missed = 3

}

export enum PanelState {
    Display,
    Edit
}

export class Permit extends BaseStore implements IPermitItem {
    public store: PermitStore = null;
    @observable public isDirty: boolean = false;
    @observable public data: IPermitItem;
    @observable public id: string;
    @observable public carId: string;
    @observable public from: Date;
    @observable public to: Date;
    @observable public entered: Date;
    @observable public left: Date;
    @observable public state: PermitState;
    @observable public panelState: PanelState;

    // Returns formated Date as string
    @computed get regFromText(): string {
        return Utils.formatDate(this.from);
    }

    @computed get regToText(): string {
        return Utils.formatDate(this.to);
    }

    @computed get regEnteredText(): string {
        return Utils.formatDate(this.entered);
    }

    @computed get regLeftText(): string {
        return Utils.formatDate(this.left);
    }
    //--------------------------------

    // Returns permitState as string
    @computed get regStatus(): string {
        let status = "";
        switch (this.state) {
            case PermitState.planned:
                status = "Planned";
                break;
            case PermitState.inTerritory:
                status = "In Territory";
                break;
            case PermitState.completed:
                status = "Completed";
                break;
            default:
                status = "Missed";
                break;
        }
        return status;
    }

    // Returns true, if panelState is set to display
    @computed get readOnly(): boolean {
        return this.panelState === PanelState.Display ? true : false;
    }

    // Returns true, if permitState is set to completed or missed
    @computed get isEditable(): boolean {
        return this.state === PermitState.completed || this.state === PermitState.missed ? false : true;
    }

    public constructor(data: IPermitItem, store: PermitStore) {
        super()
        makeObservable(this);
        this.initFromData(data);
        if (store) {
            this.store = store;
        }
    }

    @action
    public initFromData(data: IPermitItem) {
        this.data = data;
        this.id = data.id;
        this.carId = data.carId;
        if (data.from) {
            this.from = new Date(data.from);
        }
        if (data.to) {
            this.to = new Date(data.to);
        }
        if (data.entered) {
            this.entered = new Date(data.entered);
        }
        if (data.left) {
            this.left = new Date(data.left);
        }
        this.state = data.state;
        this.panelState = PanelState.Display;
    }
    // Returns true, if all Permit characteristics are not empty
    public isValid(): boolean {
        if (this.carId === "" ||
            this.from === null ||
            this.to === null ||
            this.entered === null ||
            this.left === null ||
            this.state === null
        ) {
            return false;
        } else {
            return true;
        }
    }

    // Converts Permit object to JSON
    public toJson(): string {
        return JSON.stringify({
            id: this.id,
            carId: this.carId,
            from: this.from,
            to: this.to,
            entered: this.entered,
            left: this.left,
            state: this.state
        });
    }

    // Switches Permit panelState to display
    @action
    public cancelEdit(): void {
        if (this.isDirty) {
            this.initFromData(this.data);
            this.isDirty = false;
        }
        this.panelState = PanelState.Display;
    }

    @action
    public setCarId(value: string): void {
        this.carId = value;
        this.isDirty = true;
    }

    @action
    public setFrom(value: Date): void {
        this.from = value;
        this.isDirty = true;
    }

    @action
    public setTo(value: Date): void {
        this.to = value;
        this.isDirty = true;
    }

    @action
    public setEntered(value: Date): void {
        this.entered = value;
        this.isDirty = true;
    }

    @action
    public setLeft(value: Date): void {
        this.left = value;
        this.isDirty = true;
    }

    @action
    public setState(value: number): void {
        this.state = value;
        this.isDirty = true;
    }

    // Updates or Creates a Permit object
    @action
    public async SaveEdit(): Promise<boolean> {
        let result = false;
        if (this.id === "") {
            result = await this.create();
            if (result) {
                runInAction(() => {
                    this.panelState = PanelState.Display;
                });
            }
        } else {
            result = await this.update();
            if (result) {
                runInAction(() => {
                    this.panelState = PanelState.Display;
                });
            }
        }
        return result;
    }

    // POST new Permit to api
    private async create(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const postResult = await service.PostPermit(this);
                    if ((postResult as ErrorModel).error) {
                        this.showError(postResult as ErrorModel);
                    } else {
                        runInAction(() => {
                            this.initFromData(postResult as IPermitItem);
                            this.store.AddToStore(this);
                            this.store.CurrentPermit = this;
                            result = true;
                        });
                    }
                } catch (error) {
                    this.showError(error);
                }
            } else {
                this.showError(new ErrorModel({ error: 400, message: "Fill in all the tabs" }));
            }
        } else {
            this.showError(new ErrorModel({ error: 400, message: "System error" }));
        }
        return result;
    }

    // PUT Permit to api
    private async update(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const putResult = await service.PutPermit(this);
                    if (putResult && (putResult as ErrorModel).error) {
                        this.showError(putResult as ErrorModel);
                    } else {
                        result = true;
                    }
                } catch (error) {
                    this.showError(error);
                }
            } else {
                this.showError(new ErrorModel({ error: 400, message: "Fill in all the tabs" }));
            }
        } else {
            this.showError(new ErrorModel({ error: 400, message: "System error" }));
        }
        return result;
    }

    // Deletes a Permit from array
    public async DeletePermit(): Promise<boolean> {
        let result = false;
        result = await this.delete();
        if (result) {
            const index = this.store.Permits.indexOf(this);
            if (index > -1) {
                this.store.Permits.splice(index, 1);
                this.store.DeletePermit();
            }
        }
        return result;
    }

    // DELETE Permit from api
    private async delete(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const deleteResult = await service.DeletePermit(this.id);
                    if (deleteResult && (deleteResult as ErrorModel).error) {
                        this.showError(deleteResult as ErrorModel);
                    } else {
                        result = true;
                    }
                } catch (error) {
                    this.showError(error);
                }
            } else {
                this.showError(new ErrorModel({ error: 400, message: "Fill in all the tabs" }));
            }
        } else {
            this.showError(new ErrorModel({ error: 400, message: "System error" }));
        }
        return result;
    }

    // Switches Permit panelState to edit
    @action
    public SwitchToEdit() {
        this.panelState = PanelState.Edit;
    }

    // Switches Permit panelState to display
    @action
    public SwitchToDisplay() {
        this.cancelEdit();
    }
}