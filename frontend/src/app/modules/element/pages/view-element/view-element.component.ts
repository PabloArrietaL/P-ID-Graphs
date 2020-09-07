import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  public Name = true;
  public Desc = true;
  public IMG = true;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    public service: ElementService
  ) { }

  ngOnInit(): void {
    if (this.service.ID === undefined) {
      this.goBack();
      this.Name = false;
      this.Desc = false;
      this.IMG = false;
    }
    if (this.service.ID.img === null) {
      this.IMG = false;
    }
  }

  public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
}
