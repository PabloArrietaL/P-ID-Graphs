import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessModel } from '@data/models/process.model';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { ProcessService } from '@data/service/process.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private service: ProcessService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.service.IDP === undefined) {
      this.goBack();
    } else {
      this.FormProcess.setValue({
        id: this.service.IDP.id,
        name: this.service.IDP.name,
        description: this.service.IDP.description,
        status: this.service.IDP.status
      });
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedroute });
  }
  editProcess(form: FormGroup) {
    const url = `${this.api}process`;
    if (!form.invalid) {
      this.showSpinner = true;
      this.service.edit(url, form.value).subscribe(
        () => {
          this.toast.success('Proceso editado correctamente', 'Éxito');
          this.showSpinner = false;
          this.goBack();
        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );
    }
  }
}
