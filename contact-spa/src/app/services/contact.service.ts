import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Rx";

import { Contact } from "../contacts/models/contact";

@Injectable()
export class ContactService {
    private url: string = "http://localhost:3000/contacts";

    public token: string;

    constructor(
        private http: HttpClient
    ) { }

    private getHeadersJson() {
        this.token = localStorage.getItem('user.token');
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
        let options = { headers: headers };
        return options;
    }

    list() {
        let res = this.http.get<Contact[]>(this.url, this.getHeadersJson());
        return res;
    }

    get(id: string): Observable<Contact> {
        let res = this.http.get<Contact>(this.url + '/' + id, this.getHeadersJson());
        return res;
    }

    insert(contact: Contact): Observable<Contact> {
        let res = this.http.post<Contact>(this.url, contact, this.getHeadersJson());
        return res;
    }

    update(contact: Contact): Observable<Contact> {
        let res = this.http.patch<Contact>(this.url + '/' + contact._id, contact, this.getHeadersJson());
        return res;
    }

    delete(id: string) {
        return this.http.delete(this.url + '/' + id, this.getHeadersJson());
    }
}