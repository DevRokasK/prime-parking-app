import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { Permit, IPermitItem } from "../model/Permit";
import { ErrorModel } from "../model/Error";


export interface IPrimeParkingService {
    GetVehicles(): Promise<IVehicleItem[]>;
    PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel>;
    PutVehicle(data: Vehicle): Promise<ErrorModel>;
    DeleteVehicle(id: string): Promise<ErrorModel>;

    GetPermits(): Promise<IPermitItem[]>;
    PostPermit(data: Permit): Promise<IPermitItem | ErrorModel>;
    PutPermit(data: Permit): Promise<ErrorModel>;
    DeletePermit(id: string): Promise<ErrorModel>;
}