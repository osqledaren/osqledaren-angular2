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

  //Sets the message from the user
  messageChanged(value: string) {
    this.message = value;
  }

  //Sets the mail from the user
  mailChanged(value: string) {
    this.mail = value;
  }

  //Sends the message to slack and shows the thank you page
  onClickMe() {
    this.tip = this.message + '\n\nMail: ' + this.mail
    this.tipSubmit.submitToSlack(this.tip);

    let form = document.getElementById('tipForm');
    form.style.display = 'none';
    let sentMessage = document.getElementById('tipSent');
    sentMessage.style.display = 'block';

    this.message = '';
    this.mail = '';
    this.tip = '';
  }


}
