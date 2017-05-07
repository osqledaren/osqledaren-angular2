import {Component, OnInit, OnDestroy} from '@angular/core';
import {ArchiveService} from "../archive.service";
import {ArchiveEnum} from "../shared/enums";

@Component({
  selector: 'app-news-archive',
  templateUrl: 'news-archive.component.html',
  styleUrls: ['news-archive.component.scss'],
})
export class NewsArchiveComponent implements OnInit, OnDestroy {

  constructor(private searchService: ArchiveService) { }

  ngOnInit() {
    this.searchService.activate(ArchiveEnum.article);
  }

  ngOnDestroy() {
  }

}
