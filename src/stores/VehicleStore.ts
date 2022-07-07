import { Vehicle } from "../model/Vehicle";
import { observable, action, makeObservable, computed } from 'mobx';
import { RootStore } from "./RootStore";
import { BaseStore } from "./BaseStore";

export class VehicleStore extends BaseStore {
    private RootStore: RootStore;
    @observable public Vehicles: Vehicle[] = [];
    @observable public SelectedVehicle: Vehicle = null;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);
        this.RootStore = rootStore;
    }

    @computed get isVehicleSelected(): boolean {
        return this.SelectedVehicle != null;
    }

    @action
    public DeselectVehicle() {
        this.SelectedVehicle = null;
    }

    @action
    public async Init() {
        this.startLoading();
        this.Vehicles = [];
        this.Vehicles = await this.RootStore.Service.GetVehicles();
        this.endLoading();
    }
}