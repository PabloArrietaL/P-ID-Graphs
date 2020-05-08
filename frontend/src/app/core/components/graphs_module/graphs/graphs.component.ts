import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { environment } from '@env/environment';
import { GraphService } from '@data/service/graph.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Graph } from '@data/schema/graph.interface';
import { Router } from '@angular/router';
import { CreateGraphComponent } from '../create-graph/create-graph.component';
import { EditGraphComponent } from '../edit-graph/edit-graph.component';
import { NodesGraphService } from '@data/service/node-graph.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  public displayedColumns: Array<string> = ['name', 'description', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private details: NodesGraphService,
    private service: GraphService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.getGraphs();
  }

  openAdd(graph: Graph) {
    this.details.graph = graph;
    this.route.navigate(['/graph-details']);
  }

  getGraphs() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}graph`).subscribe(
      response => {
        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response.reverse());
          this.dataSource.paginator = this.paginator;
          this.showSpinner = false;
        }
      },
      _ => {
        this.showSpinner = false;
      }
    );
  }

  openCreate() {
    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    const dialog = this.dialog.open(CreateGraphComponent, dialogConfig);
    dialog.afterClosed().subscribe(result => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data;
        data.splice(0, 0, result);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openEdit(graph: Graph) {
    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = graph;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    const dialog = this.dialog.open(EditGraphComponent, dialogConfig);
    dialog.afterClosed().subscribe( (result: Graph) => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data;
        data.forEach( (gra: Graph) => {
          if (gra._id === result._id) {
            gra.name = result.name;
            gra.description = result.description;
          }
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id: string) {
    this.service.delete(`${this.api}graph`, id).subscribe(
      _ => {
        this.toast.success('Grafo eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter( (x: Graph) => x._id !== id);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
