import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElementService } from '@data/service/element.service';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  public FormElement: FormGroup = new ElementModel().FormElement();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private service: ElementService,
    private toast: ToastrService,
       private router: Router,
        private activatedroute: ActivatedRoute,
    // @Inject(MAT_DIALOG_DATA) public data: Element
    ) { }

  ngOnInit(): void {

    if (this.service.ID === undefined) {
      this.goBack();
      
    }else{
    this.FormElement.setValue({
      id: this.service.ID.id,
      name: this.service.ID.name,
      first_status: this.service.ID.first_status,
      second_status: this.service.ID.second_status,
      third_status: this.service.ID.third_status,
      initial_condition: this.service.ID.initial_condition,
      type: this.service.ID.type,
      description: this.service.ID.description,
      img: this.service.ID.img
    });
  }
}
public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
  editElement(form: FormGroup) {

    this.showSpinner = true;
    const url = `${this.api}element`;

    if (!form.invalid) {
      this.service.edit(url, form.value).subscribe(
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
