import { Permit, IPermitItem } from "../model/Permit";
import { Vehicle, IVehicleIten } from "../model/Vehicle";
import { IPrimeParkingService } from "./IPrimeParkingService";
import { MockService } from "./MockService";



export class RestService extends MockService implements IPrimeParkingService {
    private key: string = "1tQXTjYCpANabg9VzwA5gGfYIfHihWrRQ5pRfyaOZZcJAzFuxgBQ7A==";
    private baseURL: string = "https://crudas20220613152222.azurewebsites.net";

    public async GetVehicles(): Promise<Vehicle[]> {
        let result: Vehicle[] = [];
        const request: Request = new Request(this.getRestApiUrl("cars"));
        const response = await fetch(request);
        const vehiclesData: IVehicleIten[] = await response.json();
        if (vehiclesData) {
            vehiclesData.forEach(value => {
                const vehicle = new Vehicle(value);
                result.push(vehicle);
            });
        }
        return result;
    }

    public async GetPermits(): Promise<Permit[]> {
        let result: Permit[] = [];
        const request: Request = new Request(this.getRestApiUrl("permits"));
        const response = await fetch(request);
        const permitsData: IPermitItem[] = await response.json();
        if(permitsData) {
            permitsData.forEach(value => {
                const permit = new Permit(value);
                result.push(permit);
            });
        }
        return result;
    }

    public getRestApiUrl(path:string): string {
        return `${this.baseURL}/api/${path}?code=${this.key}`;
    }
}