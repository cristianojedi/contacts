import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// import { Subscription } from 'rxjs/Subscription';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  // isAuth = false;
  // authSubscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.authSubscription = this.userService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });

    // this.isAuth = this.userService.isAuth();
  }

  // onClose() {
  //   this.closeSidenav.emit();
  // }

  onLogout() {
    this.userService.logout();
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
