import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ArchiveService} from './archive.service';
import {ArchiveWidgetComponent} from './archive-widget/archive-widget.component';
import {SearchWidgetComponent} from './search-widget/search-widget.component';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ContentModule,
    FormsModule,
    HttpModule,
    UIModule,
    RouterModule
  ],
  declarations: [
    ArchiveWidgetComponent,
    SearchWidgetComponent
  ],
  providers: [
    ArchiveService
  ],
  exports: [
    ArchiveWidgetComponent,
    SearchWidgetComponent
  ]
})
export class ArchiveModule {
}
