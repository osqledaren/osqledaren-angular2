import { Component, OnInit } from '@angular/core';
import {LoadableComponent} from "../loader/abstract.loadable.component";
import {LoaderService} from "../loader/loader.service";
import {ArchiveService} from "../archive/archive.service";
import {Archive} from "../archive/archive.enum";

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
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

}
