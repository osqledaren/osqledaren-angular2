import {NgModule} from "@angular/core";
import {ContentModule} from "../content/content.module";
import {LoaderModule} from "../loader/loader.module";
import {MasonryModule} from "angular2-masonry/src/module";
import {SharedModule} from "../shared/shared.module";
import {PrintedIssuesComponent} from "./printed-issues/printed-issues.component";
import {PrintedIssuesGridComponent} from "./printed-issues-grid/printed-issues-grid.component";
import {RouterModule} from "@angular/router";
import {AppLoadableDeactivateGuard} from "../loader/app-loadable-deactivate.guard";

@NgModule({
    imports: [
        ContentModule,
        LoaderModule,
        MasonryModule,
        SharedModule,
        RouterModule.forRoot([
            {
                path: 'tidningen',
                component: PrintedIssuesComponent,
                data: {name: 'printed-issues'},
                canDeactivate: [AppLoadableDeactivateGuard]
            },
        ])
    ],
    declarations: [
        PrintedIssuesComponent,
        PrintedIssuesGridComponent
    ],
    exports: [
        PrintedIssuesComponent,
        PrintedIssuesGridComponent
    ]
})
export class PrintedIssuesModule {
}
