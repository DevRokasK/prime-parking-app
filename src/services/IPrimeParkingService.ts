import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { Permit } from "../model/Permit";
import { ErrorModel } from "../model/Error";


export interface IPrimeParkingService {
    GetVehicles(): Promise<IVehicleItem[]>;
    PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel>;

    GetPermits(): Promise<Permit[]>;
}