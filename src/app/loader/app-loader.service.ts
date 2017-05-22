import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs/Rx";
import Set from "typescript-collections/dist/lib/Set";
import {GUID} from "../shared/guid.class";
import {LoaderService} from "./abstract.loader.service";

@Injectable()
export class AppLoaderService extends LoaderService {}
