import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppLoaderService} from "../app-loader.service";
import {Observable, Subscription} from "rxjs";
import {LoaderComponent} from "../abstract.loader.component";

@Component({
    selector: 'app-loader',
    templateUrl: 'app-loader.component.html',
    styleUrls: ['app-loader.component.scss']
})
export class AppLoaderComponent extends LoaderComponent{

    constructor(loaderService: AppLoaderService) {
        super(loaderService);
    }
}
