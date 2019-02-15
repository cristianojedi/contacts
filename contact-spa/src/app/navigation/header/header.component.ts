import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// import { Subscription } from 'rxjs/Subscription';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() sidenavToggle = new EventEmitter<void>();

  // isAuth = false;
  // authSubscription: Subscription;

  public token;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    // this.isAuth = this.userService.isAuth();
    // console.log('this.isAuth: ' + this.isAuth);

    // console.log("this.userService.authChange: " + this.userService.authChange);

    // this.authSubscription = this.userService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });

    // console.log("this.authSubscription: " + this.authSubscription);
    // console.log("this.isAuth: " + this.isAuth);

    // this.isAuth = this.userService.isAuth();
  }

  // onToggleSidenav() {
  //   this.sidenavToggle.emit();
  // }

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

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
