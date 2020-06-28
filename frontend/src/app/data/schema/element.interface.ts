export interface Element {
    id?: number;
    name: string;
    description?: string;
    first_status: Status;
    second_status: Status;
    third_status?: Status;
    initial_condition: string;
    type: string;
    img?: string;
}
export interface ElementEdit {
    id?: number;
    name: string;
    description?: string;
    first_status: number;
    second_status: number;
    third_status?: number;
    initial_condition: string;
    type: string;
    img?: string;
}

interface Behavior {
    id?: number;
    element: Element;
    from_status: string;
    to_status: string;
}

export interface Status {
    id?: number;
    name: string;
    description?: string;
   
    
}
