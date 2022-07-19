import { makeObservable, observable, action } from 'mobx';

export interface IErrorModelItem {
    error: number;
    message: string;
}

export class ErrorModel implements IErrorModelItem {
    @observable public error: number;
    @observable public message: string;

    public constructor(data: IErrorModelItem) {   
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IErrorModelItem) {
        this.error = data.error;
        this.message = data.message;
    }
}