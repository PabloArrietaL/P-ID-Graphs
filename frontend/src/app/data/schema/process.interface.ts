import { Element, Status } from '@data/schema/element.interface';

export interface Process {
    id?: number;
    name: string;
    description?: string;
    status?: string;

}

export interface ProcessDetails {
    id?: string;
    process: number;
    element: number;
}

export interface PermissiveR {
    id?: string;
    actuator?: Element;
    controlled?: Element;
    status?: string;
    process?: number;
    event?: string;

}
export interface SynchronousR {
    id?: string;
    initial_controlled?: Element;
    end_controlled?: Element;
    process?: number;
    initial_event?: string;
end_event?: string;
}

export interface RelationEdit {
    id?: string;
    process: number;
    element_source: number;
    element_target: number;
    description?: string;
}
