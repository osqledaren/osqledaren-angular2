import {OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {UILoaderService} from './abstract.ui-loader.service';

export abstract class UILoaderComponent implements OnInit, OnDestroy {

  public loaded = false;
  public hidden = false;
  public initialized = false;
  private timer;
  private sub: Subscription;

  constructor(private loaderService: UILoaderService) {
  }

  ngOnInit() {

    this.sub = this.loaderService.loaded.subscribe(
      (loaded) => {
        this.loaded = loaded;
        this.hidden = false;

        if (loaded) {
          this.timer = Observable.timer(300);
          this.timer.subscribe(() => {

            this.loadComplete();
            this.hidden = loaded;

            if (!this.initialized) {

              // Delay removal of initialization state a short while.
              Observable.timer(300).subscribe(
                () => {
                  this.initialized = true;
                }
              );

            }

          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.destroy();
  }

  protected loadComplete(): void {
  };

  protected destroy(): void {
  };
}
