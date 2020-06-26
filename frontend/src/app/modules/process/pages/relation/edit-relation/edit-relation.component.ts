import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RelationService } from '@data/service/relation.service';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
import { Relation } from '@data/schema/process.interface';

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
    private dialogRef: MatDialogRef<EditRelationComponent>,
    private service: RelationService,
    private serviceNode: ElementService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Relation) { }

  ngOnInit(): void {
    this.getElements();
    this.FormRelation.get('element_source').disable();
  }

  getElements() {
    this.serviceNode.getAll(`${this.api}node`).subscribe(
      response => {
        this.elements = response;
        this.setFormData();
        this.elementsTarget = this.elements.filter( (x: Element) => x.id !== this.FormRelation.get('element_source').value);
        this.FormRelation.get('element_target').enable();
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  setFormData() {
    this.FormRelation.setValue({
      id: this.data.id,
      graph: this.data.graph,
      element_source: this.data.element_source.id,
      element_target: this.data.element_target.id,
      description: this.data.description
    });
  }

  editRelation(form: FormGroup) {
    const url = `${this.api}nodeGraph`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Relación editada correctamente', 'Éxito');
          this.showSpinner = false;
          this.dialogRef.close(response);
        },
        error => {
          this.showSpinner = false;
          this.toast.error(error.error.message, 'Error');
        }
      );
    }

  }

}
