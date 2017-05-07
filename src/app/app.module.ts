import {APP_CONFIG, APP_DI_CONFIG} from "./app.config";

// Vendor Modules
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CollapseModule} from "ng2-bootstrap/collapse";
import {Angulartics2Module, Angulartics2GoogleAnalytics} from "angulartics2";
import {BroadcastModule} from "./broadcast/broadcast.module";
import {PostModule} from "./post/post.module";

// Modules
import {AdvertisementModule} from "./advertisement/advertisement.module";
import {ArchiveModule} from "./archive/archive.module";
import {ContentModule} from "./content/content.module";
import {LoaderModule} from "./loader/loader.module";
import {PrintedIssuesModule} from "./printed-issues/printed-issues.module";
import {SharedModule} from "./shared/shared.module";

// Components
import {AboutComponent} from "./about/about.component";
import {AppComponent} from "./app.component";
import {ComingSoonComponent} from "./coming-soon/coming-soon.component";
import {ErrorComponent} from './error/error.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

// Services
import {ArchiveService} from "./archive/archive.service";
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LoaderService} from "./loader/loader.service";
import {NewsArticleService} from "./post/news-article.service";
import {WordpressService} from "./content/wordpress.service";

// Guards
import {LoadableDeactivateGuard} from "./loader/loadable-deactivate.guard";


@NgModule({
    declarations: [
        AboutComponent,
        AppComponent,
        ComingSoonComponent,
        ErrorComponent,
        FooterComponent,
        HeaderComponent,
        PageNotFoundComponent
    ],
    imports: [
        AdvertisementModule,
        ArchiveModule,
        BroadcastModule,
        ContentModule,
        LoaderModule,
        PostModule,
        PrintedIssuesModule,
        SharedModule,
        CollapseModule.forRoot(),
        BrowserModule,
        HttpModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        PostModule,
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
        NewsArticleService,
        WordpressService,
        LoaderService,
        LoadableDeactivateGuard,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
