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
            vehiclesData.map(value => {
                const vehicle = new Vehicle(value);
                result.push(vehicle);
            });
        }
        return result;
    }

    public getRestApiUrl(path:string): string {
        return `${this.baseURL}/api/${path}?code=${this.key}`;
    }
}