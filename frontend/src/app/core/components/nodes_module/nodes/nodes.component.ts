import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

import { CreateNodeComponent } from '../create-node/create-node.component';
import { Node } from '@data/schema/node.interface';
import { NodeService } from '@data/service/node.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit {

  public displayedColumns: Array<string> = ['name', 'description', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: NodeService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}node`).subscribe(
      response => {
        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response);
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
    const dialog = this.dialog.open(CreateNodeComponent, dialogConfig);
    dialog.afterClosed().subscribe(result => {
      if (!result && result !== undefined) {
        const data = this.dataSource.data;
        data.push(result);
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }

  openEdit(node: Node) {

  }

  downloadFile() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
