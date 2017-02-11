import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";
import {LoadableComponent} from "../abstract/abstract.loadable.component";
import {Observable} from "rxjs";
import {LoaderService} from "../../loader.service";


@Injectable()
export class LoadableDeactivateGuard implements CanDeactivate<LoadableComponent> {

    constructor(private loaderService: LoaderService){}

    canDeactivate(component: LoadableComponent) {

        this.loaderService.add('preload');
        return Observable.of(true).delay(400).toPromise();
    }
}