import { IVehicleItem } from "./Vehicle";

export interface IGetVehicleResult {
    carList: IVehicleItem[];
    token: string;
}