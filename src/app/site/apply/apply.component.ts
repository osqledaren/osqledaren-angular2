import { Component, OnInit } from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent extends UILoadableComponent {

  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService) {
    super(loaderService);
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

}
