import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UILoadableComponent} from './abstract.ui-loadable.component';
import {Observable} from 'rxjs/Observable';
import {UIViewLoaderService} from './ui-view-loader.service';

@Injectable()
export class AppLoadableDeactivateGuard implements CanDeactivate<UILoadableComponent> {

  constructor(private loaderService: UIViewLoaderService) {
  }

  canDeactivate(component: UILoadableComponent) {
    this.loaderService.add(this.loaderService.reserved.preload);
    return Observable.of(true).delay(400).toPromise();
  }
}
