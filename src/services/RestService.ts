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
        const requestURl = new URL(this.baseURL + "/api/cars");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("cars", pageSize.toString());
        let result: IGetVehicleResult = null;
        let request: Request;
        if (token) {
            requestURl.searchParams.append("ctoken", token);
            request = new Request(requestURl.toString());
        } else {
            request = new Request(requestURl.toString());
        }
        const response = await fetch(request, { method: 'GET' });
        const vehiclesData: IGetVehicleResult = await response.json();
        if (vehiclesData && vehiclesData.carList.length > 0) {
            result = vehiclesData
        }
        return result;
    }

    public async PostVehicle(data: Vehicle): Promise<IVehicleItem | ErrorModel> {
        const requestURl = new URL(this.baseURL + "/api/cars");
        requestURl.searchParams.append("code", this.key);
        let result: IVehicleItem | ErrorModel;
        let postVehicle = data.toJson();
        const request: Request = new Request(requestURl.toString());
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
        const requestURl = new URL(this.baseURL + "/api/cars");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("id", data.id);
        let result: ErrorModel;
        let postVehicle = data.toJson();
        const request: Request = new Request(requestURl.toString());
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
        const requestURl = new URL(this.baseURL + "/api/cars");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("id", id);
        let result: ErrorModel;
        const request: Request = new Request(requestURl.toString());
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

    public async GetPlate(text: string, pageSize: number, token?: string): Promise<IGetVehicleResult> {
        const requestURl = new URL(this.baseURL + "/api/cars");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("cars", pageSize.toString());
        requestURl.searchParams.append("plate", text);
        let result: IGetVehicleResult = null;
        let request: Request;
        if (token) {
            requestURl.searchParams.append("ctoken", token);
            request = new Request(requestURl.toString());
        } else {
            request = new Request(requestURl.toString());
        }
        const response = await fetch(request, { method: 'GET' });
        const vehiclesData: IGetVehicleResult = await response.json();
        if (vehiclesData && vehiclesData.carList.length > 0) {
            result = vehiclesData
        }
        return result;
    }

    // Vehicle blob REST api calls
    public async GetVehicleBlobs(id: string): Promise<string[] | ErrorModel> {
        const requestURl = new URL(this.baseURL + `/api/blobs/${id}`);
        requestURl.searchParams.append("code", this.key);
        let result: string[] | ErrorModel;
        const request: Request = new Request(requestURl.toString());
        const response = await fetch(request, { method: 'GET' });
        if (response.status === 200) {
            const documentsData: string[] = await response.json();
            result = documentsData;
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

    public async GetVehicleBlobFile(data: Vehicle, fileName: string): Promise<ErrorModel> {
        const requestURl = new URL(this.baseURL + `/api/blobs/${data.id}/${fileName}`);
        requestURl.searchParams.append("code", this.key);
        let result: ErrorModel = null;
        const request: Request = new Request(requestURl.toString());
        const response = await fetch(request, { method: 'GET' });
        if (response.status === 200) {
        } else {
            const iError: IErrorModelItem = await response.json();
            const error: ErrorModel = new ErrorModel(iError);
            result = error;
        }
        return result;
    }

    public async PostVehicleBlob(id: string, fileName: string, content: any): Promise<ErrorModel> {
        const requestURl = new URL(this.baseURL + `/api/blobs/${id}/${fileName}`);
        requestURl.searchParams.append("code", this.key);
        let result: ErrorModel;
        const response = await fetch(requestURl.toString(), { method: 'POST', body: content })
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

    public async DeleteVehicleBlob(data: Vehicle, fileName: string): Promise<ErrorModel> {
        const requestURl = new URL(this.baseURL + `/api/blobs/${data.id}/${fileName}`);
        requestURl.searchParams.append("code", this.key);
        let result: ErrorModel;
        const response = await fetch(requestURl.toString(), { method: 'DELETE' });
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
    public async GetPermits(pageSize: number, permitState?: string, token?: string): Promise<IGetPermitResult> {
        const requestURl = new URL(this.baseURL + "/api/permits");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("count", pageSize.toString());
        let result: IGetPermitResult = null;
        let request: Request;
        if (permitState === null) {
            if (token) {
                requestURl.searchParams.append("token", token);
                request = new Request(requestURl.toString());
            } else {
                request = new Request(requestURl.toString());
            }
        } else {
            requestURl.searchParams.append("state", permitState);
            if (token) {
                requestURl.searchParams.append("token", token);
                request = new Request(requestURl.toString());
            } else {
                request = new Request(requestURl.toString());
            }
        }
        const response = await fetch(request, { method: 'GET' });
        const permitsData: IGetPermitResult = await response.json();
        result = permitsData
        return result;
    }

    public async PostPermit(data: Permit): Promise<IPermitItem | ErrorModel> {
        const requestURl = new URL(this.baseURL + "/api/permits");
        requestURl.searchParams.append("code", this.key);
        let result: IPermitItem | ErrorModel;
        let postPermit = data.toJson();
        const request: Request = new Request(requestURl.toString());
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
        const requestURl = new URL(this.baseURL + "/api/permits");
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("id", data.id);

        let result: ErrorModel;
        let postPermit = data.toJson();
        const request: Request = new Request(requestURl.toString());
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
        const requestURl = new URL(this.baseURL + `/api/permits/${id}`);
        requestURl.searchParams.append("code", this.key);
        let result: ErrorModel;
        const request: Request = new Request(requestURl.toString());
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
        const requestURl = new URL(this.baseURL + `/api/gate/${vehicleId}`);
        requestURl.searchParams.append("code", this.key);
        requestURl.searchParams.append("direction", direction);
        let result: ErrorModel;
        const request: Request = new Request(requestURl.toString());
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

    public BuildURL(data: Vehicle, fileName: string): string {
        let result: string = this.baseURL + `/api/blobs/${data.id}/${fileName}?code=` + this.key;
        return result;
    }
}