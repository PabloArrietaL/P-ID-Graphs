import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { environment } from '@env/environment';
import { ProcessDetails } from '@data/schema/process.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { RelationService } from '@data/service/relation.service';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@data/schema/element.interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  public displayedColumns: Array<string> = ['element', 'first_status', 'second_status', 'third_status', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;
  public Name = true;
  myControl = new FormControl();
  filteredOptions: Observable<Element[]>;
  public element: number;
  public listAll: Element[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: Router,
    private service: RelationService,
    public serviceProcess: ProcessService,
    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if (this.serviceProcess.IDP === undefined) {
      this.Name = false;
      this.goBack();
    } else {
      this.getDetail();
      if (this.serviceProcess.IDP.status === 'A') {
        this.myControl.disable();
      }
      this.service.allElement(`${this.api}element`).subscribe(res => {
        this.listAll = res;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this._filter(state) : this.listAll.slice())
          );
      });
    }
  }

  _filter(value: string): Element[] {
    const filterValue = value.toLowerCase();
    return this.listAll.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  AutocompletActivity(id: any): void {
    this.element = id;
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedroute });
  }

  delete(id: string) {
    this.service.delete(`${this.api}process-detail`, id).subscribe(
      () => {
        this.toast.success('Elemento eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter((x: ProcessDetails) => x.id !== id);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }


  createProcessDetail() {
    const url = `${this.api}process-detail`;
    const DETALLE: ProcessDetails = {
      process: this.serviceProcess.IDP.id,
      element: this.element
    };
    this.showSpinner = true;
    this.service.create(url, DETALLE).subscribe(
      () => {
        this.getDetail();
        this.toast.success('Elemento añadido correctamente', 'Éxito');
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.toast.error(error.error.message, 'Error');
      }
    );

  }
  getDetail(): void {
    this.showSpinner = true;
    this.service.getByID(`${this.api}process-detail`, this.serviceProcess.IDP.id).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.reverse());
        this.dataSource.paginator = this.paginator;
        this.showSpinner = false;
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
