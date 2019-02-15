import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from "rxjs/Observable";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class ServiceBase{

    // protected UrlService: string = "http://localhost:3000/";

    // protected getHeadersJson() {
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     let options = { headers: headers };
    //     return options;
    // }

    // protected extractData(response: any) {
    //     let body = response.json();
    //     return body.data || {};
    // }

    protected serviceError(error: Response | any) {
        let errMsg: string;

        console.error("serviceError: " + error);

        if (error instanceof Response) {
            const body = error.json() || '';
            console.error("body: " + body);
            const err = body || JSON.stringify(body);
            console.error("err: " + err);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            console.error("errMsg: " + errMsg);
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(error);
        return Observable.throw(error);
    }
}