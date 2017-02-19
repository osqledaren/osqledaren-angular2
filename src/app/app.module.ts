import {APP_CONFIG, APP_DI_CONFIG} from "./app.config";
// Modules
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MasonryModule} from "angular2-masonry/src/module";
import {CollapseModule} from "ng2-bootstrap/collapse";
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
import { PlayComponent } from './play/play/play.component';
import { VideoPlayerComponent } from './play/video-player/video-player.component';
import { PlaySingleProgramComponent } from './play/play-single-program/play-single-program.component';
import { PlaySingleEpisodeComponent } from './play/play-single-episode/play-single-episode.component';
// Services
import {WordpressService} from "./wordpress.service";
import {NewsArticleService} from "./news-article.service";
import {NavigationService} from "./navigation.service";
import {LoaderService} from "./loader.service";
import {ArchiveService} from "./archive.service";
// Pipes
import {PadNumberPipe} from "./pad-number.pipe";
import {SplitPipe} from "./split.pipe";
import {LoadableDeactivateGuard} from "./shared/guard/loadable-deactivate.guard";
import { BylineComponent } from './byline/byline.component';
import { TimePipe } from './play/time.pipe';

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
        PlayComponent,
        VideoPlayerComponent,
        PlaySingleProgramComponent,
        PlaySingleEpisodeComponent,
        TimePipe
    ],
    imports: [
        CollapseModule.forRoot(),
        MasonryModule,
        BrowserModule,
        FormsModule,
        HttpModule,
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
                path: 'om-oss',
                component: AboutComponent,
                data: {name: 'about'},
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
                path: 'play/:program',
                component: PlaySingleProgramComponent,
                data: {name: 'play single program'},
                canDeactivate: [LoadableDeactivateGuard]
            },
            {
                path: 'play/:program/:episode',
                component: PlaySingleEpisodeComponent,
                data: {name: 'play single episode'},
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
        ArchiveService,
        LoaderService,
        NavigationService,
        NewsArticleService,
        WordpressService,
        LoadableDeactivateGuard,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
