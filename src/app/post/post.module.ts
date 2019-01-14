import {NgModule} from '@angular/core';
import {ArticleComponent} from './article/article.component';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {ArticleGridItemComponent} from './article-grid-item/article-grid-item.component';
import {AdvertisementModule} from '../advertisement/advertisement.module';
import {NewsArchiveComponent} from './news-archive/news-archive.component';
import {WordpressService} from '../content/wordpress.service';
import {NewsArticleService} from './news-article.service';
import {DisqusModule} from 'ngx-disqus';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgMasonryGridModule} from 'ng-masonry-grid';

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
    ArticleGridComponent,
    ArticleGridItemComponent,
    NewsArchiveComponent
  ],
  providers   : [
    NewsArticleService,
    WordpressService
  ],
  exports     : [
    ArticleComponent,
    ArticleGridComponent,
    ArticleGridItemComponent,
    NewsArchiveComponent
  ]
})
export class PostModule {
}
