import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementModel } from '@data/models/element.model';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElementService } from '@data/service/element.service';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';

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
    private dialogRef: MatDialogRef<EditElementComponent>,
    private service: ElementService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Element) { }

  ngOnInit(): void {
    this.FormElement.setValue({
      _id: this.data._id,
      name: this.data.name,
      first_status: this.data.first_status,
      second_status: this.data.second_status,
      third_status: this.data.third_status,
      initial_condition: this.data.initial_condition,
      type: this.data.type,
      description: this.data.description,
      img: this.data.img
    });
  }

  editElement(form: FormGroup) {

    this.showSpinner = true;
    const url = `${this.api}element`;

    if (!form.invalid) {
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Elemento editado correctamente', 'Éxito');
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
