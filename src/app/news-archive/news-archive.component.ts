import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from "../search.service";
import {Archive} from "../model/enums";

@Component({
  selector: 'app-news-archive',
  templateUrl: 'news-archive.component.html',
  styleUrls: ['news-archive.component.scss'],
})
export class NewsArchiveComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.activate(Archive.article);
  }

  ngOnDestroy() {
    this.searchService.deactivate();
  }

}
