import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';

@Component({
  selector: 'app-podcast-archive',
  templateUrl: 'podcast-archive.component.html',
  styleUrls: ['podcast-archive.component.scss'],
})
export class PodcastArchiveComponent implements OnInit, OnDestroy {

  constructor(private searchService: ArchiveService) {
  }

  ngOnInit() {
    this.searchService.activate(Archive.article);
  }

  ngOnDestroy() {
  }

}
