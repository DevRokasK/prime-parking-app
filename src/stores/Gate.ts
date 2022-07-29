import { makeObservable, observable, computed, action } from 'mobx';
import { BaseStore } from './BaseStore';
import { ErrorModel } from '../model/Error';
import { RootStore } from './RootStore';

export interface IGateItem {
    vehicleId: string,
    direction: Direction
}

export enum Direction {
    in,
    out
}

export class Gate extends BaseStore implements IGateItem {
    public RootStore: RootStore;
    @observable public vehicleId: string;
    @observable public direction: Direction;
    @observable public isOpen: boolean;

    // Returns true , if isOpen is true
    @computed get IsOpen() {
        return this.isOpen = true ? true : false
    }

    // Returns direction as string
    @computed get regDirection(): string {
        let status = "";
        switch (this.direction) {
            case Direction.in:
                status = "in";
                break;
            case Direction.out:
                status = "out";
                break;
        }
        return status;
    }

    public constructor(data: RootStore) {
        super()
        makeObservable(this);
        this.initFromData();
        if (data) {
            this.RootStore = data;
        }
    }

    @action
    public initFromData() {
        this.vehicleId = "";
        this.direction = null;
        this.isOpen = false;
    }

    @action
    public setVehicleId(value: string): void {
        this.vehicleId = value;
    }

    @action
    public setDirection(value: string): void {
        if (value === 'in')
            this.direction = Direction.in;
        if (value === 'out')
            this.direction = Direction.out;
    }

    // Set gate isOpen to true
    @action
    public gateOpen() {
        this.isOpen = true;
    }

    // Set gate isOpen to false
    @action
    public gateClose() {
        this.isOpen = false;
    }

    // Returns true, if all Gate characteristics are not empty
    public isValid(): boolean {
        if (this.vehicleId === "" ||
            this.direction === null
        ) {
            return false;
        } else {
            return true;
        }
    }

    // POST Gate request to api
    public async PostGate(): Promise<boolean> {
        let result = false;
        this.clearError();
        if (this && this.RootStore.Service) {
            if (this.isValid()) {
                const service = this.RootStore.Service;
                try {
                    const postResult = await service.PostGate(this.vehicleId, this.regDirection);
                    if (postResult && (postResult as ErrorModel).error) {
                        this.showError(postResult as ErrorModel);
                    } else {
                        result = true;
                        const message = "Vehicle successfully went " + this.direction + " through the gate";
                        this.showSuccess(new ErrorModel({ error: 200, message: message }))
                    }
                } catch (error) {
                    this.showError(error);
                }
            } else {
                this.showError(new ErrorModel({ error: 400, message: "Fill in all the tabs" }));
            }
        } else {
            this.showError(new ErrorModel({ error: 400, message: "System error" }));
        }
        return result;
    }

}