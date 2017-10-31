import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EpisodeGridItemComponent} from './episode-grid-item/episode-grid-item.component';
import {MasonryModule} from 'angular2-masonry/src/module';
import {MediaPlayerComponent} from './media-player/media-player.component';
import {MediaPlaylistSidebarComponent} from './media-playlist-sidebar/media-playlist-sidebar.component';
import {MediaPlaylistWidgetComponent} from './media-playlist-widget/media-playlist-widget.component';
import {EpisodeGridComponent} from './episode-grid/episode-grid.component';
import {PlayComponent} from './play/play.component';
import {PlayService} from './play.service';
import {MediaPlayerService} from './media-player.service';
import {MediaPlaylistService} from './media-playlist.service';
import {AppLoadableDeactivateGuard} from '../loader/app-loadable-deactivate.guard';
import {ContentModule} from '../content/content.module';
import {SharedModule} from '../shared/shared.module';
import {HttpModule} from '@angular/http';
import {LoaderModule} from '../loader/loader.module';
import {VgCoreModule} from 'videogular2/src/core/core';
import {VgControlsModule} from 'videogular2/src/controls/controls';
import {VgOverlayPlayModule} from 'videogular2/src/overlay-play/overlay-play';
import {VgBufferingModule} from 'videogular2/src/buffering/buffering';
import {BroadcastMenuComponent} from './broadcast-menu/broadcast-menu.component';
import {BroadcastLoaderComponent} from './broadcast-loader/broadcast-loader.component';
import {BroadcastLoaderService} from './broadcast-loader.service';
import {SeriesComponent} from './series/series.component';
import {SingleSeriesComponent} from './single-series/single-series.component';

@NgModule({
  imports: [
    ContentModule,
    HttpModule,
    LoaderModule,
    MasonryModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'play',
        component: PlayComponent,
        data: {name: 'play'},
        canDeactivate: [AppLoadableDeactivateGuard],
        children: [
          {
            path: 'senaste-nytt',
            component: EpisodeGridComponent,
            data: {name: 'Senaste Nytt'},
          },
          {
            path: 'serier',
            component: SeriesComponent,
            data: {name: 'Serier'},
            children: [
              {
                path: ':series',
                component: SingleSeriesComponent,
                data: {name: 'Serie'},
              }
            ]
          },
          {
            path: '',
            component: EpisodeGridComponent,
            data: {name: 'Senaste Nytt'},
          }
        ]
      },
    ]),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
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
    PlayComponent
  ]
})

export class BroadcastModule {
}
