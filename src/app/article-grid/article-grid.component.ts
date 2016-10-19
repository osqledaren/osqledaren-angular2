import { Component, OnInit } from '@angular/core';
import {NewsArticleService} from "../news-article.service";
import {Article} from "../article";

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.scss'],
  providers: [NewsArticleService]
})
export class ArticleGridComponent implements OnInit {

	public news: Article[];

  constructor() {
  	this.news = new NewsArticleService().getAllNews();
	}

	load() {
	}

  ngOnInit() {
  }

}
