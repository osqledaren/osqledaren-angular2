import {Component} from '@angular/core';
import {UIViewLoaderService} from '../ui-view-loader.service';
import {UILoaderComponent} from '../abstract.ui-loader.component';

@Component({
  selector: 'app-ui-view-loader',
  templateUrl: 'ui-view-loader.component.html',
  styleUrls: ['ui-view-loader.component.scss']
})
export class UIViewLoaderComponent extends UILoaderComponent {

  constructor(loaderService: UIViewLoaderService) {
    super(loaderService);
  }
}
