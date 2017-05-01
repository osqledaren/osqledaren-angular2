import {APP_CONFIG, APP_DI_CONFIG} from "./app.config";
// Modules
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MasonryModule} from "angular2-masonry/src/module";
import {CollapseModule} from "ng2-bootstrap/collapse";
import {DisqusModule} from "ng2-awesome-disqus";
import {Angulartics2Module, Angulartics2GoogleAnalytics} from "angulartics2";
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// Components
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SearchComponent} from "./search-widget/search-widget.component";
import {ArticleComponent} from "./article/article.component";
import {NewsArchiveComponent} from "./news-archive/news-archive.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ArticleGridComponent} from "./article-grid/article-grid.component";
import {ArticleGridItemComponent} from "./article-grid-item/article-grid-item.component";
import {AboutComponent} from "./about/about.component";
import {PrintedIssuesComponent} from "./printed-issues/printed-issues.component";
import {PrintedIssuesGridComponent} from "./printed-issues-grid/printed-issues-grid.component";
import {ArchiveComponent} from "./archive-widget/archive-widget.component";
import {AdvertisementPageComponent} from "./advertisement-page/advertisement-page.component";
import {LoaderComponent} from "./loader/loader.component";
import {BylineComponent} from "./byline/byline.component";
import {ArticleImageComponent} from "./article-image/article-image.component";
import {AdvertisementTopBannerComponent} from "./advertisement-top-banner/advertisement-top-banner.component";
import {ComingSoonComponent} from "./coming-soon/coming-soon.component";
import {ArticleImageThumbnailComponent} from "./article-image-thumbnail/article-image-thumbnail.component";
import {ErrorComponent} from './error/error.component';
import {PlayGridComponent} from './play-grid/play-grid.component';
import {PlayComponent} from './play/play.component';
import {EpisodeGridItemComponent} from './episode-grid-item/episode-grid-item.component';
import {MediaPlayerComponent} from './media-player/media-player.component';
import {MediaQueueSidebarComponent} from './media-queue-sidebar/media-queue-sidebar.component';
import {MediaQueueWidgetComponent} from "./media-queue-widget/media-queue-widget.component";
// Services
import {WordpressService} from "./wordpress.service";
import {NewsArticleService} from "./news-article.service";
import {LoaderService} from "./loader.service";
import {ArchiveService} from "./archive.service";
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {PlayService} from "./play.service";
import {MediaQueueService} from "./media-queue.service";
// Pipes
import {PadNumberPipe} from "./pad-number.pipe";
import {SplitPipe} from "./split.pipe";
// Guards
import {LoadableDeactivateGuard} from "./shared/guard/loadable-deactivate.guard";


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
        AboutComponent,
        PrintedIssuesComponent,
        PrintedIssuesGridComponent,
        ArchiveComponent,
        AdvertisementPageComponent,
        PadNumberPipe,
        SplitPipe,
        LoaderComponent,
        BylineComponent,
        PlayGridComponent,
        ComingSoonComponent,
        ArticleImageComponent,
        AdvertisementTopBannerComponent,
        ArticleImageThumbnailComponent,
        ErrorComponent,
        PlayComponent,
        EpisodeGridItemComponent,
        MediaPlayerComponent,
        MediaQueueWidgetComponent,
        MediaQueueSidebarComponent
    ],
    imports: [
        CollapseModule.forRoot(),
        DisqusModule,
        MasonryModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        RouterModule.forRoot([

            {
                path: 'artikel/:slug',
                component: ArticleComponent,
                data: {name: 'article'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'error',
                component: ErrorComponent,
                data: {name: 'error'},
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
                path: 'om-oss',
                component: AboutComponent,
                data: {name: 'about'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'sok-redaktionen',
                component: ComingSoonComponent,
                data: {name: 'coming-soon'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'tidningen',
                component: PrintedIssuesComponent,
                data: {name: 'printed-issues'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'annonsera',
                component: AdvertisementPageComponent,
                data: {name: 'advertise'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'play',
                component: PlayComponent,
                data: {name: 'play'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'pods',
                component: ComingSoonComponent,
                data: {name: 'coming-soon'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: '',
                component: NewsArchiveComponent,
                data: {name: 'home'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: {name: '404'},
                canDeactivate: [LoadableDeactivateGuard]
            }
        ])
    ],
    providers: [
        CookieService,
        ArchiveService,
        LoaderService,
        NewsArticleService,
        WordpressService,
        LoadableDeactivateGuard,
        PlayService,
        MediaQueueService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
