import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { environment } from '@env/environment';
import { RelationService } from '@data/service/relation.service';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
import { ProcessDetails } from '@data/schema/process.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '@data/service/process.service';

@Component({
  selector: 'app-create-relation',
  templateUrl: './create-relation.component.html',
  styleUrls: ['./create-relation.component.scss']
})
export class CreateRelationComponent implements OnInit {

  public FormRelation: FormGroup = new RelationModel().RelationModel();
  public showSpinner = false;
  public api = environment.api;
  public elements: Array<Element> = [];
  public elementsTarget: Array<Element> = [];

  constructor(
    private service: RelationService,
    private serviceElement: ElementService,
        private serviceProcess:ProcessService,
           private router: Router,
        private activatedroute: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getElements();
     if (this.serviceProcess.IDP === undefined) {
      this.goBack();
      
    } 
  
  }
public goBack() {
    this.router.navigateByUrl('/process/details', { relativeTo: this.activatedroute });
  }
  getElements() {
    this.serviceElement.getAll(`${this.api}element`).subscribe(
      response => {
        this.elements = response;
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

//   createRelation(form: FormGroup) {

//     const url = `${this.api}relation`;

//     if (!form.invalid) {
//          const RELATION:ProcessDetails={
//       // id:this.service.ID.id,
//         // id?: string;
//     process: this.serviceProcess.IDP.id,
//     element_source: form.value.element_source.id,
//     element_target: form.value.element_target.id,
//     description: form.value.description,
//     }
//       this.showSpinner = true;
//       this.service.create(url, RELATION).subscribe(
//         response => {
//           this.toast.success('Relación creada correctamente', 'Éxito');
//           this.showSpinner = false;
// this.goBack();        },
//         error => {
//           this.showSpinner = false;
//           this.toast.error(error.error.message, 'Error');
//         }
//       );
//     }
//   }

  filterElement(element: Element) {
    this.elementsTarget = this.elements.filter( (x: Element) => x.id !== +element.id);
    this.FormRelation.get('element_target').enable();
  }

}
