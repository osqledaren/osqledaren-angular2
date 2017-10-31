import {NgModule} from '@angular/core';
import {UIService} from './ui.service';
import { UIElementDirective } from './ui-element.directive';
import { UIMirrorElementDirective } from './ui-mirror-element.directive';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {UIViewLoaderComponent} from './ui-view-loader/ui-view-loader.component';
import {UIViewLoaderService} from './ui-view-loader.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
  ],
  declarations: [UIElementDirective, UIMirrorElementDirective, UIViewLoaderComponent],
  providers: [UIService, UIViewLoaderService],
  exports: [UIElementDirective, UIMirrorElementDirective, UIViewLoaderComponent]
})
export class UIModule {}
