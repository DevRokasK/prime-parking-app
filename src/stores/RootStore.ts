import { VehicleStore } from './VehicleStore';
import { PermitStore } from './PermitStore';
import { observable } from 'mobx';
import { IPrimeParkingService } from '../services/IPrimeParkingService';
import { RestService } from '../services/RestService';
import { Gate } from './Gate';

export class RootStore {
    public Service: IPrimeParkingService;
    @observable public VehiclesStore: VehicleStore;
    @observable public PermitStore: PermitStore;
    @observable public Gates: Gate;

    public constructor() {
        this.Service = new RestService();
        this.VehiclesStore = new VehicleStore(this);
        this.PermitStore = new PermitStore(this);
        this.Gates = new Gate(this);
    }
}
