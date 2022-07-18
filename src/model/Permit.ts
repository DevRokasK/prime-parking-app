import { makeObservable, observable, computed, action } from 'mobx';

export interface IPermitItem {
    id: string;
    carId: string;
    from: Date;
    to: Date;
    entered: Date;
    left: Date;
    state: number;
}

export enum PermitState {
    None = 0,
    Planned = 3,
    InTerritory = 1,
    Completed = 2
}

export class Permit implements IPermitItem {
    @observable public id: string;
    @observable public carId: string;
    @observable public from: Date;
    @observable public to: Date;
    @observable public entered: Date;
    @observable public left: Date;
    @observable public state: PermitState;

    public constructor(data: IPermitItem) {
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IPermitItem) {
        this.id = data.id;
        this.carId = data.carId;
        this.from = new Date(data.from);
        this.to = new Date(data.to);
        this.entered = new Date(data.entered);
        this.left = new Date(data.left);
        this.state = data.state;
    }

    @computed get regFromText(): string {
        let date = "";
        if (this.from) {
            date = this.from.getDate() + '-' +
                this.from.getMonth() + '-' +
                this.from.getFullYear();
        }
        return date;
    }

    @computed get regToText(): string {
        let date = "";
        if (this.to) {
            date = this.to.getDate() + '-' +
                this.to.getMonth() + '-' +
                this.to.getFullYear();
        }
        return date;
    }

    @computed get regEnteredText(): string {
        let date = "";
        if (this.entered) {
            date = this.entered.getDate() + '-' +
                this.entered.getMonth() + '-' +
                this.entered.getFullYear();
        }
        return date;
    }

    @computed get regLeftText(): string {
        let date = "";
        if (this.left) {
            date = this.left.getDate() + '-' +
                this.left.getMonth() + '-' +
                this.left.getFullYear();
        }
        return date;
    }

    @computed get regStatus(): string {
        let status = "";
        switch (this.state) {
            case PermitState.Planned:
                status = "Planned";
                break;
            case PermitState.InTerritory:
                status = "In Territory";
                break;
            case PermitState.Completed:
                status = "Completed";
                break;
            default:
                status = "None";
                break;
        }
        return status;
    }
}