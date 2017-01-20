import {ViewChild, ElementRef, Component, Input, AfterViewInit} from '@angular/core';
import {Article} from "../model/article";

declare let $clamp: any;

@Component({
  selector: 'masonry-brick',
  templateUrl: 'article-grid-item.component.html'
})

export class ArticleGridItemComponent implements AfterViewInit {
  @Input() article: Article;

  constructor(private elementView: ElementRef) {}

  public truncate(){

    let container = this.elementView.nativeElement.lastElementChild;
    let articleHeading = container.lastElementChild.lastElementChild.children[0];
    let articleDate = container.lastElementChild.lastElementChild.children[1];
    let articleText = container.lastElementChild.lastElementChild.children[2];
    let articlePadding = parseInt(window.getComputedStyle(container.lastElementChild).padding);

    let clampHeight = container.offsetHeight - articleHeading.offsetHeight - articleDate.offsetHeight - articlePadding*2 - 10;

    $clamp(articleText, {clamp: clampHeight + 'px'});
  }

  ngAfterViewInit() {

    this.truncate();

  }


}
