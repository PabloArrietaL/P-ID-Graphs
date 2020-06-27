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
            first_status: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(45)]
            }),
            second_status: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(45)]
            }),
             third_status: new FormControl('', {
                validators: [Validators.maxLength(45)]

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
}
