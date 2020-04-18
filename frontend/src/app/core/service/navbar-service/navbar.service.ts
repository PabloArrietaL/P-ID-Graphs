import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public isSidebarPinned = false;
  public isSidebarToggeled = false;

  constructor() { }

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }
  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }
  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    };
  }
}
