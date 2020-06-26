import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Relation, Process } from '@data/schema/process.interface';
import { RelationService } from '@data/service/relation.service';
import { CreateRelationComponent } from '../create-relation/create-relation.component';
import { EditRelationComponent } from '../edit-relation/edit-relation.component';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss']
})
export class RelationsComponent implements OnInit {

  public displayedColumns: Array<string> = ['element_source', 'element_target', 'description', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;
  public graph: Process;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private service: RelationService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    if (this.service.process === undefined) {
      this.route.navigate(['/graphs']);
    }
    this.graph = this.service.process;
    this.getEdges();
  }

  getEdges() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}nodeGraph/${this.graph.id}`).subscribe(
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
    const dialog = this.dialog.open(CreateRelationComponent, dialogConfig);
    dialog.afterClosed().subscribe(result => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data !== undefined ? this.dataSource.data : [];
        data.splice(0, 0, result);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openEdit(relation: Relation) {
    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = relation;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    const dialog = this.dialog.open(EditRelationComponent, dialogConfig);
    dialog.afterClosed().subscribe( (result: Relation) => {
      if (typeof result === 'object' && result !== undefined) {
        const data = this.dataSource.data;
        data.forEach( (gra: Relation) => {
          if (gra.id === result.id) {
            gra.element_target = result.element_target;
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
        const data = this.dataSource.data.filter( (x: Relation) => x.id !== id);
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
