import { makeObservable, observable, computed, action } from 'mobx';

export interface IVehicleIten {
    carNumber: string;
    make: string;
    model: string;
    registrationYear: Date;
    registrationPlace: string;
    fuelType: string;
    enginePower: number;
    engineTorque: number;
    color: string;
    doors: number;
}

export class Vehicle implements IVehicleIten {
    @observable public carNumber: string;
    @observable public make: string;
    @observable public model: string;
    @observable public registrationYear: Date;
    @observable public registrationPlace: string;
    @observable public fuelType: string;
    @observable public enginePower: number;
    @observable public engineTorque: number;
    @observable public color: string;
    @observable public doors: number;

    public constructor(data: IVehicleIten) {
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IVehicleIten) {
        this.carNumber = data.carNumber;
        this.make = data.make;
        this.model = data.model;
        this.registrationYear = new Date(data.registrationYear);
        this.registrationPlace = data.registrationPlace;
        this.fuelType = data.fuelType;
        this.enginePower = data.enginePower;
        this.engineTorque = data.engineTorque;
        this.color = data.color;
        this.doors = data.doors;
    }

    @computed get regDateText(): string {
        let result = "";
        if (this.registrationYear) {
            result = this.registrationYear.getDate() + '-' +
                this.registrationYear.getMonth() + '-' +
                this.registrationYear.getFullYear();
        }
        return result;
    }
}