import {Component} from '@angular/core';
import {UILoaderComponent} from '../../ui/abstract.ui-loader.component';
import {BroadcastLoaderService} from '../broadcast-loader.service';

@Component({
  selector: 'app-broadcast-loader',
  templateUrl: 'broadcast-loader.component.html',
  styleUrls: ['broadcast-loader.component.scss']
})
export class BroadcastLoaderComponent extends UILoaderComponent {

  constructor(loaderService: BroadcastLoaderService) {
    super(loaderService);
  }
}
