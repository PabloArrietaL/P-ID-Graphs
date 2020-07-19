import { Component, OnInit } from "@angular/core";
import { ElementService } from "@data/service/element.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { ElementModel } from "@data/models/element.model";
import { environment } from "@env/environment";
import { ElementDetail } from "@data/schema/element.interface";
import { ElementDetailsService } from "@data/service/element-details.service";

@Component({
  selector: "app-details-element",
  templateUrl: "./details-element.component.html",
  styleUrls: ["./details-element.component.scss"],
})
export class DetailsElementComponent implements OnInit {
  public showSpinner = false;
  public FormDetail3s = new ElementModel().FormElementDetailsWith3S();
  public FormDetail2s = new ElementModel().FormElementDetailsWith2S();

  public api = environment.api;
  public Name = true;
  public Fstatus = true;
  public Sstatus = true;
  public Tstatus = true;
  public disabled = false;
  public cancel = false;
  public finish = false;
  public sameElement = true;
  public cheked1_2;
  public cheked1_3;
  public cheked2_1;
  public cheked2_3;
  public cheked3_1;
  public cheked3_2;
  // public IMG =true;
  constructor(
    public service: ElementService,
    public serviceD: ElementDetailsService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.service.ID === undefined) {
      this.goBack();
      this.Name = false;
      this.Fstatus = false;
      this.Sstatus = false;
      this.Tstatus = false;

    } else {
      console.log(this.service.ID.third_status);
      
      if (this.service.ID.third_status === null) {
          this.FormDetail2s.setValue({
            estado1estado2: this.service.ID.detail.first_status.second_status
              .checked,

            estado2estado1: this.service.ID.detail.second_status.first_status
              .checked,
          });
      }else{
      this.FormDetail3s.setValue({
        estado1estado2: this.service.ID.detail.first_status.second_status
          .checked,
        estado1estado3: this.service.ID.detail.first_status.third_status
          .checked,
        estado2estado1: this.service.ID.detail.second_status.first_status
          .checked,
        estado2estado3: this.service.ID.detail.second_status.third_status
          .checked,
        estado3estado1: this.service.ID.detail.third_status.first_status
          .checked,
        estado3estado2: this.service.ID.detail.third_status.second_status
          .checked,
      });
    }
    }
  }
  public goBack() {
    this.router.navigateByUrl("/element", { relativeTo: this.activatedroute });
  }
  public disabledCheckbox() {
    this.disabled = true;
    this.cancel = true;
    this.finish = true;
  }
  public abledCheckbox() {
    this.disabled = false;
    this.cancel = false;
    this.finish = false;
  }

  public Status1_2(cheked1_2: any) {
    this.FormDetail3s.value.estado1estado2 = cheked1_2.checked;
  }

  public Status1_3(cheked1_3: any) {
    this.FormDetail3s.value.estado1estado3 = cheked1_3.checked;
  }
  public Status2_1(cheked2_1: any) {
    this.FormDetail3s.value.estado2estado1 = cheked2_1.checked;
  }

  public Status2_3(cheked2_3: any) {
    this.FormDetail3s.value.estado2estado3 = cheked2_3.checked;
  }
  public Status3_1(cheked3_1: any) {
    this.FormDetail3s.value.estado3estado1 = cheked3_1.checked;
  }

  public Status3_2(cheked3_2: any) {
    this.FormDetail3s.value.estado3estado2 = cheked3_2.checked;
  }
  // Prueba() {

  //   const ELEMENTO: ElementDetail = {
  //     id: this.service.ID.id,
  //     // id?: string;
  //     name: this.service.ID.name,
  //     description: this.service.ID.description,
  //     first_status: { id: this.service.ID.first_status.id },
  //     second_status: { id: this.service.ID.second_status.id },
  //     third_status: { id: this.service.ID.third_status.id },
  //     initial_condition: this.service.ID.initial_condition,
  //     detail: {
  //       id: this.service.ID.detail.id,
  //       first_status: {
  //         second_status: {
  //           status: { id: this.service.ID.second_status.id },
  //           checked: this.FormDetail3s.value.estado1estado2,
  //         },
  //         third_status: {
  //           status: { id: this.service.ID.third_status.id },
  //           checked: this.FormDetail3s.value.estado1estado3,
  //         },
  //       },
  //       second_status: {
  //         first_status: {
  //           status: { id: this.service.ID.first_status.id },
  //           checked: this.FormDetail3s.value.estado2estado1,
  //         },
  //         third_status: {
  //           status: { id: this.service.ID.second_status.id },
  //           checked: this.FormDetail3s.value.estado2estado3,
  //         },
  //       },
  //       third_status: {
  //         first_status: {
  //           status: { id: this.service.ID.first_status.id },
  //           checked: this.FormDetail3s.value.estado3estado1,
  //         },
  //         second_status: {
  //           status: { id: this.service.ID.second_status.id },
  //           checked: this.FormDetail3s.value.estado3estado2,
  //         },
  //       },
  //     },
  //     type: this.service.ID.type,
  //     img: this.service.ID.img,
  //   };
  //   console.log(ELEMENTO);
  // }
  public Detail(form: FormGroup) {
    this.showSpinner = true;
    const url = `${this.api}element-details`;

    if (!form.invalid) {
 
          const ELEMENTOW2s: ElementDetail = {
            //  id: this.service.ID.id,
            // id?: string;

            id: this.service.ID.detail.id,
            first_status: {
              second_status: {
                status: { id: this.service.ID.second_status.id },
                checked: this.FormDetail3s.value.estado1estado2,
              },
         
            },
            second_status: {
              first_status: {
                status: { id: this.service.ID.first_status.id },
                checked: this.FormDetail3s.value.estado2estado1,
              },
         
            },
            third_status: null
          };
          if ( this.service.ID.third_status===null ) {
          
            this.showSpinner = true;
            this.service.Detail(url, ELEMENTOW2s).subscribe(
              (response) => {
                this.toast.success("Detalle editado correctamente", "Éxito");
                this.abledCheckbox();
                this.showSpinner = false;
              },
              (error) => {
                this.showSpinner = false;
                this.toast.error(error.error.message, "Error");
              }
            );
          } else {
                   const ELEMENTOW3s: ElementDetail = {
                     //  id: this.service.ID.id,
                     // id?: string;

                     id: this.service.ID.detail.id,
                     first_status: {
                       second_status: {
                         status: { id: this.service.ID.second_status.id },
                         checked: this.FormDetail3s.value.estado1estado2,
                       },
                       third_status: {
                         status: { id: this.service.ID.third_status.id },
                         checked: this.FormDetail3s.value.estado1estado3,
                       },
                     },
                     second_status: {
                       first_status: {
                         status: { id: this.service.ID.first_status.id },
                         checked: this.FormDetail3s.value.estado2estado1,
                       },
                       third_status: {
                         status: { id: this.service.ID.second_status.id },
                         checked: this.FormDetail3s.value.estado2estado3,
                       },
                     },
                     third_status: {
                       first_status: {
                         status: { id: this.service.ID.first_status.id },
                         checked: this.FormDetail3s.value.estado3estado1,
                       },
                       second_status: {
                         status: { id: this.service.ID.second_status.id },
                         checked: this.FormDetail3s.value.estado3estado2,
                       },
                     },
                   };
            this.showSpinner = true;
            this.service.Detail(url, ELEMENTOW3s).subscribe(
              (response) => {
                this.toast.success("Detalle editado correctamente", "Éxito");
 this.abledCheckbox();                this.showSpinner = false;
              },
              (error) => {
                this.showSpinner = false;
                this.toast.error(error.error.message, "Error");
              }
            );
          }
      // this.service.Detail(url, ELEMENTOW3s).subscribe(
      //   (response) => {
      //     this.toast.success("Detalle editado correctamente", "Éxito");
      //     this.showSpinner = false;
      //     // this.goBack();
      //     this.abledCheckbox();
      //   },
      //   (error) => {
      //     this.showSpinner = false;
      //     this.toast.error(error.error.message, "Error");
      //   }
      // );
    }
  }
}
