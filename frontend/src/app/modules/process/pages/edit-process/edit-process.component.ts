import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessModel } from '@data/models/process.model';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Process } from '@data/schema/process.interface';
import { ToastrService } from 'ngx-toastr';
import { ProcessService } from '@data/service/process.service';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.scss']
})
export class EditProcessComponent implements OnInit {

  public FormProcess: FormGroup = new ProcessModel().ProcessModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<EditProcessComponent>,
    private service: ProcessService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Process) { }

  ngOnInit(): void {
    this.FormProcess.setValue({
      _id: this.data._id,
      name: this.data.name,
      description: this.data.description
    });
  }

  editProcess(form: FormGroup) {

    const url = `${this.api}process`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Proceso editado correctamente', 'Éxito');
          this.showSpinner = false;
          this.dialogRef.close(response);
        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );
    }

  }

}
