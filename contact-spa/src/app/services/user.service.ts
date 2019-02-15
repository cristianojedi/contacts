import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { Observable } from "rxjs/Rx";

import { Login } from "../auth/models/login";
import { User } from "../auth/models/user";
import { ServiceBase } from "../services/service.base";

@Injectable()
export class UserService extends ServiceBase {
    private token: string;

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
        let res = this.http.post<Login>(this.UrlService + "users", login, this.getHeadersJson())
        return res;
    }

    authenticate(login: Login): Observable<User> {
        return this.http.post<User>(this.UrlService + "users/authenticate/", login, this.getHeadersJson())
            .catch(super.serviceError);
    }

    logout() {
        localStorage.removeItem('user.email');
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.token');

        this.router.navigate(['/login']);
    }

}