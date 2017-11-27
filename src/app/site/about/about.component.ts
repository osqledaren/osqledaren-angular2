import {Component} from '@angular/core';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends UILoadableComponent {

  constructor(private searchService: ArchiveService,
              loaderService: UIViewLoaderService) {
    super(loaderService);
  }

  init() {
    this.loaded();
    this.searchService.activate(Archive.article);
  }

}
