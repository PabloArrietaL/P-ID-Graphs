import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { environment } from '@env/environment';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { Process } from '@data/schema/process.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { RelationService } from '@data/service/relation.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  public displayedColumns: Array<string> = ['name', 'description', 'status', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private details: RelationService,
    private service: ProcessService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProcess();
  }

  openAdd(process: Process) {
    this.details.process = process;
    this.route.navigate(['/graph-details']);
  }

  getProcess() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}process`).subscribe(
      response => {
        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response.reverse());
          this.dataSource.paginator = this.paginator;
        }
        this.showSpinner = false;
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
  Create() {
    this.router.navigateByUrl('process/add');
  }

  Edit(id: Process): void {
    this.service.IDP = id;
    this.router.navigate(['edit'], { relativeTo: this.activatedroute });
  }

  Relations(id: Process): void {
    this.service.IDP = id;
    this.router.navigate(['tabs'], { relativeTo: this.activatedroute });
  }

  View(id: string): void {
    window.open('/view/' + id, '_blank');
  }
  delete(id: number) {
    this.service.delete(`${this.api}process`, id).subscribe(
      () => {
        this.toast.success('Proceso eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter((x: Process) => x.id !== id);
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
