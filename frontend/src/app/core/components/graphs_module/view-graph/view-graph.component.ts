import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import cytoscape from 'cytoscape';
import { NodesGraphService } from '@data/service/node-graph.service';
import { environment } from '@env/environment';
import { NodesGraph } from '@data/schema/graph.interface';
import { ToastrService } from 'ngx-toastr';
import { Node } from '@data/schema/node.interface';

@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.scss']
})
export class ViewGraphComponent implements OnInit {

  public graphId: string;
  public api = environment.api;
  public data: Array<NodesGraph> = [];

  public graphData = {
    nodes: [],
    edges: []
  };

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private service: NodesGraphService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.graphId = this.actRoute.snapshot.params.id;
    this.getEdges();
  }

  getEdges() {
    this.service.getAll(`${this.api}nodeGraph/${this.graphId}`).subscribe(
      response => {
        if (response.length > 0) {
          this.data = response;
          this.formatData();
        }
      },
      _ => {
        this.toast.error('No hay nodos asociados al grafo', 'Error');
        this.route.navigate(['/graphs']);
      }
    );
  }

  formatData() {
    const nodes = [];
    const noDuplicates = [];
    this.data.forEach(node => {
      nodes.push(node.node_source);
      nodes.push(node.node_target);
      this.graphData.edges.push({
        data: {source: node.node_source._id, target: node.node_target._id}
      });
    });
    nodes.forEach( (node: Node) => {
      const aux = noDuplicates.filter( (x: Node) => x._id === node._id);
      if ( aux.length === 0) {
        noDuplicates.push(node);
        this.graphData.nodes.push({
          data: {id: node._id, name: node.name}
        });
      }
    });

    const graph = cytoscape({
      container: document.getElementById('cy'),
      boxSelectionEnabled: false,
      autounselectify: true,
      elements: this.graphData,
      style: [
        {
            selector: 'node',
            style: {
                'background-color': 'red',
                label: 'data(name)'
            }
        }
      ]
    });

    graph.layout({
      name: 'grid'
    }).run();
  }

  downloadGraph() {
    const graph = cytoscape({
      container: document.getElementById('cy'),
      elements: this.graphData,
      style: [
        {
            selector: 'node',
            style: {
                'background-color': 'red',
                label: 'data(name)'
            }
        }
      ]
    });

    graph.png({
      full: true
    });
  }

}
