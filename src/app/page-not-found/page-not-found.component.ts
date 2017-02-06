import { Component, OnInit } from '@angular/core';
import {ArchiveService} from "../archive.service";
import {Archive} from "../model/enums";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private archiveService: ArchiveService) { }

  ngOnInit() {
    this.archiveService.activate(Archive.article);
  }

}
