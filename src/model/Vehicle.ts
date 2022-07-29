import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { Utils } from './Utils';
import { BaseStore } from '../stores/BaseStore';
import { ErrorModel } from './Error';
import { VehicleStore } from '../stores/VehicleStore';

export interface IVehicleItem {
    id: string;
    carNumber: string;
    make: string;
    model: string;
    registrationYear: Date;
    registrationPlace: string;
    fuelType: string;
    enginePower: number;
    engineTorque: number;
    color: string;
    doors: number;
}
export enum PanelState {
    Display,
    Edit
}

export class Vehicle extends BaseStore implements IVehicleItem {
    public store: VehicleStore = null;
    @observable public isDirty: boolean = false;
    @observable public data: IVehicleItem;
    @observable public id: string;
    @observable public carNumber: string;
    @observable public make: string;
    @observable public model: string;
    @observable public registrationYear: Date;
    @observable public registrationPlace: string;
    @observable public fuelType: string;
    @observable public enginePower: number;
    @observable public engineTorque: number;
    @observable public color: string;
    @observable public doors: number;
    @observable public panelState: PanelState;

    // Returns formated Date as string
    @computed get regDateText(): string {
        return Utils.formatDate(this.registrationYear);
    }

    // Returns enginePower as string
    @computed get regEnginePower(): string {
        let result = "";
        if (this.enginePower > 0) {
            result = this.enginePower.toString();
        }
        return result;
    }

    // Returns engineTorque as string
    @computed get regEngineTorque(): string {
        let result = "";
        if (this.engineTorque > 0) {
            result = this.engineTorque.toString();
        }
        return result;
    }

    // Returns doors count as string
    @computed get regDoors(): string {
        let result = "";
        if (this.doors > 0) {
            result = this.doors.toString();
        }
        return result;
    }

    // Returns true, if panelState is set to display
    @computed get readOnly(): boolean {
        return this.panelState === PanelState.Display ? true : false;
    }

    public constructor(data: IVehicleItem, store: VehicleStore) {
        super();
        makeObservable(this);
        this.initFromData(data);
        if (store) {
            this.store = store;
        }
    }

    @action
    public initFromData(data: IVehicleItem) {
        this.data = data;
        this.id = data.id;
        this.carNumber = data.carNumber;
        this.make = data.make;
        this.model = data.model;
        if (data.registrationYear) {
            this.registrationYear = new Date(data.registrationYear);
        }
        this.registrationPlace = data.registrationPlace;
        this.fuelType = data.fuelType;
        this.enginePower = data.enginePower;
        this.engineTorque = data.engineTorque;
        this.color = data.color;
        this.doors = data.doors;
        this.panelState = PanelState.Display;
    }

    // Returns true, if all Vehicle Characteristics are not empty
    public isValid(): boolean {
        if (this.carNumber === "" ||
            this.make === "" ||
            this.model === "" ||
            this.registrationYear === null ||
            this.registrationPlace === "" ||
            this.fuelType === "" ||
            this.enginePower === 0 ||
            this.engineTorque === 0 ||
            this.color === "" ||
            this.doors === 0) {
            return false;
        } else {
            return true;
        }
    }

    // Converts Vehicle object to JSON
    public toJson(): string {
        return JSON.stringify({
            id: this.id,
            carNumber: this.carNumber,
            make: this.make,
            model: this.model,
            registrationYear: this.registrationYear,
            registrationPlace: this.registrationPlace,
            fuelType: this.fuelType,
            enginePower: this.enginePower,
            engineTorque: this.engineTorque,
            color: this.color,
            doors: this.doors
        });
    }

    // Switches Vehicle panelState to display
    @action
    public cancelEdit(): void {
        if (this.isDirty) {
            this.initFromData(this.data);
            this.isDirty = false;
        }
        this.panelState = PanelState.Display;
    }

    @action
    public setCarNumber(value: string): void {
        this.carNumber = value;
        this.isDirty = true;
    }

    @action
    public setMake(value: string): void {
        this.make = value;
        this.isDirty = true;
    }

    @action
    public setModel(value: string): void {
        this.model = value;
        this.isDirty = true;
    }

    @action
    public setRegistrationYear(value: Date): void {
        this.registrationYear = value;
        this.isDirty = true;
    }

    @action
    public setRegistrationPlace(value: string): void {
        this.registrationPlace = value;
        this.isDirty = true;
    }

    @action
    public setFuelType(value: string): void {
        this.fuelType = value;
        this.isDirty = true;
    }

    @action
    public setEnginePower(value: string): void {
        this.enginePower = Number(value);
        this.isDirty = true;
    }

    @action
    public setEngineTorque(value: string): void {
        this.engineTorque = Number(value);
        this.isDirty = true;
    }

    @action
    public setColor(value: string): void {
        this.color = value;
        this.isDirty = true;
    }

    @action
    public setDoors(value: string): void {
        this.doors = Number(value);
        this.isDirty = true;
    }

    // Updates or Creates a Vehicle object
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

    // POST new Vehicle to api
    private async create(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const postResult = await service.PostVehicle(this);
                    if ((postResult as ErrorModel).error) {
                        this.showError(postResult as ErrorModel);
                    } else {
                        runInAction(() => {
                            this.initFromData(postResult as IVehicleItem);
                            this.store.AddToStore(this);
                            this.store.CurrentVehicle = this;
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

    // PUT Vehicle to api
    private async update(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const putResult = await service.PutVehicle(this);
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

    // Deletes a Vehicle from array
    public async DeleteVehicle(): Promise<boolean> {
        let result = false;
        result = await this.delete();
        if (result) {
            const index = this.store.Vehicles.indexOf(this);
            if (index > -1) {
                this.store.Vehicles.splice(index, 1);
                this.store.DeselectVehicle();
            }
        }
        return result;
    }

    // DELETE Vehicle from api
    private async delete(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this.store && this.store.RootStore.Service) {
            if (this.isValid()) {
                const service = this.store.RootStore.Service;
                try {
                    const deleteResult = await service.DeleteVehicle(this.id);
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

    // Switches Vehicle panelState to edit
    @action
    public SwitchToEdit() {
        this.panelState = PanelState.Edit;
    }

    // Switches Vehicle panelState to display
    @action
    public SwitchToDisplay() {
        this.cancelEdit();
    }
}