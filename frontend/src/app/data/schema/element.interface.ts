export interface Element {
    _id?: string;
    name: string;
    description?: string;
    first_state: string;
    second_state: string;
    initial_condition: string;
    type: string;
    img?: string;
}
