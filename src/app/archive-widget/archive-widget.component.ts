import {Component, OnInit, OnDestroy} from '@angular/core';
import {ArchiveService} from "../archive.service";

@Component({
  selector: 'app-archive',
  templateUrl: 'archive-widget.component.html',
  styleUrls: ['archive-widget.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  public searchInput: string;
  public visible: boolean = false;
  public activated: boolean;
  private sub;

  constructor(private archiveService: ArchiveService) {
  }

  ngOnInit() {
    this.sub = this.archiveService.activated.subscribe(
        (activated) => this.activated = activated
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
