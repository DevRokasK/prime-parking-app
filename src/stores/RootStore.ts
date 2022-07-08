import { VehicleStore } from './VehicleStore';
import { PermitStore } from './PermitStore';
import {observable} from 'mobx';
import { IPrimeParkingService } from '../services/IPrimeParkingService';
//import { MockService } from '../services/MockService';
import { RestService } from '../services/RestService';

export class RootStore {
    public Service: IPrimeParkingService;
    @observable public VehiclesStore: VehicleStore;
    @observable public PermitStore: PermitStore;
    //private rootStore: RootStore;
    //Cars store
    //Atvykimu isvykimu storeas

    public constructor() {
        //this.rootStore = rootStore;
        //this.Service = new MockService();
        this.Service = new RestService();
        this.VehiclesStore = new VehicleStore(this);
        this.PermitStore = new PermitStore(this);
    }
}
