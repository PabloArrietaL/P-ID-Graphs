import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
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
    private serviceElement: ElementService,
    private serviceProcess: ProcessService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getElements();
    if (!this.serviceProcess.IDP) {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['details'], { relativeTo: this.activatedroute });
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

  filterElement(element: Element) {
    this.elementsTarget = this.elements.filter((x: Element) => x.id !== +element.id);
    this.FormRelation.get('element_target').enable();
  }

}
