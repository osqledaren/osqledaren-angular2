import {Component, OnInit, OnDestroy} from "@angular/core";
import {LoaderService} from "../loader.service";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    public loaded: boolean = false;
    public hidden: boolean = false;
    public initialized: boolean = false;
    private timer;
    private sub: Subscription;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {

        this.sub = this.loaderService.loaded.subscribe(
            (loaded) => {
                this.loaded = loaded;
                this.hidden = false;

                if(loaded) {
                    this.timer = Observable.timer(300);
                    this.timer.subscribe(() => {

                        this.hidden = loaded;

                        if (!this.initialized) {

                            // Delay removal of initialization state a short while.
                            Observable.timer(1000).subscribe(
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
    }
}
