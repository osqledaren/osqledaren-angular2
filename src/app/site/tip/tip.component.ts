import { Component, OnInit } from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],

})
export class TipComponent extends UILoadableComponent {

  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService) {
    super(loaderService);
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

  message = '';
  mail = '';

  onClickMe() {
    console.log(this.message)
    console.log(this.mail)

  }

  messageChanged(value: string) {
    this.message = value
  }

  mailChanged(value: string) {
    this.mail = value
  }


}
