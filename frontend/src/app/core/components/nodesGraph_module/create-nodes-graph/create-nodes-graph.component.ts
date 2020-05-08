import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NodesGraphModel } from '@data/models/node-graph.model';
import { environment } from '@env/environment';
import { NodesGraphService } from '@data/service/node-graph.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { NodeService } from '@data/service/node.service';
import { Node } from '@data/schema/node.interface';
import { Graph } from '@data/schema/graph.interface';

@Component({
  selector: 'app-create-nodes-graph',
  templateUrl: './create-nodes-graph.component.html',
  styleUrls: ['./create-nodes-graph.component.scss']
})
export class CreateNodesGraphComponent implements OnInit {

  public FormNodesGraph: FormGroup = new NodesGraphModel().NodesGraphModel();
  public showSpinner = false;
  public api = environment.api;
  public nodes: Array<Node> = [];
  public nodesTarget: Array<Node> = [];

  constructor(
    private dialogRef: MatDialogRef<CreateNodesGraphComponent>,
    private service: NodesGraphService,
    private serviceNode: NodeService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getNodes();
    this.FormNodesGraph.patchValue({
      graph: this.service.graph
    });
  }

  getNodes() {
    this.serviceNode.getAll(`${this.api}node`).subscribe(
      response => {
        this.nodes = response;
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

  filterNodes(node: Node) {
    this.nodesTarget = this.nodes.filter( (x: Graph) => x._id !== node._id);
    this.FormNodesGraph.get('node_target').enable();
  }

}
