import {NgModule} from "@angular/core";
import {AppLoaderComponent} from "./app-loader/app-loader.component";
import {AppLoaderService} from "./app-loader.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        AppLoaderComponent,
    ],
    providers: [
        AppLoaderService
    ],
    exports: [
        AppLoaderComponent
    ]
})
export class LoaderModule {
}
