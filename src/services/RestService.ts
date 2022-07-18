import { Permit, IPermitItem } from "../model/Permit";
import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { ClassError, IClassErrorItem } from "../model/Error";
import { IPrimeParkingService } from "./IPrimeParkingService";
import { MockService } from "./MockService";



export class RestService extends MockService implements IPrimeParkingService {
    private key: string = "1tQXTjYCpANabg9VzwA5gGfYIfHihWrRQ5pRfyaOZZcJAzFuxgBQ7A==";
    private baseURL: string = "https://crudas20220613152222.azurewebsites.net";

    // Vehicle REST api calls
    public async GetVehicles(): Promise<Vehicle[]> {
        let result: Vehicle[] = [];
        const request: Request = new Request(this.getRestApiUrl("cars"));
        const response = await fetch(request, { method: 'GET' });
        const vehiclesData: IVehicleItem[] = await response.json();
        if (vehiclesData) {
            vehiclesData.forEach(value => {
                const vehicle = new Vehicle(value);
                result.push(vehicle);
            });
        }
        // const veh = new Vehicle({
        //     id: 'fiuoyewghfkuewsghluiyew',
        //     carNumber: 'NNN 999',
        //     make: 'Toyota',
        //     model: 'Supra',
        //     registrationYear: new Date(2020, 4, 15),
        //     registrationPlace: 'Vilnius',
        //     fuelType: 'Petrol',
        //     enginePower: 200,
        //     engineTorque: 500,
        //     color: 'White',
        //     doors: 3
        // });
        // this.PostVehicle(veh);
        return result;
    }

    public async PostVehicle(data: Vehicle): Promise<boolean> {
        let postVehicle = this.getDataJSON(data);
        const request: Request = new Request(this.getRestApiUrl("cars"));
        const response = await fetch(request, { method: 'POST', body: postVehicle, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 200) {
            return true; // Return success message
        }
        else {            
            const iError: IClassErrorItem = await response.json();
            const error: Error = new ClassError(iError);
            throw new Error(error.message);
        }
    }

    public async PutVehicle(data: Vehicle) {
        let postVehicle = this.getDataJSON(data);
        const request: Request = new Request(this.getRestApiUrl(`cars?id=${data.id}`));
        const response = await fetch(request, { method: 'PUT', body: postVehicle, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 204) {
            return;
        }
        else {
            const iError: IClassErrorItem = await response.json();
            const error: Error = new ClassError(iError);
            return error;
        }
    }

    public async DeleteVehicle(id: string) {
        const request: Request = new Request(this.getRestApiUrl(`cars?id=${id}`));
        try {
            const response = await fetch(request, { method: 'DETELE' })
            //const result = await response.json();
            if (!response.ok) {
                const iError: IClassErrorItem = await response.json();
                const error: Error = new ClassError(iError);
                throw error;
            }
        }
        catch (err) {
            //throw new ClassError({ error: result.error, message: result.message });
            console.error('!!Error: ' + err);
        }
        // if (!response.ok) {
        //     const iError: IErrorItem = await response.json();
        //     const error: Error = new ClassError(iError);
        //     return console.log(error);
        // }
    }

    // Permit REST api calls
    public async GetPermits(): Promise<Permit[]> {
        let result: Permit[] = [];
        const request: Request = new Request(this.getRestApiUrl("permits"));
        const response = await fetch(request, { method: 'GET' });
        const permitsData: IPermitItem[] = await response.json();
        if (permitsData) {
            permitsData.forEach(value => {
                const permit = new Permit(value);
                result.push(permit);
            });
        }
        return result;
    }

    public async PostPermit() {

    }

    public async PutPermit() {

    }

    public async DeletePermit() {

    }

    public getRestApiUrl(path: string): string {
        return `${this.baseURL}/api/${path}?code=${this.key}`;
    }

    public getDataJSON(data: IVehicleItem): string {
        return JSON.stringify({
            id: data.id,
            carNumber: data.carNumber,
            make: data.make,
            model: data.model,
            registrationYear: data.registrationYear,
            registrationPlace: data.registrationPlace,
            fuelType: data.fuelType,
            enginePower: data.enginePower,
            engineTorque: data.engineTorque,
            color: data.color,
            doors: data.doors
        });
    }
}