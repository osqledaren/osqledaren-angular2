import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {GUID} from '../shared/guid.class';
import {Subscription} from 'rxjs/Subscription';
import {LoaderService} from './abstract.loader.service';

@Injectable()
export abstract class LoadableComponent implements OnInit, OnDestroy {

  protected sub: Subscription = new Subscription;
  private loaderHandle: GUID = new GUID();

  constructor(protected loaderService: LoaderService) {
    this.loaderService.add(this.loaderHandle);
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
    this.loaderService.remove(this.loaderHandle);
    this.sub.unsubscribe();
  }

  protected init(): void {
  };

  protected destroy(): void {
  };

  /**
   * Removes component from load queue. Loading has been resolved in component.
   */
  protected loaded() {
    this.loaderService.loadComplete();
    this.loaderService.remove(this.loaderHandle);
  }

}
