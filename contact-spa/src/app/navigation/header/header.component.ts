import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.userService.logout();
  }

  userAuth(): boolean {
    this.token = localStorage.getItem('user.token');
    if (!this.token) {
      return false;
    }

    return true;
  }
}
