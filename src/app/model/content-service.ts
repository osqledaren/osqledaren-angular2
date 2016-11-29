import {Response, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {APP_CONFIG} from "../app.config";
import {Inject, Injectable} from "@angular/core";
import {Article} from "./article";

@Injectable()
export abstract class ContentService{

    protected endpoint;

    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = '${error.status} - ${error.statusText || ""} ${err}';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}