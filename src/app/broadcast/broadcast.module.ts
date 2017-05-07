import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EpisodeGridItemComponent} from "./episode-grid-item/episode-grid-item.component";
import {MediaPlayerComponent} from "./media-player/media-player.component";
import {MediaQueueSidebarComponent} from "./media-queue-sidebar/media-queue-sidebar.component";
import {MediaQueueWidgetComponent} from "./media-queue-widget/media-queue-widget.component";
import {PlayGridComponent} from "./play-grid/play-grid.component";
import {PlayComponent} from "./play/play.component";
import {PlayService} from "./play.service";
import {MediaPlayerService} from "./media-player.service";
import {MediaQueueService} from "./media-queue.service";
import {LoadableDeactivateGuard} from "../shared/guard/loadable-deactivate.guard";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([
            {
                path: 'play',
                component: PlayComponent,
                data: {name: 'play'},
                canDeactivate: [LoadableDeactivateGuard]
            },
        ])
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
    ]
 })

export class BroadcastModule {
}
