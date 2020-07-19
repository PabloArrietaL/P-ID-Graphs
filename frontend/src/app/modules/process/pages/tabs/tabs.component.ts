import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RelationService } from '@data/service/relation.service';
import { ProcessService } from '@data/service/process.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {


  public showSpinner: boolean;
  // public graph: Process;
  public Name = true;


  constructor(
    private route: Router,
    private service: RelationService,
    public serviceProcess:ProcessService,
    private toast: ToastrService,
    private dialog: MatDialog,
        private router: Router,
        private activatedroute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // if (this.service.process === undefined) {
    //   this.route.navigate(['/graphs']);
    // }
    // this.graph = this.service.process;
    // this.getEdges();

      if (this.serviceProcess.IDP === undefined) {
              this.Name = false;

      this.goBack();

      
    }else{
    }


  
  }
  public goBack() {
    this.router.navigateByUrl('/process', { relativeTo: this.activatedroute });
  }
}