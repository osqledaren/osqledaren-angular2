import {Injectable, Inject} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Article} from "./model/article";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {ContentService} from "./model/content-service";
import {APP_CONFIG} from "./app.config";

@Injectable()
export class WordpressService extends ContentService {

    private batchCount: number = 12;
    private offset: number = 0;

    constructor(protected http: Http, @Inject(APP_CONFIG) config) {
        super();
        this.endpoint = config.wordpressEndpoint;
    }

    /**
     * Fetches posts from wordpress by slug/id
     * @param param: any
     * @returns {Observable<R>}
     */
    public getArticle(param: any) {
        switch (typeof param) {
            case 'string':
                return this.http.get(this.endpoint + '/posts/?slug=' + param)
                    .map(WordpressService.extractData)
                    .catch(this.handleError);
            default:
                return this.http.get(this.endpoint + '/posts/' + param)
                    .map(WordpressService.extractData)
                    .catch(this.handleError);
        }
    }

    /**
     * Fetches posts from wordpress
     * @returns {Observable<R>}
     */
    public getArticles(): Observable<Article[]> {

        this.offset = 0;

        return this.getNextBatchOfArticles(null);
    }

    public getNextBatchOfArticles(searchTerm: any): Observable<Article[]> {

        let request;
        let query: string;

        query = this.endpoint + '/posts?';
        query += ((typeof(searchTerm) != null) ? query += 'filters[s] =' + searchTerm + '&' : '');
        query += 'per_page=' + this.batchCount + '&offset=' + this.offset * this.batchCount;

        request = this.http.get(query);

        this.offset++;

        return request.map(WordpressService.extractData).catch(this.handleError);

    }

    /**
     * Strips html from text.
     * @param text: string
     * @returns {string}
     */
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