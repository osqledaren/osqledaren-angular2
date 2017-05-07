import {NgModule} from "@angular/core";
import {LoaderComponent} from "./loader/loader.component";
import {LoaderService} from "./loader.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        LoaderComponent,
    ],
    providers: [
        LoaderService
    ],
    exports: [
        LoaderComponent
    ]
})
export class LoaderModule {
}
