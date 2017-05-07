import {Injectable, Inject} from '@angular/core';
import {Article} from "../shared/interface/article.interface";
import {WordpressService} from "./wordpress.service";
import {Observable} from "rxjs/Observable";
import {ArticleQueryParams} from "../shared/interface/query-params.interface";

@Injectable()
export class NewsArticleService {

    constructor(private WP: WordpressService) {}

	public getArticles(args?: ArticleQueryParams){
        //TODO: If using several services e.g not only wordpress, join observables into one.
        return this.WP.getArticles(args);
	}

	public getNextBatchOfArticles(args?: ArticleQueryParams): Observable<Article[]>{

        return this.WP.getNextBatchOfArticles(args);
    }

	public getArticle(slug: any, args?: ArticleQueryParams): Observable<Article[]> {

        let WPObservable = this.WP.getArticle(slug);

        // this.articles = this.articles.concat(Articles);

        return WPObservable;
    }
}

