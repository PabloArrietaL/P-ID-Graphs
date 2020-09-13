import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';
import { ElementService } from '@data/service/element.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  public displayedColumns: Array<string> = [
    'name', 'first_status', 'second_status', 'third_status', 'initial_condition', 'type', 'actions'
  ];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: ElementService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getElements();
  }

  getElements() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}element`).subscribe(
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

  detailsE(id: Element): void {
    this.service.ID = id;
    this.router.navigate(['details'], { relativeTo: this.activatedroute });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedroute });
  }

  openCreate() {
    this.router.navigate(['add'], { relativeTo: this.activatedroute });
  }

  openEdit(id: Element): void {
    this.service.ID = id;
    this.router.navigate(['edit'], { relativeTo: this.activatedroute });
  }

  delete(id: number) {
    this.service.delete(`${this.api}element`, id).subscribe(
      () => {
        this.toast.success('Elemento eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter((x: Element) => x.id !== id);
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
