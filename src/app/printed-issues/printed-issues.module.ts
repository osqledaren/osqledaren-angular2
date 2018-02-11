import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {PrintedIssuesComponent} from './printed-issues/printed-issues.component';
import {PrintedIssuesGridComponent} from './printed-issues-grid/printed-issues-grid.component';
import {CommonModule} from '@angular/common';
import { NgMasonryGridModule } from 'ng-masonry-grid';

@NgModule({
  imports: [
    NgMasonryGridModule,
    ContentModule,
    UIModule,
    CommonModule,
  ],
  declarations: [
    PrintedIssuesComponent,
    PrintedIssuesGridComponent
  ],
  exports: [
    PrintedIssuesComponent,
    PrintedIssuesGridComponent
  ]
})
export class PrintedIssuesModule {
}
