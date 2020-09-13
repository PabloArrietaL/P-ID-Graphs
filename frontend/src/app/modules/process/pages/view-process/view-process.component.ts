import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import cytoscape from 'cytoscape';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { ProcessService } from '@data/service/process.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ViewElementComponent } from '../view-element/view-element.component';

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.scss']
})
export class ViewProcessComponent implements OnInit {

  public processId: number;
  public api = environment.api;
  public data = [];

  public graphData = {
    nodes: [],
    edges: []
  };

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private router: Router,
    private service: ProcessService,
    private toast: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.processId = this.actRoute.snapshot.params.id;
    this.getEdges();
  }

  goBack() {
    this.router.navigate(['process']);
  }

  getEdges() {
    this.service.getAll(`${this.api}process/${this.processId}`).subscribe(
      response => {
        this.data = response;
        this.formatData();
      },
      () => {
        this.toast.error('Ha ocurrido un error', 'Error');
        this.route.navigate(['/process']);
      }
    );
  }

  formatData() {

    const graph = cytoscape({
      container: document.getElementById('cy'),
      boxSelectionEnabled: false,
      autounselectify: true,
      elements: this.data,
      style: [
        {
          selector: 'node',
          style: {
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#ADF5FF',
            'border-width': '1px',
            'border-color': '#0075A2',
            'border-style': 'solid',
            'font-size': '6px',
            'font-family': 'Montserrat-ligth',
            height: '25px',
            width: '25px',
            label: 'data(name)'
          }
        },
        {
          selector: 'edge',
          css: {
            'curve-style': 'bezier',
            'line-color': '#481620',
            'target-arrow-color': '#481620',
            'target-arrow-fill': 'filled',
            width: '1px'
          }
        }
      ]
    });

    graph.layout({
      name: 'cose'
    }).run();

    graph.on('click', 'node', (event) => {
      const id = event.target.id();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '40%';
      dialogConfig.height = '40%';
      dialogConfig.maxHeight = '60vh';
      dialogConfig.data = id;
      this.dialog.open(ViewElementComponent, dialogConfig);
    });
  }

}
