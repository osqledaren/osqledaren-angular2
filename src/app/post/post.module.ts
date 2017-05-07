import {NgModule} from "@angular/core";
import {LoadableDeactivateGuard} from "../loader/loadable-deactivate.guard";
import {ArticleComponent} from "./article/article.component";
import {ArticleGridComponent} from "./article-grid/article-grid.component";
import {ArticleGridItemComponent} from "./article-grid-item/article-grid-item.component";
import {NewsArchiveComponent} from "./news-archive/news-archive.component";
import {RouterModule} from "@angular/router";
import {WordpressService} from "../content/wordpress.service";
import {MasonryModule} from "angular2-masonry/src/module";
import {NewsArticleService} from "./news-article.service";
import {DisqusModule} from "ng2-awesome-disqus";
import {ContentModule} from "../content/content.module";
import {LoaderModule} from "../loader/loader.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        ContentModule,
        DisqusModule,
        LoaderModule,
        MasonryModule,
        SharedModule,
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
export class PostModule {}
