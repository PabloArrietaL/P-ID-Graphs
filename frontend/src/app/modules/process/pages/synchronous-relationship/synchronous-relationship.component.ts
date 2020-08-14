import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessModel } from '@data/models/process.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { environment } from '@env/environment';
import { ElementService } from '@data/service/element.service';
import { RelationService } from '@data/service/relation.service';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissiveR, SynchronousR } from '@data/schema/process.interface';
import { Element, Status, ElementStatus } from '@data/schema/element.interface';

@Component({
  selector: 'app-synchronous-relationship',
  templateUrl: './synchronous-relationship.component.html',
  styleUrls: ['./synchronous-relationship.component.scss']
})
export class SynchronousRelationshipComponent implements OnInit {
  public deviceInfo = null;
  public showSpinner: boolean;
    public Form: FormGroup = new ProcessModel().SynchronousRelations();


  public controlled: Array<Element> = [];
  public controlled2: Array<Element> = [];
        public statuses: Array<any> = [];

  public dataSource: MatTableDataSource<any>;
public displayedColumns: Array<string> = [ 'initial_controlled', 'end_controlled', 'event', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
public create = false;
  public api = environment.api;
  constructor(
    // public service: ElementService,
    private serviceElement: ElementService,
    private service: RelationService,
    public Processservice: ProcessService,

    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getElementsControlled();
    if (this.Processservice.IDP != null) {
          this.getSynchronousR();

    }
  }

 Create() {
 this.create = true;
 }
  // tslint:disable-next-line: align
  getSynchronousR() {
    this.showSpinner = true;
    this.service.getByID(`${this.api}synchronous`, this.Processservice.IDP.id).subscribe(
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
   Cancel() {
 this.create = false;

  }

    Post(form: FormGroup) {

    const url = `${this.api}synchronous`;

    if (!form.invalid) {
      const PERMISSIVE: SynchronousR = {
         initial_controlled: form.value.initial_controlled.id,
    end_controlled: form.value.end_controlled,
    event: form.value.event,
    process: this.Processservice.IDP.id,
      };

      this.showSpinner = true;
        // tslint:disable-next-line: align
        this.service.createPermissiveR(url, PERMISSIVE).subscribe(
          (response) => {
            this.toast.success('Relación sincrona creada correctamente', 'Éxito');
            this.Cancel();
            this.getSynchronousR();

            this.showSpinner = false;
          },
          (error) => {
            this.showSpinner = false;
            this.toast.error(error.error.message, 'Error');
          }
        );

    }
  }

  filterControlled(controlled: Element) {
    this.controlled2 = this.controlled.filter((x: Element) => x.id !== +controlled.id);

    this.Form.get('end_controlled').enable();
  }

  delete(id: string) {
    this.service.delete(`${this.api}synchronous`, id).subscribe(
      _ => {
        this.toast.success('Relación sincrona eliminada correctamente', 'Éxito');
        const data = this.dataSource.data.filter( (x: any) => x.id !== id);
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


    getElementsControlled() {

       this.serviceElement.getAll(`${this.api}element/type/controlled`).subscribe(
      response => {
        this.controlled = response;

      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }
}
