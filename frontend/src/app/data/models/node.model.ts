import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class NodeModel {
    FormNode() {
        return new FormGroup({

            id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl(''),
            image: new FormControl(null, {
                validators: [Validators.required]
            })
        });
    }
}
