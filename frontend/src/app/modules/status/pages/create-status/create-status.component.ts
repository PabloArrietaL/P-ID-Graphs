import { Component, OnInit } from '@angular/core';
import { StatusModel } from '@data/models/status.model';
import { FormGroup } from '@angular/forms';
import { StatusService } from '@data/service/status.service';
import { environment } from '@env/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Process } from '@data/schema/process.interface';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.scss']
})
export class CreateStatusComponent implements OnInit {
  public FormStatus: FormGroup = new StatusModel().StatusModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private service: StatusService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedroute });
  }

  createStatus(form: FormGroup) {
    const url = `${this.api}status`;
    if (!form.invalid) {
      const PROCESS: Process = {
        name: form.value.name,
        description: form.value.description
      };
      this.showSpinner = true;
      this.service.create(url, PROCESS).subscribe(
        () => {
          this.toast.success('Estado creado correctamente', 'Éxito');
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

