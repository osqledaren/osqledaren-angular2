import {Component} from '@angular/core';
import {ArchiveService} from '../archive/archive.service';
import {LoadableComponent} from '../loader/abstract.loadable.component';
import {AppLoaderService} from '../loader/app-loader.service';
import {Observable} from 'rxjs/Observable';
import {Archive} from '../archive/archive.enum';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends LoadableComponent {

  constructor(private archiveService: ArchiveService, loaderService: AppLoaderService) {
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
