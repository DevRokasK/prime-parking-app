import { Vehicle, IVehicleItem, PanelState } from "../model/Vehicle";
import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import { RootStore } from "./RootStore";
import { BaseStore } from "./BaseStore";

export class VehicleStore extends BaseStore {
    public RootStore: RootStore;
    @observable public Vehicles: Vehicle[] = [];
    @observable public SelectedVehicles: Vehicle[] = [];
    @observable public CurrentVehicle: Vehicle = null;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);
        this.RootStore = rootStore;
    }

    @computed get isVehicleSelected(): boolean {
        return this.CurrentVehicle != null;
    }

    @action
    public SetSelectedVehicles(data: Vehicle[]) {
        this.SelectedVehicles = data;
    }

    @action
    public SetCurrentVehicle(data: Vehicle): void {
        this.CurrentVehicle = data;
    }

    @action
    public DeselectVehicle(cancelEdit?: boolean) {
        this.CurrentVehicle = null;
    }

    @action
    public async Init() {
        this.startLoading();
        this.Vehicles = [];
        const vehicles = await this.RootStore.Service.GetVehicles();
        runInAction(() => {
            this.Vehicles = vehicles.map(value => {
                const vehicle = new Vehicle(value, this);
                return vehicle;
                //result.push(vehicle);
            });
        });
        this.endLoading();
    }

    @action
    public AddToStore(data: Vehicle) {
        this.Vehicles.push(data);
    }

    @action
    public AddVehicle() {
        const newItem: IVehicleItem = {
            id: '',
            carNumber: '',
            make: '',
            model: '',
            registrationYear: null,
            registrationPlace: '',
            fuelType: '',
            enginePower: 0,
            engineTorque: 0,
            color: '',
            doors: 0
        };
        let newVehicle: Vehicle = new Vehicle(newItem, this);
        newVehicle.panelState = PanelState.Edit;
        this.SetCurrentVehicle(newVehicle);
    }

    @action
    public EditVehicle() {
        if (this.SelectedVehicles !== null && this.SelectedVehicles.length === 1)
            this.SelectedVehicles[0].panelState = PanelState.Edit;
        this.SetCurrentVehicle(this.SelectedVehicles[0]);
    }


}