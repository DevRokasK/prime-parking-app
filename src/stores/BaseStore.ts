import { observable, action, computed } from 'mobx';
import { ErrorModel } from '../model/Error';

export class BaseStore {
    @observable public loading: boolean = false;
    @observable public running: boolean = false;
    @observable public error: ErrorModel = null;
    @observable public success: ErrorModel = null;

    // Returns true, if error is not null
    @computed get hasError(): boolean {
        return this.error ? true : false;
    }

    // Returns true, if success is not null
    @computed get hasSuccess(): boolean {
        return this.success ? true : false;
    }

    // Returns error message as string
    @computed get errorMessage(): string {
        let result = "";
        if (this.error) {
            result = this.error.message;
        }
        return result;
    }

    // Returns success message as string
    @computed get successMessage(): string {
        let result = "";
        if (this.success) {
            result = this.success.message;
        }
        return result;
    }

    // Show error on screen
    @action
    public showError(error: ErrorModel) {
        this.error = error;
    }

    // Show success on screen
    @action
    public showSuccess(success: ErrorModel) {
        this.success = success;
    }

    // Sets error and success to null
    @action
    public clearError = () => {
        this.error = null;
        this.success = null;
    }

    // Sets loading to true
    @action
    public startLoading(): void {
        this.loading = true;
    }

    // Sets loading to false
    @action
    public endLoading(): void {
        this.loading = false;
    }

    // Sets running to true
    @action
    public startRunning(): void {
        this.running = true;
    }

    // Sets running to false
    @action
    public endRunning(): void {
        this.running = false;
    }
}