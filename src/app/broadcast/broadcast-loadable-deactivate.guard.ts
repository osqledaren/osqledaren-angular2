import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BroadcastLoaderService} from './broadcast-loader.service';
import {UILoadableComponent} from '../ui/abstract.ui-loadable.component';

@Injectable()
export class AppLoadableDeactivateGuard implements CanDeactivate<UILoadableComponent> {

  constructor(private loaderService: BroadcastLoaderService) {
  }

  canDeactivate(component: UILoadableComponent) {
    this.loaderService.add(this.loaderService.reserved.preload);
    return Observable.of(true).delay(400).toPromise();
  }
}
