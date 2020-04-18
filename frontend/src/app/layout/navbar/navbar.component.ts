import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@app/service/navbar-service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public background: string;
  public sidebarShowIcon = true;
  public isCollapsed = true;

  constructor(
    private appService: NavbarService
    ) { }

  ngOnInit(): void {
    this.background = '#002e82';
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
