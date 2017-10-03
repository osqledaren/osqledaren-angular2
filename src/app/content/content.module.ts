import {NgModule} from "@angular/core";
import {ImageComponent} from "./image/image.component";
import {ImageThumbnailComponent} from "./image-thumbnail/image-thumbnail.component";
import {WordpressService} from "./wordpress.service";
import {BylineComponent} from "./byline/byline.component";
import {LoaderModule} from "../loader/loader.module";
import {HttpModule} from "@angular/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        LoaderModule,
        HttpModule,
        SharedModule,
    ],
    declarations: [
        BylineComponent,
        ImageComponent,
        ImageThumbnailComponent,
    ],
    providers: [
        WordpressService
    ],
    exports: [
        BylineComponent,
        ImageComponent,
        ImageThumbnailComponent
    ]
})
export class ContentModule {
}
