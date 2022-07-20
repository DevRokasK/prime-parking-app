import { observable, action, computed } from 'mobx';
import { ErrorModel } from '../model/Error';

export class BaseStore {
    @observable public loading: boolean = false;
    @observable public running: boolean = false;
    @observable public error: ErrorModel = null;

    @computed get hasError(): boolean {
        return this.error ? true : false;
    }

    @computed get errorMessage(): string {
        let result = "";
        if (this.error) {
            result = this.error.error + ": " + this.error.message;
        }
        return result;
    }

    @action
    public showError(error: ErrorModel) {
        this.error = error;
    }

    @action
    public clearError = () => {
        this.error = null;
    }

    @action
    public startLoading(): void {
        this.loading = true;
    }

    @action
    public endLoading(): void {
        this.loading = false;
    }

    @action
    public startRunning(): void {
        this.running = true;
    }

    @action
    public endRunning(): void {
        this.running = false;
    }
}