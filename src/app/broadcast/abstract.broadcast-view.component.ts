import {UILoadableComponent} from '../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../ui/ui-view-loader.service';
import {ArchiveService} from '../archive/archive.service';
import {PlayService} from './play.service';
import {Archive} from '../archive/archive.enum';


export abstract class BroadcastViewComponent extends UILoadableComponent {

  constructor(loaderService: UIViewLoaderService,
              private archiveService: ArchiveService,
              public mediaService: PlayService) {
    super(loaderService);
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.mediaService.initialized.subscribe((loaded) => {
      if (loaded) {
        this.loaded()
      }
      ;
    });
  }

  destroy() {
    this.mediaService.initialized.next(false);
  }

}
