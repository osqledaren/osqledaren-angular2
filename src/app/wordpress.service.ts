import {Injectable, Inject} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Article} from "./shared/interface/article.interface";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {ArticleQueryParams} from "./shared/interface/article-query-params.interface";
import {APP_CONFIG} from "./app.config";
import {isNullOrUndefined} from "util";
import {isUndefined} from "util";
import {isString} from "util";
import {isNumber} from "util";
import {Subscription} from "rxjs";

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
    public getArticle(param: any) {
        switch (typeof param) {
            case 'string':
                return this.http.get(this.endpoint + '/posts/?slug=' + param)
                    .map((res) => this.map(res))
                    .catch(this.handleError);
            default:
                return this.http.get(this.endpoint + '/posts/' + param)
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
        return request.map((res) => this.map(res)).catch(this.handleError);

    }

    public getMedia(query: string | number): Observable<any> {

        let request;

        if(isNumber(query)){
            query = query.toString();
            query = this.endpoint + '/media/' + query.toString();
        }

        query = query.toString();

        request = this.http.get(query);
        return request.map((res) => this.mapMediaObject(res)).catch(this.handleError);

    }

    /**
     * Strips html from text.
     * @param text: string
     * @returns {string}
     */
    protected static htmlToPlainText(text: string): string {
        return text ? (text).replace(/<[^>]+>/gm, '').replace('[&hellip;]', '') : '';
    }

    protected mapMediaObject(res: Response){

        let media = res.json();
        let json = {
            title: media.title.rendered,
            mediadetails: media.media_details
        };

        return json;
    }

    /**
     * Maps a response object to an article array
     * @param res:Response
     * @returns {Article[]|{}}
     */
    protected map(res: Response) {
        let body: any = res.json();
        let imageSub: Subscription;
        let image: any;
        let renditions;
        let posts: Article[] = <Article[]>[];

        for (let i in body) {

            if(!isNullOrUndefined(body[i]._links['wp:featuredmedia'])){
                imageSub = this.getMedia(body[i]._links['wp:featuredmedia'][0].href).subscribe(
                    res => {
                        image = res;
                        console.log(image);
                        renditions = {
                            featuredimage_thumb: {
                                title: image.mediadetails.title,
                                mime_type: image.mediadetails.sizes.thumbnail.mime_type,
                                height: image.mediadetails.sizes.thumbnail.height,
                                width: image.mediadetails.sizes.thumbnail.width,
                                href: image.mediadetails.sizes.thumbnail.source_url
                            },
                            featuredimage_l: {
                                title: image.mediadetails.title,
                                mime_type: image.mediadetails.sizes.large.mime_type,
                                height: image.mediadetails.sizes.large.height,
                                width: image.mediadetails.sizes.large.width,
                                href: image.mediadetails.sizes.large.source_url
                            },
                            featuredimage: {
                                title: image.mediadetails.title,
                                mime_type: image.mediadetails.sizes.full.mime_type,
                                height: image.mediadetails.sizes.full.height,
                                width: image.mediadetails.sizes.full.width,
                                href: image.mediadetails.sizes.full.source_url
                            }
                        }
                    }
                );
            } else {
                renditions = {};
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