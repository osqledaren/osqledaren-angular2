import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {AboutComponent} from './about/about.component';
import {AdvertiseComponent} from './advertise/advertise.component';
import {RouterModule} from '@angular/router';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ErrorComponent} from './error/error.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ArchiveModule} from '../archive/archive.module';
import {CommonModule} from '@angular/common';
import {FooterService} from './footer.service';
import {AdvertisementModule} from '../advertisement/advertisement.module';
import {ApplyComponent} from './apply/apply.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports     : [
    AdvertisementModule,
    ArchiveModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
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
    StartComponent,
    ApplyComponent
  ],
  exports     : [
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
  providers   : [
    FooterService
  ]
})
export class SiteModule {}
