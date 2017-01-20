import {Injectable, Inject} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Article} from './model/article';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ContentService} from "./model/content-service";
import {APP_CONFIG} from "./app.config";

@Injectable()
export class WordpressService extends ContentService{

    constructor(protected http: Http, @Inject(APP_CONFIG) config) {
        super();
        this.endpoint = config.wordpressEndpoint;
    }

    public getArticle(id: number) {
        return this.http.get(this.endpoint + '/posts/'+ id)
            .map(WordpressService.extractData)
            .catch(this.handleError);
    }

    public getArticleBySlug(slug: string){
        return this.http.get(this.endpoint + '/posts/?slug=' + slug)
            .map(WordpressService.extractData)
            .catch(this.handleError);
    }

    public getArticles(): Observable<Article[]> {

        return this.http.get(this.endpoint + '/posts')
            .map(WordpressService.extractData)
            .catch(this.handleError);
    }

    private static htmlToPlainText(text: string): string {
        return text ? (text).replace(/<[^>]+>/gm, '').replace('[&hellip;]', '') : '';
    }

    private static extractData(res: Response) {
        let body = res.json();
        let posts = <Article[]>[];

        for (let i in body) {

            posts.push(<Article>{
                id: body[i].id,
                slug: body[i].slug,
                type: 'text',
                byline: 'Osqledaren',
                versioncreated: body[i].date,
                urgency: 1,
                headline: body[i].title.rendered,
                body_html: body[i].content.rendered,
                description_text: WordpressService.htmlToPlainText(body[i].excerpt.rendered)
            });
        }

        return posts || {};
    }


}