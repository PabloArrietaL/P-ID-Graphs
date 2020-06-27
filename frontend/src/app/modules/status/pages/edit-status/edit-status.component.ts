import { Component, OnInit } from '@angular/core';
import { StatusModel } from '@data/models/status.model';
import { StatusService } from '@data/service/status.service';
import { FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.scss']
})
export class EditStatusComponent implements OnInit {
  public FormStatus: FormGroup = new StatusModel().StatusModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private service: StatusService,
            private router: Router,
        private activatedroute: ActivatedRoute,
    private toast: ToastrService,
   ) { }

  ngOnInit(): void {


      if (this.service.ID === undefined) {
      this.goBack();
      
    }else{
    this.FormStatus.setValue({
      id: this.service.ID.id,
      name: this.service.ID.name,
      description: this.service.ID.description
    });
  }
  }
public goBack() {
    this.router.navigateByUrl('/status', { relativeTo: this.activatedroute });
  }
  editStatus(form: FormGroup) {

    const url = `${this.api}status`;
  
    if (!form.invalid) {
      this.showSpinner = true;
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Estado editado correctamente', 'Éxito');
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
