import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class ElementModel {
    FormElement() {
        return new FormGroup({

            _id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl(''),
            first_state: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            second_state: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
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
