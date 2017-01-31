import {APP_CONFIG, APP_DI_CONFIG} from './app.config';

// Modules
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MasonryModule} from 'angular2-masonry/src/module';
import {CollapseModule} from 'ng2-bootstrap/collapse';

// Components
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SearchComponent} from "./search/search.component";
import {ArticleComponent} from "./article/article.component";
import {NewsArchiveComponent} from "./news-archive/news-archive.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ArticleGridComponent} from "./article-grid/article-grid.component";
import {ArticleGridItemComponent} from "./article-grid-item/article-grid-item.component";

// Services
import {WordpressService} from "./wordpress.service";
import {NewsArticleService} from "./news-article.service";
import {NavigationService} from "./navigation.service";
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        ArticleComponent,
        NewsArchiveComponent,
        PageNotFoundComponent,
        ArticleGridComponent,
        ArticleGridItemComponent,
        AboutComponent
    ],
    imports: [
        CollapseModule.forRoot(),
        MasonryModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'article/:slug',
                component: ArticleComponent,
                data: {name: 'article'}
            },
            {
                path: 'articles',
                component: NewsArchiveComponent,
                data: {name: 'news-archive'}
            },
            {
                path: 'articles/search/:searchTerm',
                component: NewsArchiveComponent,
                data: {name: 'news-archive'}
            },
            {
                path: 'articles/archive/:year/:month/:searchTerm',
                component: NewsArchiveComponent,
                data: {name: 'news-archive'}
            },
            {
                path: 'articles/archive/:year/:month',
                component: NewsArchiveComponent,
                data: {name: 'news-archive'}
            },
            {
                path: 'about',
                component: AboutComponent,
                data: {name: 'about'}
            },
            {
                path: '',
                component: NewsArchiveComponent,
                data: {name: 'home'}
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: {name: '404'}
            }
        ])
    ],
    providers: [
        NavigationService,
        NewsArticleService,
        WordpressService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
