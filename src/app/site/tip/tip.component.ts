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
  private tipSubmit = null;
  private message = null;
  private mail = 'Ingen mail angavs';
  private tip = null;
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
    let sendBtn = document.getElementById('sendBtn')
    if(this.message){
      sendBtn.classList.remove('disabled')
    }
    else{
      sendBtn.classList.add('disabled')
    }
  }

  //Sets the mail from the user
  mailChanged(value: string) {
    this.mail = value;
  }

  //Sends the message to slack and shows the thank you page
  onClickMe() {
    if(this.message){
      this.tip = this.message + '\n\nMail: ' + this.mail
      this.tipSubmit.submitToSlack(this.tip);

      let form = document.getElementById('tipForm');
      form.style.display = 'none';
      let sentMessage = document.getElementById('tipSent');
      sentMessage.style.display = 'block';

      this.message = null;
      this.mail = null;
      this.tip = null;
    }
  }


}
