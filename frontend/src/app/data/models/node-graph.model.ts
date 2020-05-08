import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class NodesGraphModel {
    NodesGraphModel() {
        return new FormGroup({

            _id: new FormControl(''),
            graph: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            node_source: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            node_target: new FormControl({value: '', disabled: true}, {
                validators: [Validators.required, Validators.nullValidator]
            }),
            description: new FormControl('')
        });
    }
}
