import { makeObservable, observable, computed, action } from 'mobx';

interface IPermitItem {
    carId: string;
    stayFrom: Date;
    stayUntil: Date;
    entered: Date;
    left: Date;
    state: string;
}

export class Permit implements IPermitItem {
    @observable public carId: string;
    @observable public stayFrom: Date;
    @observable public stayUntil: Date;
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
        this.stayFrom = data.stayFrom;
        this.stayUntil = data.stayUntil;
        this.entered = data.entered;
        this.left = data.left;
        this.state = data.state;
    }

    @computed get regFromText(): string {
        let date = this.stayFrom.getDate() + '-' +
            this.stayFrom.getMonth() + '-' +
            this.stayFrom.getFullYear();
        return date;
    }

    @computed get regToText(): string {
        let date = this.stayUntil.getDate() + '-' +
            this.stayUntil.getMonth() + '-' +
            this.stayUntil.getFullYear();
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