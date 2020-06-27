import { IStatus } from "./IStatus";

export interface IElement{
    id?: number;
    name: string;
    first_status: IStatus;
    second_status: IStatus;
    third_status?: IStatus;
    initial_condition: string;
    type: string;
    description?: string;
    img?: string;
    created_date?: Date;
}
