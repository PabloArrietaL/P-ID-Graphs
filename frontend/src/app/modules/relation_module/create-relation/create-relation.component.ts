import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { environment } from '@env/environment';
import { RelationService } from '@data/service/relation.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
import { Process } from '@data/schema/process.interface';

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
    private dialogRef: MatDialogRef<CreateRelationComponent>,
    private service: RelationService,
    private serviceElement: ElementService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getElements();
    this.FormRelation.patchValue({
      graph: this.service.process
    });
  }

  getElements() {
    this.serviceElement.getAll(`${this.api}node`).subscribe(
      response => {
        this.elements = response;
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  createRelation(form: FormGroup) {

    const url = `${this.api}nodeGraph`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.create(url, form.value).subscribe(
        response => {
          this.toast.success('Relación creada correctamente', 'Éxito');
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

  filterNodes(element: Element) {
    this.elementsTarget = this.elements.filter( (x: Process) => x._id !== element._id);
    this.FormRelation.get('element_target').enable();
  }

}
