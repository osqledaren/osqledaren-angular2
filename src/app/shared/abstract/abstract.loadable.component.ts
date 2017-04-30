import {LoaderService} from "../../loader.service";
import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {GUID} from "../class/guid.class";
import {Subscription} from "rxjs";

@Injectable()
export abstract class LoadableComponent implements OnInit, OnDestroy {

    private loaderHandle: string;
    protected sub: Subscription;

    constructor(protected loaderService: LoaderService) {
        this.loaderHandle = new GUID().toString();
        this.sub = new Subscription;
        this.loaderService.add(this.loaderHandle);
    }

    protected init(): any {
    };

    protected destroy(): any {
    };

    /**
     * Removes component from load queue. Loading has been resolved in component.
     */
    protected loaded() {
        this.loaderService.remove('init'); // Remove initial load from queue.
        this.loaderService.remove('preload'); // Remove preload handle from queue.
        this.loaderService.remove(this.loaderHandle);
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroy();
        this.loaderService.remove(this.loaderHandle);
        this.sub.unsubscribe();
    }

}