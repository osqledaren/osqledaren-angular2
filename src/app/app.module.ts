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
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AboutComponent} from "./about/about.component";
import {PrintedIssuesComponent} from "./printed-issues/printed-issues.component";
import {PrintedIssuesGridComponent} from "./printed-issues-grid/printed-issues-grid.component";
import {ArchiveComponent} from "./archive-widget/archive-widget.component";
import {AdvertisementPageComponent} from "./advertisement-page/advertisement-page.component";
import {LoaderComponent} from "./loader/loader.component";
import {BylineComponent} from "./byline/byline.component";
import {AdvertisementTopBannerComponent} from "./advertisement-top-banner/advertisement-top-banner.component";
import {ComingSoonComponent} from "./coming-soon/coming-soon.component";
import {ErrorComponent} from './error/error.component';
// Services
import {LoaderService} from "./loader.service";
import {ArchiveService} from "./archive.service";
import {CookieService} from 'angular2-cookie/services/cookies.service';
// Pipes
import {PadNumberPipe} from "./pad-number.pipe";
import {SplitPipe} from "./split.pipe";
// Guards
import {LoadableDeactivateGuard} from "./shared/guard/loadable-deactivate.guard";
import {BroadcastModule} from "./broadcast/broadcast.module";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        PageNotFoundComponent,
        AboutComponent,
        PrintedIssuesComponent,
        PrintedIssuesGridComponent,
        ArchiveComponent,
        AdvertisementPageComponent,
        PadNumberPipe,
        SplitPipe,
        LoaderComponent,
        BylineComponent,
        ComingSoonComponent,
        AdvertisementTopBannerComponent,
        ErrorComponent
    ],
    imports: [
        CollapseModule.forRoot(),
        DisqusModule,
        MasonryModule,
        BroadcastModule,
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
                path: 'error',
                component: ErrorComponent,
                data: {name: 'error'},
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
                path: 'pods',
                component: ComingSoonComponent,
                data: {name: 'coming-soon'},
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
        LoadableDeactivateGuard,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
