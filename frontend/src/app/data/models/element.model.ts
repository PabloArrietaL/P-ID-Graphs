import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class ElementModel {
    FormElement() {
        return new FormGroup({

            id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(45)]
            }),
            description: new FormControl(''),
            first_status: new FormControl({value: '', disabled: false}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
            second_status: new FormControl({value: '', disabled: true}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
             third_status: new FormControl({value: '', disabled: true}, {
            }),
            initial_condition: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(15)]
            }),
            type: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(255)]
            }),
            img: new FormControl(null)
        });
    }
     FormElementEdit() {
        return new FormGroup({

            id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(45)]
            }),
            description: new FormControl(''),
            first_status: new FormControl({value: '', disabled: true}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
            second_status: new FormControl({value: '', disabled: true}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
             third_status: new FormControl({value: '', disabled: true}, {
            }),
            initial_condition: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(15)]
            }),
            type: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(255)]
            }),
            img: new FormControl(null)
        });
    }
     FormElementDetails() {
        return new FormGroup({

            // id: new FormControl(''),
            estado1estado2: new FormControl('', {
            }),

                  estado1estado3: new FormControl('', {
            }), 
                 estado2estado1: new FormControl('', {
            }), 
                  estado2estado3: new FormControl('', {
            }), 
                  estado3estado1: new FormControl('', {
            }), 
                  estado3estado2: new FormControl('', {
            }),    
        });
    }
}
