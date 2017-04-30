import {ElementRef, Component, Input, AfterViewInit} from '@angular/core';
import {Episode} from "../shared/interface/episode.interface";

declare let $clamp: any;

@Component({
  selector: '.episode-grid-item',
  templateUrl: 'episode-grid-item.component.html',
  styleUrls: ['./episode-grid-item.component.scss'],
})

export class EpisodeGridItemComponent implements AfterViewInit {
  @Input() episode: Episode;

  constructor(private elementView: ElementRef) {
  }

  public truncate() {

    let container = this.elementView.nativeElement.firstElementChild;
    let episodeText = this.elementView.nativeElement.firstElementChild.lastElementChild.lastElementChild.lastElementChild;
    let episodePadding = parseInt(window.getComputedStyle(this.elementView.nativeElement.firstElementChild.lastElementChild.lastElementChild).padding);

    let clampHeight = container.offsetHeight - episodePadding * 2;
    $clamp(episodeText, {clamp: clampHeight + 'px'});
  }

  ngAfterViewInit() {
    this.truncate();
  }
}

