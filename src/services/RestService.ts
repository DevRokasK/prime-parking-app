import { Permit, IPermitItem } from "../model/Permit";
import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { ErrorModel, IErrorModelItem } from "../model/Error";
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
                const iError: IErrorModelItem = await response.json();
                const error: ErrorModel = new ErrorModel(iError);
                result = error;
            } catch {
                const error: ErrorModel = new ErrorModel({ error: response.status, message: response.statusText });
                result = error;
            }
        }
        return result;
    }

    public async PutVehicle(data: Vehicle): Promise<ErrorModel> {
        let result: ErrorModel;
        let postVehicle = data.toJson();
        const request: Request = new Request(this.getRestApiUrl(`cars?id=${data.id}`));
        const response = await fetch(request, { method: 'PUT', body: postVehicle, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 204) {
            result = null;
        } else {
            try {
                const iError: IErrorModelItem = await response.json();
                const error: ErrorModel = new ErrorModel(iError);
                result = error;
            } catch {
                const error: ErrorModel = new ErrorModel({ error: response.status, message: response.statusText });
                result = error;
            }
        }
        return result;
    }

    public async DeleteVehicle(id: string): Promise<ErrorModel> {
        let result: ErrorModel;
        const request: Request = new Request(this.getRestApiUrl(`cars?id=${id}`));
        const response = await fetch(request, { method: 'DETELE' })
        if (response.status === 204) {
            result = null;
        } else {
            try {
                const iError: IErrorModelItem = await response.json();
                const error: ErrorModel = new ErrorModel(iError);
                result = error;
            } catch {
                const error: ErrorModel = new ErrorModel({ error: response.status, message: response.statusText });
                result = error;
            }
        }
        return result;
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