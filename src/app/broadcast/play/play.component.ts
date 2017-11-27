import {Component} from '@angular/core';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {PlayService} from '../play.service';
import {ArchiveService} from '../../archive/archive.service';
import {BroadcastViewComponent} from '../abstract.broadcast-view.component';
import {MediaContentService} from '../abstract.media-content.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  viewProviders: [{provide: MediaContentService, useExisting: PlayService}] // Alias abstract service with implementation for episode grid
})
export class PlayComponent extends BroadcastViewComponent {

  constructor(loaderService: UIViewLoaderService,
              archiveService: ArchiveService,
              mediaService: PlayService) {
    super(loaderService, archiveService, mediaService);
  }
}
