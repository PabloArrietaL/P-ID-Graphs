import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Relation, Process } from '@data/schema/process.interface';
import { RelationService } from '@data/service/relation.service';
import { CreateRelationComponent } from '../create-relation/create-relation.component';
import { EditRelationComponent } from '../edit-relation/edit-relation.component';
import { ProcessService } from '@data/service/process.service';

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
    private serviceProcess:ProcessService,
    private toast: ToastrService,
    private dialog: MatDialog,
        private router: Router,
        private activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    // if (this.service.process === undefined) {
    //   this.route.navigate(['/graphs']);
    // }
    // this.graph = this.service.process;
    // this.getEdges();

      if (this.serviceProcess.IDP === undefined) {
      this.goBack();
      
    }else{this.getRelation();
    
    }


  }

public goBack() {
    this.router.navigateByUrl('/process', { relativeTo: this.activatedroute });
  }
  // getEdges() {
  //   this.showSpinner = true;
  //   this.service.getAll(`${this.api}nodeGraph/${this.graph.id}`).subscribe(
  //     response => {
  //       if (response.length > 0) {
  //         this.dataSource = new MatTableDataSource(response.reverse());
  //         this.dataSource.paginator = this.paginator;
  //         this.showSpinner = false;
  //       }
  //     },
  //     _ => {
  //       this.showSpinner = false;
  //     }
  //   );
  // }

  openCreate() {
        this.router.navigateByUrl('process/details/add');

  }

  openEdit(id) :void{
    this.service.ID = id;
    // console.log(  this.requirementService.IPreqI );

    this.router.navigate(['/process/details/edit'], { relativeTo: this.activatedroute });
  }


  delete(id: string) {
    this.service.delete(`${this.api}relation`, id).subscribe(
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
  
  getRelation():void {
    this.showSpinner = true;
    this.service.getByID(`${this.api}relation`,this.serviceProcess.IDP.id).subscribe(
      response => {
          this.dataSource = new MatTableDataSource(response.reverse());
          this.dataSource.paginator = this.paginator;
          this.showSpinner = false;
            console.log(this.dataSource.data);

      },
      _ => {
        this.showSpinner = false;
      }
    );
  }
  }
