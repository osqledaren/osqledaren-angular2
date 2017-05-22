import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs";
import {BroadcastLoaderService} from "./broadcast-loader.service";
import {LoadableComponent} from "../loader/abstract.loadable.component";

@Injectable()
export class AppLoadableDeactivateGuard implements CanDeactivate<LoadableComponent> {

    constructor(private loaderService: BroadcastLoaderService){}

    canDeactivate(component: LoadableComponent) {
        this.loaderService.add(this.loaderService.reserved.preload);
        return Observable.of(true).delay(400).toPromise();
    }
}