import { IPermitItem } from "./Permit";

export interface IGetPermitResult {
    permitList: IPermitItem[];
    continuationToken: string;
}