import {NgModule} from '@angular/core';
import {AdvertisementModule} from '../advertisement/advertisement.module';
import {WordpressService} from '../content/wordpress.service';
import {DisqusModule} from 'ngx-disqus';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {ArticleComponent} from '../post/article/article.component';

import {PodcastArchiveComponent} from './podcast-archive/podcast-archive.component';
import {PodcastGridComponent} from './podcast-grid/podcast-grid.component';
import {PodcastGridItemComponent} from './podcast-grid-item/podcast-grid-item.component';
import {PodcastService} from './podcast.service';

@NgModule({
  imports     : [
    ContentModule,
    DisqusModule,
    UIModule,
    RouterModule,
    CommonModule,
    NgMasonryGridModule,
    AdvertisementModule,
  ],
  declarations: [
    ArticleComponent,
    PodcastGridComponent,
    PodcastGridItemComponent,
    PodcastArchiveComponent
  ],
  providers   : [
    PodcastService,
    WordpressService
  ],
  exports     : [
    ArticleComponent,
    PodcastGridComponent,
    PodcastGridItemComponent,
    PodcastArchiveComponent
  ]
})
export class PostModule {
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class PodcastModule { }
