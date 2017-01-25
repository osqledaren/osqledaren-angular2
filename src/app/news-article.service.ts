import {Injectable, Inject} from '@angular/core';
import {Article} from "./model/article";
import {WordpressService} from "./wordpress.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsArticleService {

    private articles: Article[];
    private errorMessage;

    constructor(private WP: WordpressService) {
        this.articles = <Article[]>[];
    }

	public getArticles(): Observable<Article[]>{

       return this.WP.getArticles();

	}

	public getNextBatchOfArticles(): Observable<Article[]>{
        return this.WP.getNextBatchOfArticles();
    }

	public getArticle(param: any): Observable<Article[]> {

        let WPObservable = this.WP.getArticle(param);

        // this.articles = this.articles.concat(Articles);

        return WPObservable;
    }
}

