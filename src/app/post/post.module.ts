import {NgModule} from '@angular/core';
import {ArticleComponent} from './article/article.component';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {ArticleGridItemComponent} from './article-grid-item/article-grid-item.component';
import {NewsArchiveComponent} from './news-archive/news-archive.component';
import {WordpressService} from '../content/wordpress.service';
import {MasonryModule} from 'angular2-masonry/src/module';
import {NewsArticleService} from './news-article.service';
import {DisqusModule} from 'ngx-disqus';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    ContentModule,
    DisqusModule,
    UIModule,
    RouterModule,
    MasonryModule,
    SharedModule
  ],
  declarations: [
    ArticleComponent,
    ArticleGridComponent,
    ArticleGridItemComponent,
    NewsArchiveComponent,
  ],
  providers: [
    NewsArticleService,
    WordpressService,
  ],
  exports: [
    ArticleComponent,
    ArticleGridComponent,
    ArticleGridItemComponent,
    NewsArchiveComponent
  ]
})
export class PostModule {
}
