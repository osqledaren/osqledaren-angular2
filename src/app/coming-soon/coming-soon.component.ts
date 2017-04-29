import { Component, OnInit } from '@angular/core';
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";
import {ArchiveType} from "../shared/enums";
import {ArchiveService} from "../archive.service";

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent extends LoadableComponent {

  constructor(loaderService: LoaderService, private archiveService: ArchiveService) {
    super(loaderService);
  }

  init(){
    this.archiveService.activate(ArchiveType.article);
    this.loaded();
  }

}
