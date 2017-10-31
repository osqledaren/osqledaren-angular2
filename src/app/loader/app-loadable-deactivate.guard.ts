import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {LoadableComponent} from './abstract.loadable.component';
import {Observable} from 'rxjs/Observable';
import {AppLoaderService} from './app-loader.service';

@Injectable()
export class AppLoadableDeactivateGuard implements CanDeactivate<LoadableComponent> {

  constructor(private loaderService: AppLoaderService) {
  }

  canDeactivate(component: LoadableComponent) {
    this.loaderService.add(this.loaderService.reserved.preload);
    return Observable.of(true).delay(400).toPromise();
  }
}
