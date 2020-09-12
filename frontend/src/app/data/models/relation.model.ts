import { FormGroup, FormControl, Validators } from '@angular/forms';

export class RelationModel {
  RelationModel() {
    return new FormGroup({

      id: new FormControl(''),
      process: new FormControl('', {
      }),
      element_source: new FormControl({ value: '', disabled: false }, {
        validators: [Validators.required, Validators.nullValidator]
      }),
      element_target: new FormControl({ value: '', disabled: true }, {
        validators: [Validators.required, Validators.nullValidator]
      }),
      description: new FormControl('')
    });
  }
}
