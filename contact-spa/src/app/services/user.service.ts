import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { Observable } from "rxjs/Rx";
// import { Subject } from 'rxjs/Subject';
import "rxjs/add/observable/throw";

import { Login } from "../auth/models/login";
import { User } from "../auth/models/user";
import { ServiceBase } from "../services/service.base";

@Injectable()
export class UserService extends ServiceBase {
    private url: string = "http://localhost:3000/users";
    private token: string;

    // authChange = new Subject<boolean>();

    // private isAuthenticated = false;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        super();
    }

    private getHeadersJson() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        return options;
    }

    insert(login: Login): Observable<Login> {
        let res = this.http.post<Login>(this.url, login, this.getHeadersJson())
        return res;
    }

    authenticate(login: Login): Observable<User> {
        return this.http.post<User>(this.url + "/authenticate/", login, this.getHeadersJson())
            .catch(super.serviceError);
    }

    logout() {
        localStorage.removeItem('user.email');
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.token');

        // this.authChange.next(false);
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
    }

    // isAuth() {
    //     // console.log('this.isAuthenticated: ' + this.isAuthenticated);
    //     // console.log('localStorage.getItem(user.token): ' + localStorage.getItem('user.token'));
    //     // return this.isAuthenticated || localStorage.getItem('user.token');

    //     console.log('USER.SERVICE: this.isAuthenticated: ' + this.isAuthenticated);
    //     console.log('USER.SERVICE: localStorage.getItem(user.token): ' + localStorage.getItem('user.token'));
    //     // return this.isAuthenticated || localStorage.getItem('user.token');
    //     return this.isAuthenticated;
    // }

    // public authSuccessfully() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/']);
    // }

    // public isAuth() {
    //     this.token = localStorage.getItem('user.token');
    //     if (this.token)
    //         return true;
    //     else
    //         return false;
    // }
}