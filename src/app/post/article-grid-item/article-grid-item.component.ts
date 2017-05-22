import {ElementRef, Component, Input, AfterViewInit} from '@angular/core';
import {Article} from "../article.interface";

declare let $clamp: any;

@Component({
  selector: '.article-grid-item',
  templateUrl: 'article-grid-item.component.html'
})

export class ArticleGridItemComponent implements AfterViewInit {
  @Input() article: Article;

  constructor(private elementView: ElementRef) {}

  public truncate(){

    let container: HTMLElement = this.elementView.nativeElement.lastElementChild.lastElementChild;
    let articleHeading: any = container.lastElementChild.lastElementChild.children[0];
    let articleDate: any = container.lastElementChild.lastElementChild.children[1];
    let articleText: any = container.lastElementChild.lastElementChild.children[2];
    let articlePadding: number = parseInt(window.getComputedStyle(container.lastElementChild).padding);

    let clampHeight: number = container.offsetHeight - articleHeading.offsetHeight - articleDate.offsetHeight - articlePadding*2 - 10;
    $clamp(articleText, {clamp: clampHeight + 'px'});
  }

  ngAfterViewInit() {
    this.truncate();
  }
}
