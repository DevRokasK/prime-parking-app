import { makeObservable, observable, computed, action } from 'mobx';

export interface IPermitItem {
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
        if (this.state == "0") {
            status = "Planned";
        }
        else if (this.state == "1") {
            status = "In Territory";
        }
        else {
            status = "Completed";
        }
        return status;
    }
}