import { makeObservable, observable, computed, action } from 'mobx';

interface IPermitItem {
    carId: string;
    from: Date;
    to: Date;
    entered: Date;
    left: Date;
    state: string;
}

export class Permit implements IPermitItem {
    @observable public carId: string;
    @observable public from: Date;
    @observable public to: Date;
    @observable public entered: Date;
    @observable public left: Date;
    @observable public state: string;

    public constructor(data: IPermitItem) {
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IPermitItem) {
        this.carId = data.carId;
        this.from = data.from;
        this.to = data.to;
        this.entered = data.entered;
        this.left = data.left;
        this.state = data.state;
    }

    @computed get regFromText(): string {
        let date = this.from.getDate() + '-' +
            this.from.getMonth() + '-' +
            this.from.getFullYear();
        return date;
    }

    @computed get regToText(): string {
        let date = this.to.getDate() + '-' +
            this.to.getMonth() + '-' +
            this.to.getFullYear();
        return date;
    }

    @computed get regEnteredText(): string {
        let date = this.entered.getDate() + '-' +
            this.entered.getMonth() + '-' +
            this.entered.getFullYear();
        return date;
    }

    @computed get regLeftText(): string {
        let date = this.left.getDate() + '-' +
            this.left.getMonth() + '-' +
            this.left.getFullYear();
        return date;
    }
}