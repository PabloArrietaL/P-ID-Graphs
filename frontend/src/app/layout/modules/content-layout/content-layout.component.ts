import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@app/service/navbar-service/navbar.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  public isSidebarPinned = false;
  public isSidebarToggeled = false;

  constructor(private appService: NavbarService) { }

  ngOnInit(): void {
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    };
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
