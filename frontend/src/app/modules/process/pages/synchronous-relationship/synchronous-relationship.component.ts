import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ProcessModel } from '@data/models/process.model';
import { Element } from '@data/schema/element.interface';
import { SynchronousR } from '@data/schema/process.interface';
import { ElementService } from '@data/service/element.service';
import { ProcessService } from '@data/service/process.service';
import { RelationService } from '@data/service/relation.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

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
  public EventssI = [];
  public EventssF = [];

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: Array<string> = ['initial_controlled', 'end_controlled', 'eventI', 'eventF', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public create = false;
  public api = environment.api;
  constructor(
    private serviceElement: ElementService,
    private service: RelationService,
    public Processservice: ProcessService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getElementsControlled();
    if (this.Processservice.IDP != null) {
      this.getSynchronousR();
    }
  }

  EventsI(controlled: any) {
    this.EventssI = this.serviceElement.proccesElement(controlled);
    return this.EventssI;
  }

  EventsF(controlled: any) {
    this.EventssF = this.serviceElement.proccesElement(controlled);
    return this.EventssF;
  }
  Create() {
    this.create = true;
  }

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
      () => {
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
        end_controlled: form.value.end_controlled.id,
        initial_event: form.value.initial_event,
        end_event: form.value.initial_event,
        process: this.Processservice.IDP.id,
      };
      this.showSpinner = true;
      this.service.createPermissiveR(url, PERMISSIVE).subscribe(
        () => {
          this.toast.success('Relación sincrona creada correctamente', 'Éxito');
          this.Cancel();
          this.getSynchronousR();
          this.showSpinner = false;
        },
        error => {
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
      () => {
        this.toast.success('Relación sincrona eliminada correctamente', 'Éxito');
        const data = this.dataSource.data.filter((x: any) => x.id !== id);
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
