import { Permit, IPermitItem, PanelState } from '../model/Permit';
import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import { BaseStore } from './BaseStore';
import { ErrorModel } from "../model/Error";

export class PermitStore extends BaseStore {
    public RootStore: RootStore;
    @observable public Permits: Permit[] = [];
    @observable public SelectedPermits: Permit[] = [];
    @observable public CurrentPermit: Permit = null;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);
        this.RootStore = rootStore;
    }

    @computed get IsPermitSelected(): boolean {
        return this.CurrentPermit != null;
    }

    @action
    public SetSelectedPermits(data: Permit[]) {
        this.SelectedPermits = data;
    }

    @action
    public SetCurrentPermit(data: Permit): void {
        this.CurrentPermit = data;
    }

    @action
    public DeselectPermit(cancelEdit?: boolean) {
        this.CurrentPermit = null;
    }

    @action
    public async Init() {
        this.startLoading();
        this.startRunning();
        this.Permits = [];
        const permits = await this.RootStore.Service.GetPermits();
        runInAction(() => {
            this.Permits = permits.permitList.map(value => {
                const permit = new Permit(value, this);
                return permit;
            });
        });
        this.endRunning();
        this.endLoading();
    }

    @action
    public AddToStore(data: Permit) {
        this.Permits.push(data);
    }

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

    @action
    public EditPermit() {
        if (this.SelectedPermits !== null && this.SelectedPermits.length === 1)
            this.SelectedPermits[0].panelState = PanelState.Edit;
        this.SetCurrentPermit(this.SelectedPermits[0]);
    }

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
}