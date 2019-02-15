import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private token: string;

    constructor(
        private userService: UserService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.token = localStorage.getItem('user.token');

        if (!this.token) {
            this.router.navigate(['/login'])
            return false;
        }

        return true;

        // this.token = localStorage.getItem('user.token');

        // if (this.token || this.userService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login'])
        //     return false;
        // }

        // if (this.userService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }

    }
}