import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Rx";

import { Contact } from "../contacts/models/contact";
import { ServiceBase } from "../services/service.base";

@Injectable()
export class ContactService extends ServiceBase {
    public token: string;

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    private getHeadersJson() {
        this.token = localStorage.getItem('user.token');
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
        let options = { headers: headers };
        return options;
    }

    list() {
        let res = this.http.get<Contact[]>(this.UrlService + "contacts", this.getHeadersJson());
        return res;
    }

    get(id: string): Observable<Contact> {
        let res = this.http.get<Contact>(this.UrlService + 'contacts/' + id, this.getHeadersJson());
        return res;
    }

    insert(contact: Contact): Observable<Contact> {
        let res = this.http.post<Contact>(this.UrlService + "contacts", contact, this.getHeadersJson());
        return res;
    }

    update(contact: Contact): Observable<Contact> {
        let res = this.http.patch<Contact>(this.UrlService + 'contacts/' + contact._id, contact, this.getHeadersJson());
        return res;
    }

    delete(id: string) {
        return this.http.delete(this.UrlService + 'contacts/' + id, this.getHeadersJson());
    }
}