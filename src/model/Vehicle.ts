import { makeObservable, observable, computed, action } from 'mobx';
import { Utils } from './Utils';

export interface IVehicleItem {
    id: string;
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
export enum PanelState {
    Display,
    Edit
}

export class Vehicle implements IVehicleItem {
    @observable public isDirty: boolean = false;
    @observable public data: IVehicleItem;
    @observable public id: string;
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
    @observable public panelState: PanelState;

    @computed get regDateText(): string {
        return Utils.formatDate(this.registrationYear);
    }

    @computed get regEnginePower(): string {
        let result = "";
        if (this.enginePower > 0) {
            result = this.enginePower.toString();
        }
        return result;
    }

    @computed get regEngineTorque(): string {
        let result = "";
        if (this.engineTorque > 0) {
            result = this.engineTorque.toString();
        }
        return result;
    }

    @computed get regDoors(): string {
        let result = "";
        if (this.doors > 0) {
            result = this.doors.toString();
        }
        return result;
    }

    @computed get readOnly(): boolean {
        return this.panelState === PanelState.Display ? true : false;
    }

    public constructor(data: IVehicleItem) {
        makeObservable(this);
        this.initFromData(data);
    }

    @action
    public initFromData(data: IVehicleItem) {
        this.data = data;
        this.id = data.id;
        this.carNumber = data.carNumber;
        this.make = data.make;
        this.model = data.model;
        if (data.registrationYear) {
            this.registrationYear = new Date(data.registrationYear);
        }
        this.registrationPlace = data.registrationPlace;
        this.fuelType = data.fuelType;
        this.enginePower = data.enginePower;
        this.engineTorque = data.engineTorque;
        this.color = data.color;
        this.doors = data.doors;
        this.panelState = PanelState.Display;
    }

    public toJson(): IVehicleItem {
        return {
            id: this.id,
            carNumber: this.carNumber,
            make: this.make,
            model: this.model,
            registrationYear: this.registrationYear,
            registrationPlace: this.registrationPlace,
            fuelType: this.fuelType,
            enginePower: this.enginePower,
            engineTorque: this.engineTorque,
            color: this.color,
            doors: this.doors
        }
    } 
    
    @action
    public cancelEdit() : void {
        if (this.isDirty) {
            this.initFromData(this.data);
            this.isDirty = false;
        }
        this.panelState = PanelState.Display;
    }

    @action
    public saveEdit() : void {
        if(this.isDirty) {
            if (this.id == null) {
                //create
            } else {
                //update
            }
        
        }
        this.panelState = PanelState.Display;
    }

    @action
    public setCarNumber(value: string): void {
        this.carNumber = value;
        this.isDirty = true;
    }

    @action
    public setMake(value: string): void {
        this.make = value;
        this.isDirty = true;
    }

    @action
    public setModel(value: string): void {
        this.model = value;
        this.isDirty = true;
    }

    @action
    public setRegistrationYear(value: Date): void {
        this.registrationYear = value;
        this.isDirty = true;
    }

    @action
    public setRegistrationPlace(value: string): void {
        this.registrationPlace = value;
        this.isDirty = true;
    }

    @action
    public setFuelType(value: string): void {
        this.fuelType = value;
        this.isDirty = true;
    }

    @action
    public setEnginePower(value: string): void {
        this.enginePower = Number(value);
        this.isDirty = true;
    }

    @action
    public setEngineTorque(value: string): void {
        this.engineTorque = Number(value);
        this.isDirty = true;
    }

    @action
    public setColor(value: string): void {
        this.color = value;
        this.isDirty = true;
    }

    @action
    public setDoors(value: string): void {
        this.doors = Number(value);
        this.isDirty = true;
    }
}