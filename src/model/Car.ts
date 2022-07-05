import { makeObservable, observable, computed, action } from 'mobx';

interface ICarIten {
    carId: string;
    make: string;
    model: string;
    registrationDate: Date;
    registrationPlace: string;
    fuelType: string;
    enginePower: number;
    engineTorque: number;
    color: string;
    doors: number;
}

export class Car implements ICarIten {
    @observable public carId: string;
    @observable public make: string;
    @observable public model: string;
    @observable public registrationDate: Date;
    @observable public registrationPlace: string;
    @observable public fuelType: string;
    @observable public enginePower: number;
    @observable public engineTorque: number;
    @observable public color: string;
    @observable public doors: number;

    public constructor(data: ICarIten) {
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: ICarIten) {
        this.carId = data.carId;
        this.make = data.make;
        this.model = data.model;
        this.registrationDate = data.registrationDate;
        this.registrationPlace = data.registrationPlace;
        this.fuelType = data.fuelType;
        this.enginePower = data.enginePower;
        this.engineTorque = data.engineTorque;
        this.color = data.color;
        this.doors = data.doors;
    }

    @computed get regDateText(): string {
        let date = this.registrationDate.getDate() + '-' +
            this.registrationDate.getMonth() + '-' +
            this.registrationDate.getFullYear();
        return date;
    }

    // @computed public get fullInfo(): string {
    //     let result = "";
    //     result += "id: " + this.carId + "; ";
    //     result += "make: " + this.make + "; ";
    //     result += "model: " + this.model + "; ";
    //     result += "registration date: " + this.registrationDate.toISOString().slice(0, 10) + "; ";
    //     result += "registration place: " + this.registrationPlace + "; ";
    //     result += "fuel type: " + this.fuelType + "; ";
    //     result += "engine power: " + this.enginePower + "; ";
    //     result += "engine torque: " + this.engineTorque + "; ";
    //     result += "color: " + this.color + "; ";
    //     result += "doors: " + this.doors + "; ";
    //     return result;
    // }
}