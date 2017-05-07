import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoadableDeactivateGuard} from "../shared/guard/loadable-deactivate.guard";

import {ArticleComponent} from "./article/article.component";
import {ArticleImageComponent} from "./article-image/article-image.component";
import {ArticleImageThumbnailComponent} from "./article-image-thumbnail/article-image-thumbnail.component";
import {ArticleGridComponent} from "./article-grid/article-grid.component";
import {ArticleGridItemComponent} from "./article-grid-item/article-grid-item.component";
import {NewsArchiveComponent} from "./news-archive/news-archive.component";
import {RouterModule} from "@angular/router";

import {WordpressService} from "./wordpress.service";
import {NewsArticleService} from "./news-article.service";

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forRoot([
        {
          path: 'artikel/:slug',
          component: ArticleComponent,
          data: {name: 'article'},
          canDeactivate: [LoadableDeactivateGuard]
        },
        {
          path: 'nyheter',
          component: NewsArchiveComponent,
          data: {name: 'articles'},
          canDeactivate: [LoadableDeactivateGuard]
        },
        {
          path: 'nyheter/sok/:searchTerm',
          component: NewsArchiveComponent,
          data: {name: 'search'},
          canDeactivate: [LoadableDeactivateGuard]
        },
        {
          path: 'nyheter/arkiv/:date/:searchTerm',
          component: NewsArchiveComponent,
          data: {name: 'archive'},
          canDeactivate: [LoadableDeactivateGuard]
        },
        {
          path: 'nyheter/arkiv/:date',
          component: NewsArchiveComponent,
          data: {name: 'archive'},
          canDeactivate: [LoadableDeactivateGuard]
        },
        {
          path: '',
          component: NewsArchiveComponent,
          data: {name: 'home'},
          canDeactivate: [LoadableDeactivateGuard]
        },
      ])
  ],
  declarations: [
    ArticleComponent,
    ArticleGridComponent,
    ArticleGridItemComponent,
    ArticleImageComponent,
    ArticleImageThumbnailComponent,
    NewsArchiveComponent,
  ],
  providers: [
    NewsArticleService,
    WordpressService,
  ]
})
export class PostModule { }
