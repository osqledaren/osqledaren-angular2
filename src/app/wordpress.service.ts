import {Injectable, Inject} from "@angular/core";
import {Response, Http, RequestMethod, Request, Headers} from "@angular/http";
import {Article, Rendition, Byline} from "./shared/interface/article.interface";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {ArticleQueryParams} from "./shared/interface/article-query-params.interface";
import {APP_CONFIG} from "./app.config";
import {isNullOrUndefined, isUndefined} from "util";
import {PadNumberPipe} from "./pad-number.pipe";

@Injectable()
export class WordpressService extends ContentService {

    private batchCount: number = 12;
    private offset: number = 0;

    constructor(protected http: Http,
                @Inject(APP_CONFIG) config) {
        super();
        this.endpoint = config.wordpressEndpoint + '/wp-json/wp/v2';
    }

    /**
     * Fetches posts from wordpress by slug/id
     * @param slug: any
     * @returns {Observable<Article[]>}
     */
    public getArticle(slug: any) {

        let query: Observable<Article[]>;
        let url: string;
        let headers: Headers = new Headers();

        switch (isNaN(slug)) {
            case true:
                url = this.endpoint + '/posts/?_embed&slug=' + slug;
                break;
            default:
                url = this.endpoint + '/posts/' + slug + '?_embed';
                break;
        }

        try{
            //headers.append('Authorization', 'BEARER ' + args.access_token)
        } catch(Exception){}

        query = this.http.get(url, {headers: headers}).map((res) => this.map(res)).catch(this.handleError);

        return query;
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

                if (date[0].length == 4 && Number(date[0]) <= yearToday && Number(date[0]) >= 2000) {
                    year = date[0];
                }

                if (!isUndefined(date[1])) {
                    if (date[1].length == 2 && Number(date[1]) > 0 && Number(date[1]) <= 12) {
                        month = date[1];
                    }
                }

                nextMonth = (Number(month) !== 12 && Number(month) !== -1) ? (Number(month) + 1).toString() : '01';
                nextYear = Number(nextMonth) !== 1 ? year : (Number(year) + 1).toString();
                month = month === -1 ? '01' : month;

                queryParams += 'after=' + year + '-' + month + '-01T00:00:00&';
                queryParams += 'before=' + nextYear + '-' + new PadNumberPipe().transform(nextMonth, 2) + '-01T00:00:00&'
            }
            if (!isNullOrUndefined(args.category)) {
                queryParams += 'categories=' + args.category + '&';
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

    private parse(body) {

        let renditions: {};
        let categoriesById: Array<any> = [];
        let media: any, sizes: any, categories: any, byline: Array<Byline> = [];
        let cred: any, relatedPosts: any;

        try {
            renditions = <Rendition>{};
            media = body._embedded['wp:featuredmedia'];
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
        } catch (Exception) {
            renditions = null;
        }

        categories = body.categories;
        for (let k in categories) {
            categoriesById[k] = categories[k];
        }

        try {
            let author: Array<string>;
            let bylineAuthors = body.acf.cred.match(/[^\r\n]+/g);

            for (let j in bylineAuthors) {
                author = bylineAuthors[j].split("="); // Split name and role at separator, in this case the "=" character.

                author[0] = author[0].trim(); // Remove leading and trailing whitespaces.
                author[1] = author[1].trim(); // Remove leading and trailing whitespaces.

                // If successful convert raw strings into byline element.
                if (author[0] !== "" && author[1] !== "") {
                    byline.push(<Byline>{
                        role: author[0],
                        author: author[1]
                    });
                }
            }

        } catch (Exception) {
            byline = null;
        }

        // Try getting ACF fields.
        try {
            cred = body.acf.cred;
        } catch (Exception) {
            cred = null;
        }

        try {
            relatedPosts = body.acf.related_posts
        } catch (Exception) {
            relatedPosts = null
        }

        return <Article>{
            body_html: body.content.rendered,
            byline: byline,
            categoriesById: categoriesById,
            copyrightholder: 'Osqledaren',
            copyrightnotice: 'Copyright Osqledaren',
            cred: cred,
            description_text: WordpressService.htmlToPlainText(body.excerpt.rendered),
            headline: body.title.rendered,
            id: body.id,
            mimetype: 'text/html',
            related_posts: relatedPosts,
            renditions: renditions,
            representationtype: 'complete',
            slug: body.slug,
            type: 'text',
            uri: body.link,
            urgency: 1,
            versioncreated: body.date
        };
    }

    /**
     * Maps a response object to an article array
     * @param res:Response
     * @returns {Article[]|{}}
     */
    protected map(res: Response) {
        let body: any = res.json();
        let posts: Article[] = <Article[]>[];

        try {
            if (body.constructor === Array) {
                for (let i in body) {
                    posts.push(this.parse(body[i]));
                }
            } else {
                posts.push(this.parse(body));
            }
        } catch (Exception) {
        }


        return posts;
    }
}