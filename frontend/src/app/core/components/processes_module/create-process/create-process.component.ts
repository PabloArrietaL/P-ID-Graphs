import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessModel } from '@data/models/process.model';
import { environment } from '@env/environment';
import { MatDialogRef } from '@angular/material';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss']
})
export class CreateProcessComponent implements OnInit {

  public FormProcess: FormGroup = new ProcessModel().ProcessModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<CreateProcessComponent>,
    private service: ProcessService,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  createProcess(form: FormGroup) {

    const url = `${this.api}graph`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.create(url, form.value).subscribe(
        response => {
          this.toast.success('Proceso creado correctamente', 'Éxito');
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
