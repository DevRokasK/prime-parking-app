import { CarStore } from './CarStore';
import { Permitstore } from './PermitStore';
import {observable} from 'mobx';

export class RootStore {
    @observable public CarStore: CarStore;
    @observable public PemitStore: Permitstore;
    private rootStore: RootStore;
    //Cars store
    //Atvykimu isvykimu storeas

    public constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.CarStore = new CarStore();
        this.PemitStore = new Permitstore();
    }
}
