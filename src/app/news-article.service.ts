import {Injectable, Inject} from '@angular/core';
import {Article} from "./shared/interface/article.interface";
import {WordpressService} from "./wordpress.service";
import {Observable} from "rxjs/Observable";
import {ArticleQueryParams} from "./shared/interface/article-query-params.interface";

@Injectable()
export class NewsArticleService {

    private errorMessage;

    constructor(private WP: WordpressService) {}

	public getArticles(args?: ArticleQueryParams){
        //TODO: If using several services e.g not only wordpress, join observables into one.
        return this.WP.getArticles(args);
	}

	public getNextBatchOfArticles(args?: ArticleQueryParams): Observable<Article[]>{

        return this.WP.getNextBatchOfArticles(args);
    }

	public getArticle(param: any): Observable<Article[]> {

        let WPObservable = this.WP.getArticle(param);

        // this.articles = this.articles.concat(Articles);

        return WPObservable;
    }
}

