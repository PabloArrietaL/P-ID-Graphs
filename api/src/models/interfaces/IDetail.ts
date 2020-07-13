import { IElement } from "./IElement";
import { IStatus } from "./IStatus";

export interface IElementDetail{
    id?: number;
    element: IElement;
    first_status: object;
    second_status: object;
    third_status?: object;
}
