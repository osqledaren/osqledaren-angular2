import {Injectable, Inject} from '@angular/core';
import {IArticle} from "./model/interface-article";
import {WordpressService} from "./wordpress.service";
import {Observable} from "rxjs/Observable";
import {IArticleQueryParams} from "./model/interface-article-query-params";

@Injectable()
export class NewsArticleService {

    private errorMessage;

    constructor(private WP: WordpressService) {}

	public getArticles(args?: IArticleQueryParams){
        //TODO: If using several services e.g not only wordpress, join observables into one.
        return this.WP.getArticles(args);
	}

	public getNextBatchOfArticles(args?: IArticleQueryParams): Observable<IArticle[]>{

        return this.WP.getNextBatchOfArticles(args);
    }

	public getArticle(param: any): Observable<IArticle[]> {

        let WPObservable = this.WP.getArticle(param);

        // this.articles = this.articles.concat(Articles);

        return WPObservable;
    }
}

