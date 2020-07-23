export interface Element {
  id?: number;
  name?: string;
  description?: string;
  first_status?: Status;
  second_status?: Status;
  third_status?: Status;
  initial_condition?: string;
  detail?: {
    id?: number;
    first_status?: {
      second_status?: { status: { id?: number }; checked: boolean };
      third_status?: { status: { id?: number }; checked: boolean };
    };
    second_status?: {
      first_status?: { status: { id?: number }; checked: boolean };
      third_status?: { status: { id?: number }; checked: boolean };
    };
    third_status?: {
      first_status?: { status: { id?: number }; checked: boolean };
      second_status?: { status: { id?: number }; checked: boolean };
    };
  };
  type?: string;
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

export interface ElementDetail {
    //  id?: number;


        id?:number;
    first_status?:{
         second_status?: {status: {id?:number}, checked: boolean};
         third_status?: {status: {id?:number}, checked: boolean};
    }
   second_status?:{
         first_status?: {status: {id?:number}, checked: boolean};
         third_status?: {status: {id?:number}, checked: boolean};
    }
 third_status?:{
         first_status?: {status: {id?:number}, checked: boolean};
         second_status?: {status: {id?:number}, checked: boolean};


    };

}

export interface Status {
    id?: number;
    name?: string;
    description?: string;
}
