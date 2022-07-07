import { Permit } from '../model/Permit';
import { observable, action, makeObservable, computed } from 'mobx';
import { RootStore } from './RootStore';
import { BaseStore } from './BaseStore';

export class PermitStore extends BaseStore {
    private RootStore: RootStore;
    @observable public Permits: Permit[] = [];
    @observable public SelectedPermit: Permit = null;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);
        this.RootStore = rootStore;
    }

    @computed get IsPermitSelected(): boolean {
        return this.SelectedPermit != null;
    }

    @action
    public async Init() {
        this.startLoading();
        this.Permits = [];
        this.Permits = await this.RootStore.Service.GetPermits();
        this.endLoading();
    }
}