export interface Element {
    id?: number;
    name: string;
    description?: string;
    first_status: string;
    second_status: string;
    third_status?: string;
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
