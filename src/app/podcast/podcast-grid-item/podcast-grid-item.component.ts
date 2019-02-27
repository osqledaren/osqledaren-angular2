import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {Podcast} from '../podcast.interface';

declare let $clamp: any;

@Component({
  selector: '.podcast-grid-item',
  templateUrl: 'podcast-grid-item.component.html'
})

export class PodcastGridItemComponent implements AfterViewInit {
  @Input() article: Podcast;

  constructor(private elementView: ElementRef) {
  }

  public truncate() {

    const container: HTMLElement = this.elementView.nativeElement.lastElementChild.lastElementChild;
    const articleHeading: any = container.lastElementChild.lastElementChild.children[0];
    const articleDate: any = container.lastElementChild.lastElementChild.children[1];
    const articleText: any = container.lastElementChild.lastElementChild.children[2];
    const articlePadding: number = parseInt(window.getComputedStyle(container.lastElementChild).padding);

    const clampHeight: number = container.offsetHeight - articleHeading.offsetHeight - articleDate.offsetHeight - articlePadding * 2 - 10;
    $clamp(articleText, {clamp: clampHeight + 'px'});
  }

  ngAfterViewInit() {
    this.truncate();
  }
}
