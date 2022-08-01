import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { Permit, IPermitItem } from "../model/Permit";
import { ErrorModel } from "../model/Error";
import { IGetVehicleResult } from "../model/IGetVehicleResult";
import { IGetPermitResult } from "../model/IGetPermitResult";

export interface IPrimeParkingService {
    GetVehicles(pageSize: number, token?: string): Promise<IGetVehicleResult>;
    PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel>;
    PutVehicle(data: Vehicle): Promise<ErrorModel>;
    DeleteVehicle(id: string): Promise<ErrorModel>;
    GetPlate(text: string, pageSize: number, token?: string): Promise<IGetVehicleResult>;

    GetVehicleBlobs(id: string): Promise<string[] | ErrorModel>;

    GetPermits(pageSize: number, permitState?: string, token?: string): Promise<IGetPermitResult>;
    PostPermit(data: Permit): Promise<IPermitItem | ErrorModel>;
    PutPermit(data: Permit): Promise<ErrorModel>;
    DeletePermit(id: string): Promise<ErrorModel>;

    PostGate(vehicleId: string, direction: string): Promise<ErrorModel>;
}