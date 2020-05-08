import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NodeModel } from '@data/models/node.model';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NodeService } from '@data/service/node.service';
import { ToastrService } from 'ngx-toastr';
import { Node } from '@data/schema/node.interface';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.scss']
})
export class EditNodeComponent implements OnInit {

  public FormNode: FormGroup = new NodeModel().FormNode();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<EditNodeComponent>,
    private service: NodeService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Node) { }

  ngOnInit(): void {
    this.FormNode.setValue({
      _id: this.data._id,
      name: this.data.name,
      description: this.data.description,
      img: this.data.img
    });
  }

  editNode(form: FormGroup) {

    this.showSpinner = true;
    const url = `${this.api}node`;

    if (!form.invalid) {
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Nodo editado correctamente', 'Éxito');
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
