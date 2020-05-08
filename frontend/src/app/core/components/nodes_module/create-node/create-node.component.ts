import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { NodeModel } from '@data/models/node.model';
import { NodeService } from '@data/service/node.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Node } from '@data/schema/node.interface';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss']
})
export class CreateNodeComponent implements OnInit {

  public FormNode: FormGroup = new NodeModel().FormNode();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<CreateNodeComponent>,
    private cd: ChangeDetectorRef,
    private service: NodeService,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  createNode(form: FormGroup) {

    const url = `${this.api}node`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.create(url, this.toFormData(form.value)).subscribe(
        response => {
          this.toast.success('Nodo creado correctamente', 'Éxito');
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

  toFormData(formValue: Node) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    console.log(formData.get('name'));
    return formData;
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.FormNode.patchValue({
        img: file
      });
      this.cd.markForCheck();
    }
  }

}
