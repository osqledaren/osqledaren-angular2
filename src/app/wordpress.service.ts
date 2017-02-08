import {Injectable, Inject} from "@angular/core";
import {Response, Http} from "@angular/http";
import {IArticle} from "./model/interface-article";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {ContentService} from "./model/abstract-content-service";
import {IArticleQueryParams} from "./model/interface-article-query-params";
import {APP_CONFIG} from "./app.config";
import {isNullOrUndefined} from "util";
import {isUndefined} from "util";

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
     * @returns {Observable<IArticle[]>}
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
     * @returns {Observable<IArticle[]>}
     */
    public getArticles(args?: IArticleQueryParams): Observable<IArticle[]> {
        this.offset = 0;
        return this.getNextBatchOfArticles(args);

    }

    /**
     * Retrieves next offset of posts from wordpress
     * @param args?: IArticleQueryParams
     * @returns {Observable<IArticle[]>}
     */
    public getNextBatchOfArticles(args?: IArticleQueryParams): Observable<IArticle[]> {
        let request: Observable<Response>;
        let query: string;
        let queryParams: string = '';

        // Add query parameters
        if (!isNullOrUndefined(args)) {

            if (!isNullOrUndefined(args.searchTerm)) {
                queryParams += 'search=' + args.searchTerm + '&'
            }
            if (!isNullOrUndefined(args.date)) {

                let date: Array<string> = args.date.split('-');
                let yearToday: number = new Date().getFullYear();
                let year: string;
                let month: string = '01';

                // Do some validation

                if(date[0].length == 4 && Number(date[0]) <= yearToday && Number(date[0]) >= 2000){
                     year = date[0];
                }

                if(!isUndefined(date[1])){
                    if (date[1].length == 2 && Number(date[1]) > 0 && Number(date[1]) <= 12){
                        month = date[1];
                    }
                }

                queryParams += 'after=' + year + '-' + month + '-01T00:00:00&'
            }

            // Do some validation.
        }

        query = this.endpoint + '/posts?';
        query += queryParams;
        query += 'per_page=' + this.batchCount + '&offset=' + this.offset * this.batchCount;

        // Do the request
        request = this.http.get(query);

        // Increment offset number
        this.offset++;
        return request.map(WordpressService.extractData).catch(this.handleError);

    }

    /**
     * Strips html from text.
     * @param text: string
     * @returns {string}
     */
    protected static htmlToPlainText(text: string): string {
        return text ? (text).replace(/<[^>]+>/gm, '').replace('[&hellip;]', '') : '';
    }

    /**
     * Maps a response object to an article array
     * @param res:Response
     * @returns {IArticle[]|{}}
     */
    protected static extractData(res: Response) {
        let body: any = res.json();
        let posts: IArticle[] = <IArticle[]>[];

        for (let i in body) {

            posts.push(<IArticle>{
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

        return posts;
    }


}