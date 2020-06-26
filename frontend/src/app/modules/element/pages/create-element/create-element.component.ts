import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { ElementService } from '@data/service/element.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.scss']
})
export class CreateElementComponent implements OnInit {

  public FormElement: FormGroup = new ElementModel().FormElement();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private cd: ChangeDetectorRef,
    private service: ElementService,
    private router: Router,
        private activatedroute: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }
public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
  createElement(form: FormGroup) {

    const url = `${this.api}element`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.create(url, this.toFormData(form.value)).subscribe(
        response => {
          this.toast.success('Elemento creado correctamente', 'Éxito');
          this.goBack();
          this.showSpinner = false;
        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );
    }
  }

  toFormData(formValue: Element) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.FormElement.patchValue({
        img: file
      });
      this.cd.markForCheck();
    }
  }

}
