import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArchiveService} from '../archive.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-search-widget',
  templateUrl: 'search-widget.component.html',
  styleUrls: ['search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit, OnDestroy {

  public searchInput: string;
  public visible = false;
  private sub;

  constructor(private archiveService: ArchiveService) {
  }

  public search() {
    let s: string;
    s = isUndefined(this.searchInput) ? '' : this.searchInput;

    if (s !== '') {
      this.archiveService.applyFilter({searchTerm: s})
    }
  }

  ngOnInit() {
    this.sub = this.archiveService.activated.subscribe(
      (activated) => this.visible = activated
    );

    this.sub = this.archiveService.filter.subscribe(
      filter => {
        this.searchInput = filter.searchTerm;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
