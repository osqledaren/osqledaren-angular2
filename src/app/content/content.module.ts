import {NgModule} from '@angular/core';
import {ImageComponent} from './image/image.component';
import {ImageThumbnailComponent} from './image-thumbnail/image-thumbnail.component';
import {WordpressService} from './wordpress.service';
import {BylineComponent} from './byline/byline.component';
import {UIModule} from '../ui/ui.module';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    UIModule,
    HttpModule,
    CommonModule,
  ],
  declarations: [
    BylineComponent,
    ImageComponent,
    ImageThumbnailComponent,
  ],
  providers: [
    WordpressService
  ],
  exports: [
    BylineComponent,
    ImageComponent,
    ImageThumbnailComponent
  ]
})
export class ContentModule {
}
