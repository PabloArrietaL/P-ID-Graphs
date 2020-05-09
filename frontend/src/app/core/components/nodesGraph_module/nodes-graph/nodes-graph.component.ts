import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NodesGraph, Graph } from '@data/schema/graph.interface';
import { NodesGraphService } from '@data/service/node-graph.service';
import { CreateNodesGraphComponent } from '../create-nodes-graph/create-nodes-graph.component';
import { EditNodesGraphComponent } from '../edit-nodes-graph/edit-nodes-graph.component';

@Component({
  selector: 'app-nodes-graph',
  templateUrl: './nodes-graph.component.html',
  styleUrls: ['./nodes-graph.component.scss']
})
export class NodesGraphComponent implements OnInit {

  public displayedColumns: Array<string> = ['node_source', 'node_target', 'description', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;
  public graph: Graph;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private service: NodesGraphService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    if (this.service.graph === undefined) {
      this.route.navigate(['/graphs']);
    }
    this.graph = this.service.graph;
    this.getEdges();
  }

  getEdges() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}nodeGraph/${this.graph._id}`).subscribe(
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
    const dialog = this.dialog.open(CreateNodesGraphComponent, dialogConfig);
    dialog.afterClosed().subscribe(result => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data !== undefined ? this.dataSource.data : [];
        data.splice(0, 0, result);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openEdit(nodeG: NodesGraph) {
    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = nodeG;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    const dialog = this.dialog.open(EditNodesGraphComponent, dialogConfig);
    dialog.afterClosed().subscribe( (result: NodesGraph) => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data;
        data.forEach( (gra: NodesGraph) => {
          if (gra._id === result._id) {
            gra.node_target = result.node_target;
            gra.description = result.description;
          }
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id: string) {
    this.service.delete(`${this.api}nodeGraph`, id).subscribe(
      _ => {
        this.toast.success('Relación eliminada correctamente', 'Éxito');
        const data = this.dataSource.data.filter( (x: NodesGraph) => x._id !== id);
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
