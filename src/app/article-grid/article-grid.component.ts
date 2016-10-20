import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NewsArticleService} from "../news-article.service";
import {Article} from "../article";
import {MasonryOptions} from 'angular2-masonry/src/masonry-options';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.scss'],
  providers: [NewsArticleService],
	encapsulation: ViewEncapsulation.None
})
export class ArticleGridComponent implements OnInit {

	public articles: Article[];
	public masonryOptions: MasonryOptions;

  constructor() {
  	this.articles = new NewsArticleService().getAllNews();
		this.masonryOptions = {
			transitionDuration: '0.8s',
			itemSelector: '.article-grid-item',
			columnWidth: '.article-grid-sizer',
			percentPosition: true
		};
	}

	elementSize(urgency: number): string {

		let size: string;

		switch(urgency){
			case 9:
			case 8:
			case 7:
			case 6:
				size = 'brick-large';
				break;
			case 5:
				size = 'brick-medium';
				break;
			default:
				size = 'brick-small';
				break;
		}

		return size;
	}

  ngOnInit() {
  }

}
