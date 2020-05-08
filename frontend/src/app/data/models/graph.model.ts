import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class GraphModel {
    GraphModel() {
        return new FormGroup({

            _id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl('')
        });
    }
}
