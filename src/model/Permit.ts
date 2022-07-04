import { makeObservable, observable } from 'mobx';

interface IPermitItem {
    carId: string;
    from: Date;
    to: Date;
    entered: Date;
    left: Date;
    state: string;
}

export class Permit implements IPermitItem  {
    @observable public carId: string;
    @observable public from: Date;
    @observable public to: Date;
    @observable public entered: Date;
    @observable public left: Date;
    @observable public state: string;

    public constructor(data: IPermitItem) {
        this.carId = data.carId;
        this.from = data.from;
        this.to = data.to;
        this.entered = data.entered;
        this.left = data.left;
        this.state = data.state;
    }
}