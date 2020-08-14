import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { environment } from '@env/environment';
import { ElementService } from '@data/service/element.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Element, Status, ElementEdit } from '@data/schema/element.interface';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {
  public Status: Array<Status> = [];
  public secondStatus: Array<Status> = [];
  public thirdStatus: Array<Status> = [];
  public thirdStatusFinal: Array<Status> = [];
  public FormElement: FormGroup = new ElementModel().FormElement();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private service: ElementService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    if (this.service.ID === undefined) {
      this.goBack();

    } else {

      this.getStatus();
      if (this.service.ID.third_status === null) {
            this.FormElement.setValue({
      id: this.service.ID.id,
      name: this.service.ID.name,
      first_status: this.service.ID.first_status.id,
      second_status: this.service.ID.second_status.id,
            third_status: null,

      initial_condition: this.service.ID.initial_condition,
      type: this.service.ID.type,
      description: this.service.ID.description,
      img: this.service.ID.img
    });
      } else {
      this.FormElement.setValue({
      id: this.service.ID.id,
      name: this.service.ID.name,
      first_status: this.service.ID.first_status.id,
      second_status: this.service.ID.second_status.id,
      third_status: this.service.ID.third_status.id,
      initial_condition: this.service.ID.initial_condition,
      type: this.service.ID.type,
      description: this.service.ID.description,
      img: this.service.ID.img
    });
  }}
    this.FormElement.get('first_status').disable();
    this.FormElement.get('initial_condition').disable();

}
public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
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

    this.FormElement.get('second_status').enable();
  }

      filterStatus3(status: Status) {

    this.thirdStatus = this.Status.filter((x: Status) => x.id !== +status.id);
    this.thirdStatus = this.secondStatus.filter((x: Status) => x.id !== +status.id);
    this.thirdStatusFinal = this.thirdStatus;
    this.FormElement.get('third_status').enable();
  }

  editElement(form: FormGroup) {

    this.showSpinner = true;
    const url = `${this.api}element`;

    if (!form.invalid) {
               const ELEMENTOW3: ElementEdit = {
      id: this.service.ID.id,
        // id?: string;
     name:  form.value.name,
    description:  form.value.description,
   first_status: this.service.ID.first_status.id,
      second_status: this.service.ID.second_status.id,
      third_status: null,
    initial_condition:  form.value.initial_condition,
    type:  form.value.type,
    img:  form.value.img,
    };

               const ELEMENTO: ElementEdit = {
      id: this.service.ID.id,
        // id?: string;
     name:  form.value.name,
    description:  form.value.description,
   first_status: this.service.ID.first_status.id,
      second_status: this.service.ID.second_status.id,
      third_status: this.service.ID.third_status.id,
    initial_condition:  form.value.initial_condition,
    type:  form.value.type,
    img:  form.value.img,
    };

               if (this.service.ID.third_status === null) {
            this.service.edit(url,ELEMENTOW3).subscribe(
        response => {
          this.toast.success('Elemento editado correctamente', 'Éxito');
          this.showSpinner = false;
          this.goBack();        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );
    } else {
            this.service.edit(url, ELEMENTO).subscribe(
        response => {
          this.toast.success('Elemento editado correctamente', 'Éxito');
          this.showSpinner = false;
          this.goBack();        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );

    }


    }

  }

}

