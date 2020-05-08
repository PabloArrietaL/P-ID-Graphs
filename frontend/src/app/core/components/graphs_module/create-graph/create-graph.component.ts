import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GraphModel } from '@data/models/graph.model';
import { environment } from '@env/environment';
import { MatDialogRef } from '@angular/material';
import { GraphService } from '@data/service/graph.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-graph',
  templateUrl: './create-graph.component.html',
  styleUrls: ['./create-graph.component.scss']
})
export class CreateGraphComponent implements OnInit {

  public FormGraph: FormGroup = new GraphModel().GraphModel();
  public showSpinner = false;
  public api = environment.api;

  constructor(
    private dialogRef: MatDialogRef<CreateGraphComponent>,
    private service: GraphService,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  createGraph(form: FormGroup) {

    const url = `${this.api}graph`;

    if (!form.invalid) {
      this.showSpinner = true;
      this.service.create(url, form.value).subscribe(
        response => {
          this.toast.success('Grafo creado correctamente', 'Éxito');
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
