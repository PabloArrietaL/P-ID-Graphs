import { IProcess } from "./IProcess";
import { IElement } from "./IElement";

export interface IRelation{
    id?: number;
    process: IProcess;
    element_source: IElement;
    element_target: IElement;
    description?: string;
}
