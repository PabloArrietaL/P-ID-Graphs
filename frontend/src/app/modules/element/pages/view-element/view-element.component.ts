import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Element } from '@data/schema/element.interface';
import { environment } from '@env/environment';
import { ElementService } from '@data/service/element.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.scss']
})
export class ViewElementComponent implements OnInit {

  public api = environment.api;

  constructor(
           private router: Router,
        private activatedroute: ActivatedRoute,
        public service: ElementService,

    // public dialogRef: MatDialogRef<ViewElementComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Eleme
    ) { }

  ngOnInit(): void {
      if (this.service.ID === undefined) {
      this.goBack();
      
    }
  }
public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
}
