import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class ProcessModel {
    ProcessModel() {
        return new FormGroup({

            id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl('')
        });
    }
}
