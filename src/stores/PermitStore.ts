import { Permit, IPermitItem, PanelState } from '../model/Permit';
import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import { BaseStore } from './BaseStore';
import { ErrorModel } from "../model/Error";
import { Vehicle } from "../model/Vehicle"
import { IComboBoxOption } from '@fluentui/react';
import { IGetPermitResult } from '../model/IGetPermitResult';

export class PermitStore extends BaseStore {
    public RootStore: RootStore;
    @observable public Permits: Permit[] = [];
    @observable public SelectedPermits: Permit[] = [];
    @observable public CurrentPermit: Permit = null;
    @observable public token: string = "";
    @observable public state: string = null;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);
        this.RootStore = rootStore;
    }

    // Returns true , if CurrentPermit is not empty
    @computed get IsPermitSelected(): boolean {
        return this.CurrentPermit != null;
    }

    // On selection/deselection update SelectedPermits array
    @action
    public SetSelectedPermits(data: Permit[]) {
        this.SelectedPermits = data;
    }

    // Select a CurrentPermit
    @action
    public SetCurrentPermit(data: Permit): void {
        this.CurrentPermit = data;
    }

    // On panel dismis, CurrentPermit is deselected
    @action
    public DeselectPermit(cancelEdit?: boolean) {
        this.CurrentPermit = null;
    }

    // GET Permits data from api
    @action
    public async Init(permitState?: string) {
        this.clearError();
        this.startLoading();
        this.startRunning();
        if (this.state !== permitState) {
            this.Permits = [];
            this.state = permitState;
            this.token = "";
        }
        let permits: IGetPermitResult = null;
        if (this.token !== "") {
            if (this.Permits[this.Permits.length - 1] === null) {
                this.Permits.pop();
            }
            permits = await this.RootStore.Service.GetPermits(30, permitState, this.token);
        } else {
            this.Permits = [];
            permits = await this.RootStore.Service.GetPermits(30, permitState);
        }
        if (permits.permitList.length !== 0 || this.Permits.length !== 0) {
            if (permits.permitList.length !== 0) {
                runInAction(() => {
                    permits.permitList.forEach(value => {
                        const permit = new Permit(value, this);
                        this.Permits.push(permit);
                    });
                    this.token = permits.continuationToken;
                    if (this.token !== "") {
                        this.Permits.push(null);
                    }
                });
            }
        } else {
            this.showError(new ErrorModel({ error: 404, message: "No permits in given state" }));
        }
        this.endRunning();
        this.endLoading();
    }

    // Adds a Permit to Permits array
    @action
    public AddToStore(data: Permit) {
        this.Permits.push(data);
    }

    // Creates new Permit and sets it as CurrentPermit
    @action
    public AddPermit() {
        const newItem: IPermitItem = {
            id: '',
            carId: '',
            from: null,
            to: null,
            entered: null,
            left: null,
            state: 0
        };
        let newPermit: Permit = new Permit(newItem, this);
        newPermit.panelState = PanelState.Edit;
        this.SetCurrentPermit(newPermit);
    }

    // Sets SelectedPermit as CurrentPermit
    @action
    public EditPermit() {
        if (this.SelectedPermits !== null && this.SelectedPermits.length === 1)
            this.SelectedPermits[0].panelState = PanelState.Edit;
        this.SetCurrentPermit(this.SelectedPermits[0]);
    }

    // Deletes SelectedPermits from Permits array
    @action
    public async DeletePermit() {
        this.startRunning();
        try {
            if (this.SelectedPermits !== null) {
                const selectedPermits = this.SelectedPermits.slice();
                for (let i = 0; i < selectedPermits.length; i++) {
                    let result = false;
                    result = await this.Delete(selectedPermits[i].id);
                    if (result) {
                        const index = this.Permits.indexOf(selectedPermits[i]);
                        if (index > -1) {
                            this.Permits.splice(index, 1);
                        }
                    }
                }
            }
        } catch {
            this.showError(this.error);
        }
        this.endRunning();
    }

    // DELETE Permits from api
    private async Delete(id: string): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this && this.RootStore.Service) {
            const service = this.RootStore.Service;
            try {
                const deleteResult = await service.DeletePermit(id);
                if (deleteResult && (deleteResult as ErrorModel).error) {
                    this.showError(deleteResult as ErrorModel);
                } else {
                    result = true;
                }
            } catch (error) {
                this.showError(error);
            }
        } else {
            this.showError(new ErrorModel({ error: 400, message: "System error" }));
        }
        return result;
    }

    // Get Permits data from api for drop down options
    public async ResolveVehicles(): Promise<IComboBoxOption[]> {
        let Vehicles: IComboBoxOption[] = [];
        const vehicles = await this.RootStore.Service.GetVehicles(50);
        runInAction(() => {
            Vehicles = vehicles.carList.map(value => {
                const vehicle = new Vehicle(value, null);
                const option = { key: vehicle.id, text: vehicle.carNumber, data: vehicle }
                return option;
            });
        });
        return Vehicles;
    }
}