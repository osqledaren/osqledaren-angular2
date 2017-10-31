import {NgModule} from '@angular/core';
import {AdvertisementTopBannerComponent} from './advertisement-top-banner/advertisement-top-banner.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AdvertisementTopBannerComponent
  ],
  providers: [],
  exports: [
    AdvertisementTopBannerComponent,
  ]
})
export class AdvertisementModule {
}
