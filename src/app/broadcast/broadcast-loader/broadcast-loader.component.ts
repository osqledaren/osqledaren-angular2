import {Component} from '@angular/core';
import {LoaderComponent} from '../../loader/abstract.loader.component';
import {BroadcastLoaderService} from '../broadcast-loader.service';

@Component({
  selector: 'app-broadcast-loader',
  templateUrl: 'broadcast-loader.component.html',
  styleUrls: ['broadcast-loader.component.scss']
})
export class BroadcastLoaderComponent extends LoaderComponent {

  constructor(loaderService: BroadcastLoaderService) {
    super(loaderService);
  }
}
