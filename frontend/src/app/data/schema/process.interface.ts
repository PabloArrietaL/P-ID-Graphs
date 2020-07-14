import { Element } from '@data/schema/element.interface';

export interface Process {
    id?: number;
    name: string;
    description?: string;
}

export interface ProcessDetails {
    id?: string;
    process: number;
    element: number;

}


export interface RelationEdit {
    id?: string;
    process: number;
    element_source: number;
    element_target: number;
    description?: string;
}