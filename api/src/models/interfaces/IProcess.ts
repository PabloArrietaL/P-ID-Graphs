import { IProcessDetail } from "./IProcessDetail";

export interface IProcess{
    id?: number;
    name: string;
    description?: string;
    created_date?: Date;
}
