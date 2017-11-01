import {NgModule} from '@angular/core';
import {AdvertisementTopBannerComponent} from './advertisement-top-banner/advertisement-top-banner.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AdvertisementTopBannerComponent
  ],
  providers: [],
  exports: [
    AdvertisementTopBannerComponent
  ]
})
export class AdvertisementModule {
}
