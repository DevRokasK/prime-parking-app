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
        const response = await fetch(request, { method: 'DELETE' })
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
    public async GetPermits(): Promise<IPermitItem[]> {
        let result: IPermitItem[] = [];
        const request: Request = new Request(this.getRestApiUrl("permits"));
        const response = await fetch(request, { method: 'GET' });
        const permitsData: IPermitItem[] = await response.json();
        if (permitsData && permitsData.length > 0) {
            result = permitsData
        }
        return result;
    }

    public async PostPermit(data: Permit): Promise<IPermitItem | ErrorModel> {
        let result: IPermitItem | ErrorModel;
        let postPermit = data.toJson();
        const request: Request = new Request(this.getRestApiUrl("permits"));
        const response = await fetch(request, { method: 'POST', body: postPermit, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 200) {
            const permit: IPermitItem = await response.json();
            result = permit;
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

    public async PutPermit(data: Permit): Promise<ErrorModel> {
        let result: ErrorModel;
        let postPermit = data.toJson();
        const request: Request = new Request(this.getRestApiUrl(`permits/${data.id}`));
        const response = await fetch(request, { method: 'PUT', body: postPermit, headers: { 'Content-Type': 'application/json' } })
        if (response.status === 200) {
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

    public async DeletePermit(id: string): Promise<ErrorModel> {
        let result: ErrorModel;
        const request: Request = new Request(this.getRestApiUrl(`permits/${id}`));
        const response = await fetch(request, { method: 'DELETE' })
        if (response.status === 200) {
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

    public getRestApiUrl(path: string): string {
        return `${this.baseURL}/api/${path}?code=${this.key}`;
    }
}