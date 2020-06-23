import { IProcess } from "./IProcess";
import { IElement } from "./IElement";

export interface IRelation{
    id?: number;
    process: number;
    element_source: number;
    element_target: number;
    description?: string;
}
