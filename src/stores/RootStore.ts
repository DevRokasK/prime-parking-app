import { VehicleStore } from './VehicleStore';
import { PermitStore } from './PermitStore';
import { observable } from 'mobx';
import { IPrimeParkingService } from '../services/IPrimeParkingService';
import { RestService } from '../services/RestService';

export class RootStore {
    public Service: IPrimeParkingService;
    @observable public VehiclesStore: VehicleStore;
    @observable public PermitStore: PermitStore;

    public constructor() {
        this.Service = new RestService();
        this.VehiclesStore = new VehicleStore(this);
        this.PermitStore = new PermitStore(this);
    }
}
