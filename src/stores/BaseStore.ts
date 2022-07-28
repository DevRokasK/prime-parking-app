import { observable, action, computed } from 'mobx';
import { ErrorModel } from '../model/Error';

export class BaseStore {
    @observable public loading: boolean = false;
    @observable public running: boolean = false;
    @observable public error: ErrorModel = null;
    @observable public success: ErrorModel = null;

    @computed get hasError(): boolean {
        return this.error ? true : false;
    }

    @computed get hasSuccess(): boolean {
        return this.success ? true : false;
    }

    @computed get errorMessage(): string {
        let result = "";
        if (this.error) {
            result = this.error.message;
        }
        return result;
    }

    @computed get successMessage(): string {
        let result = "";
        if (this.success) {
            result = this.success.message;
        }
        return result;
    }

    @action
    public showError(error: ErrorModel) {
        this.error = error;
    }

    @action
    public showSuccess(success: ErrorModel) {
        this.success = success;
    }

    @action
    public clearError = () => {
        this.error = null;
        this.success = null;
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