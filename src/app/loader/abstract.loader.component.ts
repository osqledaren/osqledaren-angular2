import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {LoaderService} from "./abstract.loader.service";

export abstract class LoaderComponent implements OnInit, OnDestroy {

    public loaded: boolean = false;
    public hidden: boolean = false;
    public initialized: boolean = false;
    private timer;
    private sub: Subscription;

    constructor(private loaderService: LoaderService) {}

    protected loadComplete(): void {};
    protected destroy(): void {};

    ngOnInit() {

        this.sub = this.loaderService.loaded.subscribe(
            (loaded) => {
                this.loaded = loaded;
                this.hidden = false;

                if(loaded) {
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
}
