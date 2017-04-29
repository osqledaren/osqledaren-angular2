import {Response, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export abstract class ContentService{

    protected endpoint;
    protected abstract map(res: Response): any;

    protected handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = error.status + ' ' + error.statusText + ' ' + err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(error);
    }
}