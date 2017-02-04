import {Component, OnInit, OnDestroy} from '@angular/core';
import {ArchiveService} from "../archive.service";
import {ArchiveDistribution} from "../model/archive-distribution";

@Component({
  selector: 'app-archive',
  templateUrl: 'archive-widget.component.html',
  styleUrls: ['archive-widget.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  public searchInput: string;
  public visible: boolean = false;
  public activated: boolean;
  public distribution: ArchiveDistribution[];
  public months: number[];
  private sub;

  constructor(private archiveService: ArchiveService) {
  }

  ngOnInit() {
    this.sub = this.archiveService.activated.subscribe(
        (activated) => this.activated = activated
    );

    this.sub = this.archiveService.archiveDistribution.subscribe(
        (archiveDistribution) => {
          this.distribution = archiveDistribution;
          this.months = archiveDistribution[0].months; // Set collection of months of current year.
        }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
