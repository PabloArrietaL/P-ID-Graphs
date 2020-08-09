import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { ElementService } from '@data/service/element.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Element, Status } from '@data/schema/element.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.scss']
})
export class CreateElementComponent implements OnInit {
  public Status: Array<Status> = [];
  public secondStatus: Array<Status> = [];
  public thirdStatus: Array<Status> = [];
  public thirdStatusFinal: Array<Status> = [];
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
    this.getStatus();
  }
  public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
  createElement(form: FormGroup) {

    const url = `${this.api}element`;

    if (!form.invalid) {
      const ELEMENTO: Element = {
        name: form.value.name,
        description: form.value.description,
        first_status: form.value.first_status.id,
        second_status: form.value.second_status.id,
        third_status: form.value.third_status.id,
        initial_condition: form.value.initial_condition,
        type: form.value.type,
        img: form.value.img,
      };
      const ELEMENTOWT: Element = {
        name: form.value.name,
        description: form.value.description,
        first_status: form.value.first_status.id,
        second_status: form.value.second_status.id,
        initial_condition: form.value.initial_condition,
        type: form.value.type,
        img: form.value.img,
      };
      if (ELEMENTO.third_status === undefined) {
        this.showSpinner = true;
        this.service.create(url, this.toFormData(ELEMENTOWT)).subscribe(
          (response) => {
            this.toast.success('Elemento creado correctamente', 'Éxito');
            this.goBack();
            this.showSpinner = false;
          },
          (error) => {
            this.showSpinner = false;
            this.toast.error(error.error.message, 'Error');
          }
        );
      } else {
        this.showSpinner = true;
        this.service.create(url, this.toFormData(ELEMENTO)).subscribe(
          (response) => {
            this.toast.success('Elemento creado correctamente', 'Éxito');
            this.goBack();
            this.showSpinner = false;
          },
          (error) => {
            this.showSpinner = false;
            this.toast.error(error.error.message, 'Error');
          }
        );
      }
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
        img: file,
      });
      this.cd.markForCheck();
    }
  }
  getStatus() {
    this.service.getAll(`${this.api}status`).subscribe(
      response => {
        this.Status = response;

      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  filterStatus2(status: Status) {
    this.secondStatus = this.Status.filter((x: Status) => x.id !== +status.id);
    this.thirdStatus = this.Status.filter((x: Status) => x.id !== +status.id);

    this.FormElement.get('second_status').enable();
  }

  filterStatus3(status: Status) {

    this.thirdStatus = this.Status.filter((x: Status) => x.id !== +status.id);
    this.thirdStatus = this.secondStatus.filter((x: Status) => x.id !== +status.id);
    this.thirdStatusFinal = this.thirdStatus;
    if (this.thirdStatusFinal === this.Status) {
      this.FormElement.get('first_status').enable();

    }
    this.FormElement.get('third_status').enable();
  }



}
