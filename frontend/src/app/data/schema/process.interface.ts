import { Element } from '@data/schema/element.interface';

export interface Process {
    _id?: string;
    name: string;
    description?: string;
}

export interface Relation {
    _id?: string;
    graph: Process;
    element_source: Element;
    element_target: Element;
    description?: string;
}
