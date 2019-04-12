import { Component, OnInit } from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';
import {TipSubmitService} from '../tip-submit.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],

})
export class TipComponent extends UILoadableComponent {

  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService, tipSubmit: TipSubmitService) {
    super(loaderService);
    this.tipSubmit = tipSubmit;
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

  messageChanged(value: string) {
    this.message = value;
  }

  mailChanged(value: string) {
    this.mail = value;
  }

  onClickMe() {
    this.tip = this.message + '\n\nMail: ' + this.mail
    this.sendToSlack();

    let form = document.getElementById('tipForm');
    form.style.display = 'none';
    let sentMessage = document.getElementById('tipSent');
    sentMessage.style.display = 'block';

    this.message = '';
    this.mail = '';
    this.tip = '';
  }

  sendToSlack(){
    this.tipSubmit.submitToSlack(this.tip);

    }


}
