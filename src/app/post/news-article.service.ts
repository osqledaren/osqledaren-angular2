import {Injectable} from '@angular/core';
import {Article} from './article.interface';
import {WordpressService} from '../content/wordpress.service';
import {Observable} from 'rxjs/Observable';
import {ArticleQueryParams} from './article-query-params.interface';

@Injectable()
export class NewsArticleService {

  constructor(private WP: WordpressService) {
  }

  public getArticles(args?: ArticleQueryParams) {
    // TODO: If using several services e.g not only wordpress, join observables into one.
    return this.WP.getArticles(args);
  }

  public getNextBatchOfArticles(args?: ArticleQueryParams): Observable<Article[]> {

    return this.WP.getNextBatchOfArticles(args);
  }

  public getArticle(slug: any, args?: ArticleQueryParams): Observable<Article[]> {

    return this.WP.getArticle(slug);

    // this.articles = this.articles.concat(Articles);

  }
}

