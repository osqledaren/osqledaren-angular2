import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {MasonryModule} from 'angular2-masonry/src/module';
import {PrintedIssuesComponent} from './printed-issues/printed-issues.component';
import {PrintedIssuesGridComponent} from './printed-issues-grid/printed-issues-grid.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    ContentModule,
    UIModule,
    MasonryModule,
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
