import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RelationService } from '@data/service/relation.service';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
import { Relation, RelationEdit } from '@data/schema/process.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '@data/service/process.service';

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.scss']
})
export class EditRelationComponent implements OnInit {

  public FormRelation: FormGroup = new RelationModel().RelationModel();
  public showSpinner = false;
  public api = environment.api;
  public elements: Array<Element> = [];
  public elementsTarget: Array<Element> = [];

  constructor(
    private service: RelationService,
            private serviceProcess:ProcessService,

    private serviceElement: ElementService,
               private router: Router,
        private activatedroute: ActivatedRoute,
    private toast: ToastrService,
   ) { }

  ngOnInit(): void {
      if (this.serviceProcess.IDP === undefined) {
      this.goBack();
      
    } else{
    this.getElements();
    this.setFormData();
    this.FormRelation.get('element_source').disable();
    this.FormRelation.get('element_target').disable();
    }
  }
public goBack() {
    this.router.navigateByUrl('/process/details', { relativeTo: this.activatedroute });
  }
  getElements() {
    this.serviceElement.getAll(`${this.api}element`).subscribe(
      response => {
        this.elements = response;
        // this.elementsTarget = this.elements.filter( (x: Element) => x.id !== this.FormRelation.get('element_source').value);
        // this.FormRelation.get('element_target').enable();
        
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  setFormData() {
    this.FormRelation.setValue({
      id: this.service.ID.id,
      process: this.serviceProcess.IDP.id,
      element_source: this.service.ID.element_source.id,
      element_target: this.service.ID.element_target.id,
      description: this.service.ID.description
    });
    
  }
  // filterElement(element: Element) {
  //   this.elementsTarget = this.elements.filter( (x: Element) => x.id !== +element.id);
  //   // this.FormRelation.get('element_target').enable();
  // }
  editRelation(form: FormGroup) {
    const url = `${this.api}relation`;

    if (!form.invalid) {
             const RELATION:RelationEdit={
      id:this.service.ID.id,
        // id?: string;
    process: this.serviceProcess.IDP.id,
 element_source: this.service.ID.element_source.id,
      element_target: this.service.ID.element_target.id,
    description: form.value.description,
    }
      this.showSpinner = true;
      this.service.edit(url, RELATION).subscribe(
        response => {
          this.toast.success('Relación editada correctamente', 'Éxito');
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
