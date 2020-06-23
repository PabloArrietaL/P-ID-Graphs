export interface IElement{
    id?: number;
    name: string;
    first_status: string;
    second_status: string;
    third_status?: string;
    initial_condition: string;
    type: string;
    description?: string;
    img: string;
    created_date?: Date;
}
