import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { RelationService } from '@data/service/relation.service';
import { environment } from '@env/environment';
import { ProcessDetails } from '@data/schema/process.interface';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';

cytoscape.use(dagre);

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.scss']
})
export class ViewProcessComponent implements OnInit {

  public processId: string;
  public api = environment.api;
  public data: Array<ProcessDetails> = [];

  public graphData = {
    nodes: [],
    edges: []
  };

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private service: RelationService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.processId = this.actRoute.snapshot.params.id;
    // this.getEdges();
  }

  // getEdges() {
  //   this.service.getAll(`${this.api}relation/${this.processId}`).subscribe(
  //     response => {
  //       if (response.length > 0) {
  //         this.data = response;
  //         this.formatData();
  //       }
  //     },
  //     _ => {
  //       this.toast.error('No hay elementos asociados al proceso', 'Error');
  //       this.route.navigate(['/processes']);
  //     }
  //   );
  // }

  // formatData() {
  //   const nodes = [];
  //   const noDuplicates = [];
  //   this.data.forEach(node => {
  //     nodes.push(node.element_source);
  //     nodes.push(node.element_target);
  //     this.graphData.edges.push({
  //       data: { source: node.element_source.id, target: node.element_target.id }
  //     });
  //   });
  //   nodes.forEach((element: Element) => {
  //     const aux = noDuplicates.filter((x: Element) => x.id === element.id);
  //     if (aux.length === 0) {
  //       noDuplicates.push(element);
  //       this.graphData.nodes.push({
  //         data: { id: element.id, name: element.name }
  //       });
  //     }
  //   });

  //   const graph = cytoscape({
  //     container: document.getElementById('cy'),
  //     boxSelectionEnabled: false,
  //     autounselectify: true,
  //     elements: this.graphData,
  //     style: [
  //       {
  //         selector: 'node',
  //         style: {
  //           'text-valign': 'center',
  //           'text-halign': 'center',
  //           'background-color': 'red',
  //           'font-size': '6rem',
  //           'font-family': 'Montserrat-ligth',
  //           height: '12rem',
  //           width: '15rem',
  //           label: 'data(name)'
  //         }
  //       },
  //       {
  //         selector: 'edge',
  //         css: {
  //           'curve-style': 'bezier',
  //           'target-arrow-shape': 'triangle'
  //         }
  //       }
  //     ]
  //   });

  //   graph.layout({
  //     name: 'dagre'
  //   }).run();
  // }

}
