import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {UIModule} from '../ui/ui.module';
import {MasonryModule} from 'angular2-masonry/src/module';
import {SharedModule} from '../shared/shared.module';
import {PrintedIssuesComponent} from './printed-issues/printed-issues.component';
import {PrintedIssuesGridComponent} from './printed-issues-grid/printed-issues-grid.component';

@NgModule({
  imports: [
    ContentModule,
    UIModule,
    MasonryModule,
    SharedModule,
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
