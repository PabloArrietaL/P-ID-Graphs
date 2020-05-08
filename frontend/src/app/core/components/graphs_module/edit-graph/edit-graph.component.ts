import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GraphModel } from '@data/models/graph.model';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Graph } from '@data/schema/graph.interface';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from '@data/service/graph.service';

@Component({
  selector: 'app-edit-graph',
  templateUrl: './edit-graph.component.html',
  styleUrls: ['./edit-graph.component.scss']
})
export class EditGraphComponent implements OnInit {

  public FormGraph: FormGroup = new GraphModel().GraphModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<EditGraphComponent>,
    private service: GraphService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Graph) { }

  ngOnInit(): void {
    this.FormGraph.setValue({
      _id: this.data._id,
      name: this.data.name,
      description: this.data.description
    });
  }

  editGraph(form: FormGroup) {

    const url = `${this.api}graph`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.edit(url, form.value).subscribe(
        response => {
          this.toast.success('Grafo editado correctamente', 'Éxito');
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
