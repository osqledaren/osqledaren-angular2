import {NgModule} from '@angular/core';
import {EpisodeGridItemComponent} from './episode-grid-item/episode-grid-item.component';
import {MediaPlayerComponent} from './media-player/media-player.component';
import {MediaPlaylistSidebarComponent} from './media-playlist-sidebar/media-playlist-sidebar.component';
import {MediaPlaylistWidgetComponent} from './media-playlist-widget/media-playlist-widget.component';
import {EpisodeGridComponent} from './episode-grid/episode-grid.component';
import {PlayComponent} from './play/play.component';
import {PlayService} from './play.service';
import {MediaPlayerService} from './media-player.service';
import {MediaPlaylistService} from './media-playlist.service';
import {ContentModule} from '../content/content.module';
import {HttpModule} from '@angular/http';
import {UIModule} from '../ui/ui.module';
import {VgCoreModule} from 'videogular2/src/core/core';
import {VgControlsModule} from 'videogular2/src/controls/controls';
import {VgOverlayPlayModule} from 'videogular2/src/overlay-play/overlay-play';
import {VgBufferingModule} from 'videogular2/src/buffering/buffering';
import {BroadcastMenuComponent} from './broadcast-menu/broadcast-menu.component';
import {BroadcastLoaderComponent} from './broadcast-loader/broadcast-loader.component';
import {BroadcastLoaderService} from './broadcast-loader.service';
import {SeriesComponent} from './series/series.component';
import {SingleSeriesComponent} from './single-series/single-series.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {PodcastComponent} from './podcast/podcast.component';

@NgModule({
  imports: [
    CommonModule,
    ContentModule,
    HttpModule,
    UIModule,
    NgMasonryGridModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    BroadcastLoaderComponent,
    BroadcastMenuComponent,
    EpisodeGridItemComponent,
    EpisodeGridComponent,
    MediaPlayerComponent,
    MediaPlaylistWidgetComponent,
    MediaPlaylistSidebarComponent,
    PlayComponent,
    SeriesComponent,
    SingleSeriesComponent,
    PodcastComponent
  ],
  providers: [
    BroadcastLoaderService,
    PlayService,
    MediaPlayerService,
    MediaPlaylistService
  ],
  exports: [
    BroadcastLoaderComponent,
    BroadcastMenuComponent,
    EpisodeGridItemComponent,
    EpisodeGridComponent,
    MediaPlayerComponent,
    MediaPlaylistWidgetComponent,
    MediaPlaylistSidebarComponent,
    PlayComponent,
    PodcastComponent
  ]
})

export class BroadcastModule {
}
