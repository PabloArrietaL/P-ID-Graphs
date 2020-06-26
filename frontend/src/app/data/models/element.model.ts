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
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl(''),
            first_status: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            second_status: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
             third_status: new FormControl('', {
            }),
            initial_condition: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            type: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            img: new FormControl(null)
        });
    }
}
