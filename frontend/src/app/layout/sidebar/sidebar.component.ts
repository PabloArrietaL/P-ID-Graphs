import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@app/service/navbar-service/navbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  public background: string;
  public sidebarShowIcon = true;
  public isCollapsed = true;
  public showIcon = true;

  constructor(private appService: NavbarService) { }

  ngOnInit(): void {
    this.background = '';
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
    if (this.showIcon) {
      this.showIcon = false;
    } else {
      this.showIcon = true;
    }
    document.getElementById('icon-sidebar').classList.toggle('icono-activo');
  }

  toggleSidebar() {
    this.appService.toggleSidebar();
  }
  desplegarMenu() {
    document.getElementById('submenu-inicio').classList.toggle('sub-activado');
  }

}
