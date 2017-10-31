import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadableComponent} from '../loader/abstract.loadable.component';
import {AppLoaderService} from '../loader/app-loader.service';
import {isNullOrUndefined} from 'util';
import {ArchiveService} from '../archive/archive.service';
import {Archive} from '../archive/archive.enum';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends LoadableComponent {

  private errorStatus;
  private errorOrigin;

  constructor(private route: ActivatedRoute,
              private archiveService: ArchiveService,
              private router: Router, loaderService: AppLoaderService) {
    super(loaderService);
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.sub = this.route.queryParams.subscribe((qp) => {

      if (isNullOrUndefined(qp['status'])) {
        this.loaded();
        return this.router.navigate(['/']);
      } else {

        this.loaded();
        this.errorStatus = qp['status'];
        this.errorOrigin = qp['origin'];
      }

    });


  }
}
