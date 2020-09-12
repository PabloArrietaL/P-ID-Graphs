import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessModel } from '@data/models/process.model';
import { environment } from '@env/environment';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Process } from '@data/schema/process.interface';

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
    private service: ProcessService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedroute });
  }
  createProcess(form: FormGroup) {
    const url = `${this.api}process`;
    if (!form.invalid) {
      const PROCESS: Process = {
        name: form.value.name,
        description: form.value.description,
        status: form.value.status
      };
      this.showSpinner = true;
      this.service.create(url, PROCESS).subscribe(
        () => {
          this.toast.success('Proceso creado correctamente', 'Éxito');
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
