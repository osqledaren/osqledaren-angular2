// Vendor Modules
import {BrowserModule} from '@angular/platform-browser';
import {DisqusModule} from 'ngx-disqus';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Angulartics2GoogleAnalytics, Angulartics2Module} from 'angulartics2';
// Modules
import {AdvertisementModule} from './advertisement/advertisement.module';
import {ArchiveModule} from './archive/archive.module';
import {BroadcastModule} from './broadcast/broadcast.module';
import {ContentModule} from './content/content.module';
import {PostModule} from './post/post.module';
// Components
import {AppComponent} from './app.component';
// Services
import {ArchiveService} from './archive/archive.service';
import {CookieModule} from 'ngx-cookie';
import {NewsArticleService} from './post/news-article.service';
import {WordpressService} from './content/wordpress.service';
// Guards
import {AppLoadableDeactivateGuard} from './ui/ui-view-loadable-deactivate.guard';
import {ROUTES} from './app.routes';
import {SiteModule} from './site/site.module';
import {UIModule} from './ui/ui.module';

const FINAL_ROUTES: Routes = [
  {
    path: '',
    canDeactivate: [AppLoadableDeactivateGuard],
    data: {title: 'Loadable routes'},
    children: ROUTES
  }
];

@NgModule({
  declarations: [],
  imports: [
    AdvertisementModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ArchiveModule,
    BroadcastModule,
    BrowserModule,
    CookieModule.forRoot(),
    DisqusModule.forRoot('osqledaren'),
    ContentModule,
    PostModule,
    RouterModule.forRoot(FINAL_ROUTES),
    SiteModule,
    UIModule
  ],
  providers: [
    AppLoadableDeactivateGuard,
    ArchiveService,
    NewsArticleService,
    WordpressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
