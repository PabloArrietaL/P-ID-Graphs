import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { RelationModel } from '@data/models/relation.model';
import { RelationService } from '@data/service/relation.service';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';
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
    private serviceProcess: ProcessService,
    private serviceElement: ElementService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.serviceProcess.IDP === undefined) {
      this.goBack();

    } else {
      this.getElements();
      this.FormRelation.get('element_source').disable();
      this.FormRelation.get('element_target').disable();
    }
  }

  goBack() {
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

}
