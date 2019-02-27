import { Component, OnInit } from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';
import {Applicant} from './applicant';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent extends UILoadableComponent {
  model = new Applicant('your name', 'your email', null, null);
  submitted = false;
  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService) {
    super(loaderService);
  }
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('hejhej')
  }
  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

}
