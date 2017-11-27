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
import {SiteModule} from './site/site.module';
import {UIModule} from './ui/ui.module';
// Components
import {AppComponent} from './app.component';
// Services
import {ArchiveService} from './archive/archive.service';
import {CookieModule} from 'ngx-cookie';
import {NewsArticleService} from './post/news-article.service';
import {FooterService} from './site/footer.service';
import {WordpressService} from './content/wordpress.service';
// Guards
import {AppLoadableDeactivateGuard} from './ui/ui-view-loadable-deactivate.guard';
import {ROUTES} from './app.routes';
import {PrintedIssuesModule} from './printed-issues/printed-issues.module';
import {CommonModule} from '@angular/common';

const FINAL_ROUTES: Routes = [
  {
    path: '',
    canDeactivate: [AppLoadableDeactivateGuard],
    data: {title: 'Loadable routes'},
    children: ROUTES
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AdvertisementModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ArchiveModule,
    BroadcastModule,
    BrowserModule,
    CookieModule.forRoot(),
    CommonModule,
    DisqusModule.forRoot('osqledaren'),
    ContentModule,
    PostModule,
    PrintedIssuesModule,
    RouterModule.forRoot(FINAL_ROUTES),
    UIModule,
    SiteModule,
  ],
  providers: [
    AppLoadableDeactivateGuard,
    ArchiveService,
    NewsArticleService,
    WordpressService,
    AppLoadableDeactivateGuard,
    FooterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
