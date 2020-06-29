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

export interface elementDetails {
    id?: number;
    element: number;
    status_source: number;
    status_target: number;
}

export interface Status {
    id?: number;
    name: string;
    description?: string;
   
    
}
