// Vendor Modules
import {BrowserModule} from '@angular/platform-browser';
import {DisqusModule} from 'ngx-disqus';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Angulartics2Module, Angulartics2GoogleAnalytics} from 'angulartics2';

// Modules
import {AdvertisementModule} from './advertisement/advertisement.module';
import {ArchiveModule} from './archive/archive.module';
import {BroadcastModule} from './broadcast/broadcast.module';
import {ContentModule} from './content/content.module';
import {LoaderModule} from './loader/loader.module';
import {PrintedIssuesModule} from './printed-issues/printed-issues.module';
import {PostModule} from './post/post.module';

// Components
import {AboutComponent} from './about/about.component';
import {AppComponent} from './app.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ErrorComponent} from './error/error.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// Services
import {ArchiveService} from './archive/archive.service';
import {AboutService} from './about/about.service';
import {CookieModule} from 'ngx-cookie';
import {AppLoaderService} from './loader/app-loader.service';
import {NewsArticleService} from './post/news-article.service';
import {FooterService} from './footer/footer.service';
import {WordpressService} from './content/wordpress.service';

// Guards
import {AppLoadableDeactivateGuard} from './loader/app-loadable-deactivate.guard';

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
    BrowserModule,
    DisqusModule.forRoot('osqledaren'),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    CookieModule.forRoot(),
    PostModule,
    RouterModule.forRoot([
      {
        path: 'error',
        component: ErrorComponent,
        data: {name: 'error'},
        canDeactivate: [AppLoadableDeactivateGuard]
      },
      {
        path: 'om-oss',
        component: AboutComponent,
        data: {name: 'about'},
        canDeactivate: [AppLoadableDeactivateGuard]
      },
      {
        path: 'sok-redaktionen',
        component: ComingSoonComponent,
        data: {name: 'coming-soon'},
        canDeactivate: [AppLoadableDeactivateGuard]
      },
      {
        path: 'pods',
        component: ComingSoonComponent,
        data: {name: 'coming-soon'},
        canDeactivate: [AppLoadableDeactivateGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        data: {name: '404'},
        canDeactivate: [AppLoadableDeactivateGuard]
      }
    ])
  ],
  providers: [
    ArchiveService,
    AboutService,
    NewsArticleService,
    WordpressService,
    AppLoaderService,
    AppLoadableDeactivateGuard,
    FooterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
