import { Permit, IPermitItem } from "../model/Permit";
import { Vehicle, IVehicleItem } from "../model/Vehicle";
import { ErrorModel, IErrorModelItem } from "../model/Error";
import { IPrimeParkingService } from "./IPrimeParkingService";
import { IGetVehicleResult } from "../model/IGetVehicleResult";
import { IGetPermitResult } from "../model/IGetPermitResult";

export class RestService implements IPrimeParkingService {
    private key: string = "1tQXTjYCpANabg9VzwA5gGfYIfHihWrRQ5pRfyaOZZcJAzFuxgBQ7A==";
    private baseURL: string = "https://crudas20220613152222.azurewebsites.net";

    // Vehicle REST api calls
    public async GetVehicles(pageSize: number, token?: string): Promise<IGetVehicleResult> {
        let result: IGetVehicleResult = null;
        let request: Request;
        if (token) {
            request = new Request(this.getRestApiUrl("cars", `ctoken=${token}&cars=${pageSize}`));
        } else {
            request = new Request(this.getRestApiUrl("cars", `cars=${pageSize}`));
        }
        const response = await fetch(request, { method: 'GET' });
        const vehiclesData: IGetVehicleResult = await response.json();
        if (vehiclesData && vehiclesData.carList.length > 0) {
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
        const request: Request = new Request(this.getRestApiUrl("cars", `id=${data.id}`));
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
        const request: Request = new Request(this.getRestApiUrl("cars", `id=${id}`));
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

    // Vehicle blob REST api calls
    public async GetVehicleBlob() {

    }

    public async GetVehicleBlobs() {

    }

    public async PostVehicleBlobs() {

    }

    public async DeleteVehicleBlobs() {

    }

    // Permit REST api calls
    public async GetPermits(pageSize: number, permitState?: string, token?: string): Promise<IGetPermitResult> {
        let result: IGetPermitResult = null;
        let request: Request;
        if (permitState === null) {
            if (token) {
                request = new Request(this.getRestApiUrl("permits", `count=${pageSize}&token=${token}`));
            } else {
                request = new Request(this.getRestApiUrl("permits", `count=${pageSize}`));
            }
        } else {
            if (token) {
                request = new Request(this.getRestApiUrl("permits", `state=${permitState}&count=${pageSize}&token=${token}`));
            } else {
                request = new Request(this.getRestApiUrl("permits", `state=${permitState}&count=${pageSize}`));
            }
        }
        const response = await fetch(request, { method: 'GET' });
        const permitsData: IGetPermitResult = await response.json();
        if (permitsData && permitsData.permitList.length > 0) {
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

    public async PutPermit(data: Permit): Promise<ErrorModel> {
        let result: ErrorModel;
        let postPermit = data.toJson();
        const request: Request = new Request(this.getRestApiUrl("permits", `${data.id}`));
        const response = await fetch(request, { method: 'PUT', body: postPermit, headers: { 'Content-Type': 'application/json' } })
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

    public async DeletePermit(id: string): Promise<ErrorModel> {
        let result: ErrorModel;
        const request: Request = new Request(this.getRestApiUrl(`permits/${id}`));
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

    //Gate REST api calls
    public async PostGate(vehicleId: string, direction: string): Promise<ErrorModel> {
        let result: ErrorModel;
        const request: Request = new Request(this.getRestApiUrl("gate/" + vehicleId, `direction="${direction}"`));
        const response = await fetch(request, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
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


    public getRestApiUrl(path: string, query?: string): string {
        return `${this.baseURL}/api/${path}?${query}&code=${this.key}`;
    }
}