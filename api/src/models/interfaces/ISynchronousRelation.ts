import { IStatus } from "./IStatus";
import { IElement } from "./IElement";
import { IProcess } from "./IProcess";

export interface ISynchronousRelation{
    id?: number;
    process: IProcess;
    initial_controlled: IElement;
    end_controlled: IElement
    initial_event: string;
    end_event: string;
}
