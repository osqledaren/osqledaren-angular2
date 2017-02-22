import {Injectable, Inject} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Article, Rendition} from "./shared/interface/article.interface";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {ArticleQueryParams} from "./shared/interface/article-query-params.interface";
import {APP_CONFIG} from "./app.config";
import {isNullOrUndefined} from "util";
import {isUndefined} from "util";
import {PadNumberPipe} from "./pad-number.pipe";

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
     * @returns {Observable<Article[]>}
     */
    public getArticle(param: string | number) {
        switch (typeof param) {
            case 'string':
                return this.http.get(this.endpoint + '/posts/?_embed&slug=' + param)
                    .map((res) => this.map(res))
                    .catch(this.handleError);
            default:
                return this.http.get(this.endpoint + '/posts/' + param + '?_embed')
                    .map((res) => this.map(res))
                    .catch(this.handleError);
        }
    }

    /**
     * Fetches posts from wordpress
     * @returns {Observable<Article[]>}
     */
    public getArticles(args?: ArticleQueryParams): Observable<Article[]> {
        this.offset = 0;
        return this.getNextBatchOfArticles(args);

    }

    /**
     * Retrieves next offset of posts from wordpress
     * @param args?: ArticleQueryParams
     * @returns {Observable<Article[]>}
     */
    public getNextBatchOfArticles(args?: ArticleQueryParams): Observable<Article[]> {
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
                let month: any = -1;
                let nextMonth: string = '12';
                let nextYear: string;

                // Do some validation

                if(date[0].length == 4 && Number(date[0]) <= yearToday && Number(date[0]) >= 2000){
                     year = date[0];
                }

                if(!isUndefined(date[1])){
                    if (date[1].length == 2 && Number(date[1]) > 0 && Number(date[1]) <= 12){
                        month = date[1];
                    }
                }

                nextMonth = (Number(month) !== 12 && Number(month) !== -1) ? (Number(month) + 1).toString() : '01';
                nextYear = Number(nextMonth) !== 1 ? year : (Number(year) +1).toString();
                month = month === -1 ? '01' : month;

                queryParams += 'after=' + year + '-' + month + '-01T00:00:00&';
                queryParams += 'before=' + nextYear + '-' + new PadNumberPipe().transform(nextMonth, 2) + '-01T00:00:00&'
            }

            // Do some validation.
        }

        query = this.endpoint + '/posts?_embed&';
        query += queryParams;
        query += 'per_page=' + this.batchCount + '&offset=' + this.offset * this.batchCount;

        // Do the request
        request = this.http.get(query);

        // Increment offset number
        this.offset++;
        return request.map((res) => this.map(res)).catch(this.handleError);

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
     * @returns {Article[]|{}}
     */
    protected map(res: Response) {
        let body: any = res.json();
        let posts: Article[] = <Article[]>[];
        let renditions: {};
        let media: any, sizes: any;

        for (let i in body) {

            try {
                renditions = <Rendition>{};
                media = body[i]._embedded['wp:featuredmedia'];
                sizes = media[0].media_details.sizes;

                for (let j in sizes) {
                    renditions[j] = <Rendition>{
                            title: media[0].title.rendered,
                            href: sizes[j].source_url,
                            mime_type: sizes[j].mime_type,
                            height: sizes[j].height,
                            width: sizes[j].width
                    };
                }
            } catch (Exception){
                renditions = null;
            }

            posts.push(<Article>{
                body_html: body[i].content.rendered,
                byline: 'Osqledaren',
                copyrightholder: 'Osqledaren',
                copyrightnotice: 'Copyright Osqledaren',
                description_text: WordpressService.htmlToPlainText(body[i].excerpt.rendered),
                headline: body[i].title.rendered,
                id: body[i].id,
                mimetype: 'text/html',
                renditions: renditions,
                representationtype: 'complete',
                slug: body[i].slug,
                type: 'text',
                uri: body[i].link,
                urgency: 1,
                versioncreated: body[i].date
            });
        }

        return posts;
    }
}