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

        let WPObservable = this.WP.getArticles();

        // this.articles = this.articles.concat(Articles);

		return WPObservable;
	}

	public getArticleBySlug(slug: string): Observable<Article[]> {

        let WPObservable = this.WP.getArticleBySlug(slug);

        // this.articles = this.articles.concat(Articles);

        return WPObservable;
    }

	public getArticle(){}

}

