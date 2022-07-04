import { makeObservable, observable, computed } from 'mobx';

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

    @computed public get fullInfo(): string {
        let result = "";
        result += "id: " + this.carId + "; ";
        result += "make: " + this.carId + "; ";
        result += "model: " + this.carId + "; ";
        result += "registration date: " + this.carId + "; ";
        result += "registration place: " + this.carId + "; ";
        result += "fuel type: " + this.carId + "; ";
        result += "engine power: " + this.carId + "; ";
        result += "engine torque: " + this.carId + "; ";
        result += "color: " + this.carId + "; ";
        result += "doors: " + this.doors + "; ";
        return result;
    }
}