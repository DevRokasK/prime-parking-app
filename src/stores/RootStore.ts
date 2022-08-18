import { VehicleStore } from './VehicleStore';
import { PermitStore } from './PermitStore';
import { action, makeObservable, observable } from 'mobx';
import { IPrimeParkingService } from '../services/IPrimeParkingService';
import { RestService } from '../services/RestService';
import { Gate } from './Gate';

export class RootStore {
    public Service: IPrimeParkingService;
    @observable public VehiclesStore: VehicleStore;
    @observable public PermitStore: PermitStore;
    @observable public Gates: Gate;
    @observable public isHamburgerOpen: boolean = false;

    public constructor() {
        makeObservable(this);
        this.Service = new RestService();
        this.VehiclesStore = new VehicleStore(this);
        this.PermitStore = new PermitStore(this);
        this.Gates = new Gate(this);
    }

    @action
    public ToggleHamburgerOpen = () => {
        this.isHamburgerOpen = true;
    }

    @action
    public ToggleHamburgerClose = () => {
        this.isHamburgerOpen = false;
    }
}
