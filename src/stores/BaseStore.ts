import { observable, action } from 'mobx';

export class BaseStore {
    @observable public loading: boolean = false;

    @action 
    public startLoading(): void {
        this.loading = true;
    }

    @action 
    public endLoading(): void {
        this.loading = false;
    }
}