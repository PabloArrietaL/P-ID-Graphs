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
               status: new FormControl('I', {
                validators: [Validators.maxLength(45)]
            }),
        });
    }
        PermissiveRelations() {
        return new FormGroup({

          id: new FormControl(''),
          actuator: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            controlled: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
               type: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            event: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
             status: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
        });
    }
      SynchronousRelations() {
        return new FormGroup({

          id: new FormControl(''),
          initial_controlled: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            end_controlled: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
    type: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            event: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),

        });
    }
}
