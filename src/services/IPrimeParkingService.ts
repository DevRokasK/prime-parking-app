import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { Permit } from "../model/Permit";
import { ErrorModel } from "../model/Error";


export interface IPrimeParkingService {
    GetVehicles(): Promise<IVehicleItem[]>;
    PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel>;
    PutVehicle(data: Vehicle): Promise<ErrorModel>;
    DeleteVehicle(id: string): Promise<ErrorModel>;

    GetPermits(): Promise<Permit[]>;
}