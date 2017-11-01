import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {AboutComponent} from './about/about.component';
import {AdvertiseComponent} from './advertise/advertise.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ErrorComponent} from './error/error.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ArchiveModule} from '../archive/archive.module';

@NgModule({
  imports: [
    ArchiveModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    AboutComponent,
    AdvertiseComponent,
    AboutComponent,
    ComingSoonComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    StartComponent
  ],
  exports: [
    AboutComponent,
    AdvertiseComponent,
    AboutComponent,
    ComingSoonComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    StartComponent
  ]
})
export class SiteModule {}
