import { Element } from '@data/schema/element.interface';

export interface Process {
    id?: number;
    name: string;
    description?: string;
}

export interface Relation {
    id?: string;
    process: number;
    element_source: Element;
    element_target: Element;
    description?: string;
}


export interface RelationEdit {
    id?: string;
    process: number;
    element_source: number;
    element_target: number;
    description?: string;
}