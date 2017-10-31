import {Component} from '@angular/core';
import {ArchiveService} from '../../archive/archive.service';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {Observable} from 'rxjs/Observable';
import {Archive} from '../../archive/archive.enum';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends UILoadableComponent {

  constructor(private archiveService: ArchiveService, loaderService: UIViewLoaderService) {
    super(loaderService);
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();

    this.archiveService.activated.subscribe(
      () => {
        Observable.timer(0).subscribe(
          () => {
            this.archiveService.applyFilter(null, false);
          }
        )
      }
    );

  }

}
