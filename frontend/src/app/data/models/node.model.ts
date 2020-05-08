import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class NodeModel {
    FormNode() {
        return new FormGroup({

            _id: new FormControl(''),
            name: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl(''),
            img: new FormControl(null)
        });
    }
}
