import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementService } from '@data/service/element.service';
import { ElementDetailsService } from '@data/service/element-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Element } from '@data/schema/element.interface';
import { element } from 'protractor';
import { RelationService } from '@data/service/relation.service';
import { ProcessService } from '@data/service/process.service';

@Component({
  selector: "app-permissive-relationship",
  templateUrl: "./permissive-relationship.component.html",
  styleUrls: ["./permissive-relationship.component.scss"],
})
export class PermissiveRelationshipComponent implements OnInit {
  public deviceInfo = null;
  public showSpinner: boolean;
  public elements: Array<Element> = [];
  public element: Element = {};
  public controlled: Array<Element> = [];
  public actuator: Array<Element> = [];
  public dataSource: MatTableDataSource<any>;
public displayedColumns: Array<string> = [ 'element', 'first_status', 'second_status', 'third_status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    this.getElements();

  }

 Create() {
      this.router.navigateByUrl('process/add-permissive-relationship');


  }
  delete(id: string) {
    this.service.delete(`${this.api}process-detail`, id).subscribe(
      _ => {
        this.toast.success('Elemento eliminado correctamente', 'Éxito');
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

  getElements(): void {
    this.serviceElement.getAll(`${this.api}element`).subscribe(
      (response) => {
                      this.controlled = [];
                      this.actuator = [];
                      response.forEach((item) => {
                        this.element = {
                          id: item.id,
                          name: item.name,
                          description: item.description,
                          first_status: item.first_status,
                          second_status: item.second_status,
                          third_status: item.third_status,
                          initial_condition: item.initial_condition,
                          type: item.type,
                        };

                        // if (this.element.type === "controlled") {
                        //   this.controlled.push(this.element);
                        // } else {
                        //   this.actuator.push(this.element);
                        // }
                      });

                    },
      (error) => {}
    );
  }
}
