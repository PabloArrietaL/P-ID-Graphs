import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class RelationModel {
    RelationModel() {
        return new FormGroup({

            _id: new FormControl(''),
            graph: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            element_source: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            element_target: new FormControl({value: '', disabled: true}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl('')
        });
    }
}
