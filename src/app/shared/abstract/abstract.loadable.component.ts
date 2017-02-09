import {LoaderService} from "../../loader.service";
import {Injectable} from "@angular/core";
import {GUID} from "../class/guid.class";

@Injectable()
export abstract class LoadableComponent {

    private loaderHandle:string;

    constructor(private loaderService: LoaderService){
        this.loaderHandle = new GUID().toString();
        this.loaderService.add(this.loaderHandle);
    }

    protected loaded(){
        this.loaderService.remove(this.loaderHandle);
    }
}