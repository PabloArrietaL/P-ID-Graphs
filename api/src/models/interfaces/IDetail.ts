import { IElement } from "./IElement";
import { IStatus } from "./IStatus";

export interface IElementDetails{
    id?: number;
    element: IElement;
    status_source: IStatus;
    status_target: IStatus;
}
