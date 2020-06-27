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
                validators: [Validators.required, Validators.nullValidator,Validators.maxLength(45)]
            }),
            description: new FormControl('', {
                validators: [Validators.maxLength(45)]
            }),
        });
    }
}
