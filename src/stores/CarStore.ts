import { Car } from "../model/Car";
import { observable, action, makeObservable } from 'mobx';
import { MockService } from "../services/MockService";

export class CarStore {
    @observable public Cars: Car[] = [];

    public constructor() {
        makeObservable(this);
    }

    @action
    public Init() {
        this.Cars = MockService.GetCars();
    }
}