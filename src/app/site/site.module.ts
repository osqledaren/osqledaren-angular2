import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {AboutComponent} from './about/about.component';
import {AdvertiseComponent} from './advertise/advertise.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../app.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ErrorComponent} from './error/error.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PrintedIssuesComponent} from './printed-issues/printed-issues/printed-issues.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    AboutComponent,
    AdvertiseComponent,
    AboutComponent,
    AppComponent,
    ComingSoonComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    PrintedIssuesComponent,
    StartComponent
  ],
  exports: [
    AboutComponent,
    AdvertiseComponent,
    AboutComponent,
    AppComponent,
    ComingSoonComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    PrintedIssuesComponent,
    StartComponent
  ]
})
export class SiteModule {}
