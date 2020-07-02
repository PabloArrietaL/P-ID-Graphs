import { Component, OnInit } from '@angular/core';
import { ElementService } from '@data/service/element.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { environment } from '@env/environment';
import { elementDetails } from '@data/schema/element.interface';
import { ElementDetailsService } from '@data/service/element-details.service';

@Component({
  selector: 'app-details-element',
  templateUrl: './details-element.component.html',
  styleUrls: ['./details-element.component.scss']
})
export class DetailsElementComponent implements OnInit {
  public showSpinner = false;
  public FormElement: FormGroup = new ElementModel().FormElementDetails();
  public api = environment.api;
  public Name = true;
  public Fstatus = true;
  public Sstatus = true;
  public Tstatus = true;
  // public IMG =true;
  constructor(
    public service: ElementService,
    public serviceD: ElementDetailsService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.service.ID === undefined) {
      this.goBack();
      this.Name = false;
      this.Fstatus = false;
      this.Sstatus = false;
      this.Tstatus = false;

      if (this.service.ID.third_status === null
      ) {
        this.Tstatus = false;

      }
    }
  }
  public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
  createStatus1fromStatus2() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.first_status.id,
      status_target: this.service.ID.second_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
        console.log(ELEMENTD);

      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
  createStatus1fromStatus3() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.first_status.id,
      status_target: this.service.ID.third_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
        console.log(ELEMENTD);

      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
  createStatus2fromStatus1() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.second_status.id,
      status_target: this.service.ID.first_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
  createStatus2fromStatus3() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.second_status.id,
      status_target: this.service.ID.third_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
  createStatus3fromStatus1() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.third_status.id,
      status_target: this.service.ID.first_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
  createStatus3fromStatus2() {

    const url = `${this.api}element-details`;


    const ELEMENTD: elementDetails = {
      // id:this.service.ID.id,
      element: this.service.ID.id,
      status_source: this.service.ID.third_status.id,
      status_target: this.service.ID.second_status.id,
    };
    this.showSpinner = true;
    this.serviceD.create(url, ELEMENTD).subscribe(
      response => {
        // this.toast.success('Proceso creado correctamente', 'Éxito');
        // this.showSpinner = false;
        // this.goBack();
      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );
  }


}
