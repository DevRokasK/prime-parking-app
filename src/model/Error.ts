import { makeObservable, observable, action } from 'mobx';

export interface IClassErrorItem {
    error: number;
    message: string;
}

export class ClassError extends Error implements IClassErrorItem {
    @observable public error: number;
    @observable public message: string;

    public constructor(data: IClassErrorItem) {
        super();
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IClassErrorItem) {
        this.error = data.error;
        this.message = data.message;
    }
}