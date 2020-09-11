import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '@data/service/process.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  public showSpinner: boolean;
  public Name = true;

  constructor(
    public serviceProcess: ProcessService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.serviceProcess.IDP === undefined) {
      this.Name = false;
      this.goBack();
    }
  }

  goBack() {
    this.router.navigateByUrl('/process', { relativeTo: this.activatedroute });
  }

}
