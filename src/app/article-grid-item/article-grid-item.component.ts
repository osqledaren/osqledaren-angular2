import { Component, Input, OnInit } from '@angular/core';
import {Article} from "../model/article";
@Component({
  selector: 'masonry-brick',
  templateUrl: 'article-grid-item.component.html'
})

export class ArticleGridItemComponent implements OnInit {

	@Input() article: Article;

  constructor() {

  }

  ngOnInit() {
  }

}
