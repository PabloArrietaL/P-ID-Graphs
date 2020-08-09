import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementService } from '@data/service/element.service';
import { ElementDetailsService } from '@data/service/element-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Element, Status, ElementStatus } from '@data/schema/element.interface';
import { element } from 'protractor';
import { RelationService } from '@data/service/relation.service';
import { ProcessService } from '@data/service/process.service';
import { ProcessModel } from '@data/models/process.model';
import { FormGroup } from '@angular/forms';
import { PermissiveR } from '@data/schema/process.interface';

@Component({
  selector: 'app-permissive-relationship',
  templateUrl: './permissive-relationship.component.html',
  styleUrls: ['./permissive-relationship.component.scss'],
})
export class PermissiveRelationshipComponent implements OnInit {
  public deviceInfo = null;
  public showSpinner: boolean;
    public Form: FormGroup = new ProcessModel().PermissiveRelations();


  public controlled: Array<Element> = [];
  public actuator: Array<Element> = [];
        public statuses: Array<any> = [];

  public dataSource: MatTableDataSource<any>;
public displayedColumns: Array<string> = [ 'actuator', 'controlled', 'event','status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
public create=false;
  public api = environment.api;
  constructor(
    // public service: ElementService,
    private serviceElement: ElementService,
    private service: RelationService,
    private Processservice: ProcessService,

    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getElementsActuators();
    this.getElementsControlled();
    if (this.Processservice.IDP!= null) {
          this.getPermissiveR();

    }
  }

  Status(id){

    this.statuses= [];
    const RESULT: Array<Element> = this.actuator.filter(
      (element) => element.id === +id.value.id
    );
    this.statuses = RESULT;


  }

 Create() {
 this.create = true;
 }
  // tslint:disable-next-line: align
  getPermissiveR() {
    this.showSpinner = true;
    this.service.getByID(`${this.api}permissive`, this.Processservice.IDP.id).subscribe(
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

    const url = `${this.api}permissive`;

    if (!form.invalid) {
      const PERMISSIVE: PermissiveR = {
         actuator: form.value.actuator.id,
    controlled: form.value.controlled,
    event: form.value.event,
    process: this.Processservice.IDP.id,
    status: form.value.status,
      };

      this.showSpinner = true;
        // tslint:disable-next-line: align
        this.service.createPermissiveR(url, PERMISSIVE).subscribe(
          (response) => {
            this.toast.success('Relación permisiva creada correctamente', 'Éxito');
            this.Cancel();
            this.getPermissiveR();

            this.showSpinner = false;
          },
          (error) => {
            this.showSpinner = false;
            this.toast.error(error.error.message, 'Error');
          }
        );

    }
  }
  delete(id: string) {
    this.service.delete(`${this.api}permissive`, id).subscribe(
      _ => {
        this.toast.success('Relación permisiva eliminada correctamente', 'Éxito');
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

  getElementsActuators() {
     this.serviceElement.getAll(`${this.api}element/type/actuator`).subscribe(
      response => {
        this.actuator = response;
          // tslint:disable-next-line: align
                      // tslint:disable-next-line: align



      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
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
