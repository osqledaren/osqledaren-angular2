import {LoaderService} from "../../loader.service";
import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {GUID} from "../class/guid.class";
import {Subscription} from "rxjs";

@Injectable()
export abstract class LoadableComponent implements OnInit, OnDestroy {

    private loaderHandle:string;
    protected sub: Subscription;

    constructor(private loaderService: LoaderService){
        this.loaderHandle = new GUID().toString();
        this.loaderService.add(this.loaderHandle);
    }

    /**
     * Removes loader
     */
    protected loaded(){
        this.loaderService.remove(this.loaderHandle);
    }

    protected init(): any {};
    protected destroy(): any {};

    ngOnInit(){
        this.init();
    }

    ngOnDestroy(){
        this.destroy();
        this.loaded();
        this.sub.unsubscribe();
    }

}