import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { NodesGraphModel } from '@data/models/node-graph.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NodesGraphService } from '@data/service/node-graph.service';
import { ToastrService } from 'ngx-toastr';
import { NodeService } from '@data/service/node.service';
import { Node } from '@data/schema/node.interface';
import { NodesGraph } from '@data/schema/graph.interface';

@Component({
  selector: 'app-edit-nodes-graph',
  templateUrl: './edit-nodes-graph.component.html',
  styleUrls: ['./edit-nodes-graph.component.scss']
})
export class EditNodesGraphComponent implements OnInit {

  public FormNodesGraph: FormGroup = new NodesGraphModel().NodesGraphModel();
  public showSpinner = false;
  public api = environment.api;
  public nodes: Array<Node> = [];
  public nodesTarget: Array<Node> = [];

  constructor(
    private dialogRef: MatDialogRef<EditNodesGraphComponent>,
    private service: NodesGraphService,
    private serviceNode: NodeService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: NodesGraph) { }

  ngOnInit(): void {
    this.getNodes();
    this.FormNodesGraph.get('node_source').disable();
  }

  getNodes() {
    this.serviceNode.getAll(`${this.api}node`).subscribe(
      response => {
        this.nodes = response;
        this.setFormData();
        this.nodesTarget = this.nodes.filter( (x: Node) => x._id !== this.FormNodesGraph.get('node_source').value);
        this.FormNodesGraph.get('node_target').enable();
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  setFormData() {
    this.FormNodesGraph.setValue({
      _id: this.data._id,
      graph: this.data.graph,
      node_source: this.data.node_source._id,
      node_target: this.data.node_target._id,
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
