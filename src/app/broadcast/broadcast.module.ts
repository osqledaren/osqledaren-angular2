import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EpisodeGridItemComponent} from "./episode-grid-item/episode-grid-item.component";
import {MasonryModule} from "angular2-masonry/src/module";
import {MediaPlayerComponent} from "./media-player/media-player.component";
import {MediaQueueSidebarComponent} from "./media-queue-sidebar/media-queue-sidebar.component";
import {MediaQueueWidgetComponent} from "./media-queue-widget/media-queue-widget.component";
import {PlayGridComponent} from "./play-grid/play-grid.component";
import {PlayComponent} from "./play/play.component";
import {PlayService} from "./play.service";
import {MediaPlayerService} from "./media-player.service";
import {MediaQueueService} from "./media-queue.service";
import {LoadableDeactivateGuard} from "../loader/loadable-deactivate.guard";
import {ContentModule} from "../content/content.module";
import {SharedModule} from "../shared/shared.module";
import {LoaderModule} from "../loader/loader.module";
import {VgCoreModule} from "videogular2/src/core/core";
import {VgControlsModule} from "videogular2/src/controls/controls";
import {VgOverlayPlayModule} from "videogular2/src/overlay-play/overlay-play";
import {VgBufferingModule} from "videogular2/src/buffering/buffering";

@NgModule({
    imports: [
        ContentModule,
        LoaderModule,
        MasonryModule,
        SharedModule,
        RouterModule.forRoot([
            {
                path: 'play',
                component: PlayComponent,
                data: {name: 'play'},
                canDeactivate: [LoadableDeactivateGuard]
            },
        ]),
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
    ],
    declarations: [
        EpisodeGridItemComponent,
        MediaPlayerComponent,
        MediaQueueWidgetComponent,
        MediaQueueSidebarComponent,
        PlayComponent,
        PlayGridComponent
    ],
    providers: [
        PlayService,
        MediaPlayerService,
        MediaQueueService
    ],
    exports: [
        EpisodeGridItemComponent,
        MediaPlayerComponent,
        MediaQueueWidgetComponent,
        MediaQueueSidebarComponent,
        PlayComponent,
        PlayGridComponent
    ]
})

export class BroadcastModule {
}
