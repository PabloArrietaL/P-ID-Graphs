import { IStatus } from "./IStatus";
import { IElement } from "./IElement";
import { IProcess } from "./IProcess";

export interface IPermissiveRelation{
    id?: number;
    process: IProcess;
    actuator: IElement;
    controlled: IElement
    status: IStatus;
    event: string;
}
