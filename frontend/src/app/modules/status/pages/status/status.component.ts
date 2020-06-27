import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { environment } from '@env/environment';
import { StatusService } from '@data/service/status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Process } from '@data/schema/process.interface';
import { Status } from '@data/schema/element.interface';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

public displayedColumns: Array<string> = ['name', 'description', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private service: StatusService,
    private toast: ToastrService,
    private dialog: MatDialog,
        private router: Router,
        private activatedroute: ActivatedRoute,

    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.getStatus();
  }

 
  getStatus() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}status`).subscribe(
      response => {

        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response.reverse());
          this.dataSource.paginator = this.paginator;
        }
      this.showSpinner = false;

      },
      _ => {
        this.showSpinner = false;
      }
    );
  }
  Create() {
      this.router.navigateByUrl('status/add');

   
  }
  Edit(id):void {
    this.service.ID = id;
    // console.log(  this.requirementService.IPreqI );

    this.router.navigate(['/status/edit'], { relativeTo: this.activatedroute });
  }


  delete(id: number) {
    this.service.delete(`${this.api}status`, id).subscribe(
      _ => {
        this.toast.success('Estado eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter( (x: Status) => x.id !== id);
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

