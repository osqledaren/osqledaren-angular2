import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ArchiveService} from "./archive.service";
import {ArchiveWidgetComponent} from "./archive-widget/archive-widget.component";
import {SearchWidgetComponent} from "./search-widget/search-widget.component";
import {ContentModule} from "../content/content.module";
import {LoaderModule} from "../loader/loader.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        ContentModule,
        FormsModule,
        LoaderModule,
        SharedModule,
    ],
    declarations: [
        ArchiveWidgetComponent,
        SearchWidgetComponent
    ],
    providers: [
        ArchiveService
    ],
    exports: [
        ArchiveWidgetComponent,
        SearchWidgetComponent
    ]
})
export class ArchiveModule {
}
