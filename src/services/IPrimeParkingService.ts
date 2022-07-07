import { Vehicle } from "../model/Vehicle";
import { Permit } from "../model/Permit";


export interface IPrimeParkingService {
    GetVehicles(): Promise<Vehicle[]>;
    GetPermits(): Promise<Permit[]>;
}