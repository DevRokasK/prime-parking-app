import { makeObservable, observable, action } from 'mobx';

export interface IErrorItem {
    error: number;
    message: string;
}

export class ClassError extends Error implements IErrorItem {
    @observable public error: number;
    @observable public message: string;

    public constructor(data: IErrorItem) {
        super();
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IErrorItem) {
        this.error = data.error;
        this.message = data.message;
    }
}