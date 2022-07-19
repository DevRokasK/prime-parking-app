import { Permit, IPermitItem } from "../model/Permit";
import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { ErrorModel, IClassErrorItem } from "../model/Error";
import { IPrimeParkingService } from "./IPrimeParkingService";

export class RestService implements IPrimeParkingService {
    private key: string = "1tQXTjYCpANabg9VzwA5gGfYIfHihWrRQ5pRfyaOZZcJAzFuxgBQ7A==";
    private baseURL: string = "https://crudas20220613152222.azurewebsites.net";

    // Vehicle REST api calls
    public async GetVehicles(): Promise<IVehicleItem[]> {
        let result: IVehicleItem[] = [];
        const request: Request = new Request(this.getRestApiUrl("cars"));
        const response = await fetch(request, { method: 'GET' });
        const vehiclesData: IVehicleItem[] = await response.json();
        if (vehiclesData && vehiclesData.length > 0) {
            result = vehiclesData
        }
        return result;
    }

    public async PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel> {
        let result: IVehicleItem | ErrorModel;
        let postVehicle = data.toJson();        
        const request: Request = new Request(this.getRestApiUrl("cars"));
        const response = await fetch(request, { method: 'POST', body: postVehicle, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 200) {
            const vehicle: IVehicleItem = await response.json();
            result = vehicle;
        }
        else {
            try {
                const iError: IClassErrorItem = await response.json();
                const error: ErrorModel = new ErrorModel(iError);
                result = error;
            } catch {
                const error: ErrorModel = new ErrorModel({ error: response.status, message: response.statusText });
                result = error;
            }
        }
        return result;
    }

    public async PutVehicle(data: Vehicle) {
        let postVehicle = data.toJson();
        const request: Request = new Request(this.getRestApiUrl(`cars?id=${data.id}`));
        const response = await fetch(request, { method: 'PUT', body: postVehicle, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 204) {
            return;
        }
        else {
            const iError: IClassErrorItem = await response.json();
            const error: ErrorModel = new ErrorModel(iError);
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
                const error: ErrorModel = new ErrorModel(iError);
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
}