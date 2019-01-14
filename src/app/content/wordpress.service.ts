import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Article} from '../post/article.interface';
import {Page} from './page.interface';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {ContentService} from './abstract.content.service';
import {isNullOrUndefined, isUndefined} from 'util';
import {PadNumberPipe} from '../shared/pad-number.pipe';
import {CookieService} from 'ngx-cookie';
import {ArticleQueryParams} from '../post/article-query-params.interface';
import {PodcastQueryParams} from '../podcast/podcast-query-params.interface';
import {environment} from '../../environments/environment';

import {Podcast} from '../podcast/podcast.interface';

@Injectable()
export class WordpressService extends ContentService {

  private batchCount = 12;
  private offset = 0;
  private clientName;

  constructor(protected http: Http,
              protected cookieService: CookieService) {
    super(http, environment.wordpress.endpoint + '/wp-json/wp/v2');
    this.clientName = environment.wordpress.OAuth2ClientName;
  }

  /**
   * Fetches posts from wordpress by slug/id
   * @param slug: any
   * @returns {Observable<Article[]>}
   */
  public getArticle(slug: any) {

    let query: Observable<Article[]>;
    let url: string;
    const headers: Headers = new Headers();

    switch (isNaN(slug)) {
      case true:
        url = this.endpoint + '/posts/?_embed&slug=' + slug;
        break;
      default:
        url = this.endpoint + '/posts/' + slug + '?_embed';
        break;
    }
    try {
      const token = this.cookieService.get(this.clientName + '-access-token');
      headers.append('Authorization', 'BEARER ' + token);
    } catch (Exception) {
      return;
    }

    query = this.http.get(url, {headers: headers}).map((res) => this.mapArticle(res)).catch(this.handleError);

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
    let queryParams = '';

    // Add query parameters
    if (!isNullOrUndefined(args)) {

      if (!isNullOrUndefined(args.searchTerm)) {
        queryParams += 'search=' + args.searchTerm + '&';
      }
      if (!isNullOrUndefined(args.date)) {

        const date: Array<string> = args.date.split('-');
        const yearToday: number = new Date().getFullYear();
        let year: string;
        let month: any = -1;
        let nextMonth = '12';
        let nextYear: string;

        // Do some validation

        if (date[0].length === 4 && Number(date[0]) <= yearToday && Number(date[0]) >= 2000) {
          year = date[0];
        }

        if (!isUndefined(date[1])) {
          if (date[1].length === 2 && Number(date[1]) > 0 && Number(date[1]) <= 12) {
            month = date[1];
          }
        }

        nextMonth = (Number(month) !== 12 && Number(month) !== -1) ? (Number(month) + 1).toString() : '01';
        nextYear = Number(nextMonth) !== 1 ? year : (Number(year) + 1).toString();
        month = month === -1 ? '01' : month;

        queryParams += 'after=' + year + '-' + month + '-01T00:00:00&';
        queryParams += 'before=' + nextYear + '-' + new PadNumberPipe().transform(nextMonth, 2) + '-01T00:00:00&';
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
    return request.map((res) => this.mapArticle(res)).catch(this.handleError);

  }

  private parseArticle(body) {

    const categoriesById: Array<any> = [];
    let categories: any;
    let relatedPosts: any;
    const renditions = this.parseRenditions(body);
    const byline = this.parseByline(body);

    categories = body.categories;
    for (let k in categories) {
      if (categories[k]) {
        categoriesById[k] = categories[k];
      }
    }

    try {
      relatedPosts = body.acf.related_posts;
    } catch (Exception) {
      relatedPosts = null;
    }

    return <Article>{
      body_html         : body.content.rendered,
      byline            : byline,
      categoriesById    : categoriesById,
      copyrightholder   : 'Osqledaren',
      copyrightnotice   : 'Copyright Osqledaren',
      description_text  : ContentService.htmlToPlainText(body.excerpt.rendered),
      headline          : body.title.rendered,
      id                : body.id,
      mimetype          : 'text/html',
      related_posts     : relatedPosts,
      renditions        : renditions,
      representationtype: 'complete',
      slug              : body.slug,
      type              : 'text',
      uri               : body.link,
      urgency           : 1,
      versioncreated    : body.date
    };
  }

  /**
   * Maps a response object to an article array
   * @param res:Response
   * @returns {Article[]|{}}
   */
  protected mapArticle(res: Response) {
    const body: any = res.json();
    const posts: Article[] = <Article[]>[];

    try {
      if (body.constructor === Array) {
        for (let i in body) {
          if (body[i]) {
            posts.push(this.parseArticle(body[i]));
          }
        }

      } else {
        posts.push(this.parseArticle(body));
      }
    } catch (Exception) {
    }

    return posts;
  }

  /**
   * Fetches a page from wordpress by id
   * @param slug: any
   * @returns {Observable<Page[]>}
   */
  public getPage(slug: any) {

    let query: Observable<Page[]>;
    let url: string;
    const headers: Headers = new Headers();

    url = this.endpoint + '/pages/?slug=' + slug;

    try {
      const token = this.cookieService.get(this.endpoint + '-access-token');
      headers.append('Authorization', 'BEARER ' + token);
    } catch (Exception) {
      return;
    }

    query = this.http.get(url, {headers: headers}).map((res) => this.mapPage(res)).catch(this.handleError);

    return query;
  }

  private parsePage(body) {
    return <Page>{
      body_html    : body.content.rendered,
      custom_fields: body.acf
    };
  }

  /**
   * Maps a response object to an page array
   * @param res:Response
   * @returns {Page[]|{}}
   */
  protected mapPage(res: Response) {
    const body: any = res.json();
    const pages: Page[] = <Page[]>[];

    try {
      if (body.constructor === Array) {
        for (let i in body) {
          pages.push(this.parsePage(body[i]));
        }
      } else {
        pages.push(this.parsePage(body));
      }
    } catch (Exception) {
    }

    return pages;
  }

  /**
   * Fetches podcasts from wordpress by slug/id
   * @param slugOrId: any
   * @returns {Observable<Podcast[]>}
   */
  public getPodcast(slugOrId: any) {

    let query: Observable<Podcast[]>;
    let url: string;
    const headers: Headers = new Headers();

    switch (isNaN(slugOrId)) {
      case true:
        url = this.endpoint + '/podcast/?_embed&slug=' + slugOrId;
        break;
      default:
        url = this.endpoint + '/podcast/' + slugOrId + '?_embed';
        break;
    }
    try {
      const token = this.cookieService.get(this.clientName + '-access-token');
      headers.append('Authorization', 'BEARER ' + token);
    } catch (Exception) {
      return;
    }

    query = this.http.get(url, {headers: headers}).map((res) => this.mapPodcast(res)).catch(this.handleError);

    return query;
  }

  /**
   * Fetches podcasts from wordpress
   * @returns {Observable<Podcast[]>}
   */
  public getPodcasts(args?: PodcastQueryParams): Observable<Podcast[]> {
    this.offset = 0;
    return this.getNextBatchOfPodcasts(args);

  }

  /**
   * Retrieves next offset of podcasts from wordpress
   * @param args?: PodcastQueryParams
   * @returns {Observable<Podcast[]>}
   */
  public getNextBatchOfPodcasts(args?: PodcastQueryParams): Observable<Podcast[]> {
    let request: Observable<Response>;
    let query: string;
    let queryParams = '';

    // Add query parameters
    if (!isNullOrUndefined(args)) {

      if (!isNullOrUndefined(args.searchTerm)) {
        queryParams += 'search=' + args.searchTerm + '&';
      }
      if (!isNullOrUndefined(args.date)) {

        const date: Array<string> = args.date.split('-');
        const yearToday: number = new Date().getFullYear();
        let year: string;
        let month: any = -1;
        let nextMonth = '12';
        let nextYear: string;

        // Do some validation

        if (date[0].length === 4 && Number(date[0]) <= yearToday && Number(date[0]) >= 2000) {
          year = date[0];
        }

        if (!isUndefined(date[1])) {
          if (date[1].length === 2 && Number(date[1]) > 0 && Number(date[1]) <= 12) {
            month = date[1];
          }
        }

        nextMonth = (Number(month) !== 12 && Number(month) !== -1) ? (Number(month) + 1).toString() : '01';
        nextYear = Number(nextMonth) !== 1 ? year : (Number(year) + 1).toString();
        month = month === -1 ? '01' : month;

        queryParams += 'after=' + year + '-' + month + '-01T00:00:00&';
        queryParams += 'before=' + nextYear + '-' + new PadNumberPipe().transform(nextMonth, 2) + '-01T00:00:00&';
      }
      if (!isNullOrUndefined(args.category)) {
        queryParams += 'categories=' + args.category + '&';
      }

      // Do some validation.
    }

    query = this.endpoint + '/podcast?_embed&';
    query += queryParams;
    query += 'per_page=' + this.batchCount + '&offset=' + this.offset * this.batchCount;

    // Do the request
    request = this.http.get(query);

    // Increment offset number
    this.offset++;
    return request.map((res) => this.mapPodcast(res)).catch(this.handleError);

  }

  private parsePodcast(body) {

    const categoriesById: Array<any> = [];
    let categories: any;
    let relatedPodcasts: any;
    const renditions = this.parseRenditions(body);
    const byline = this.parseByline(body);

    categories = body.categories;
    for (let k in categories) {
      if (categories[k]) {
        categoriesById[k] = categories[k];
      }
    }

    try {
      relatedPodcasts = body.acf.related_podcasts;
    } catch (Exception) {
      relatedPodcasts = null;
    }

    return <Podcast>{
      body_html         : body.content.rendered,
      byline            : byline,
      categoriesById    : categoriesById,
      copyrightholder   : 'Osqledaren',
      copyrightnotice   : 'Copyright Osqledaren',
      description_text  : ContentService.htmlToPlainText(body.excerpt.rendered),
      headline          : body.title.rendered,
      id                : body.id,
      mimetype          : 'text/html',
      related_podcasts  : relatedPodcasts,
      renditions        : renditions,
      representationtype: 'complete',
      slug              : body.slug,
      type              : 'text',
      uri               : body.link,
      urgency           : 1,
      versioncreated    : body.date,
      audio_file        : body.meta.audio_file
    };
  }

  /**
   * Maps a response object to an article array
   * @param res:Response
   * @returns {Podcast[]|{}}
   */
  protected mapPodcast(res: Response) {
    const body: any = res.json();
    const podcasts: Podcast[] = <Podcast[]>[];

    try {
      if (body.constructor === Array) {
        for (let i in body) {
          if (body[i]) {
            podcasts.push(this.parsePodcast(body[i]));
          }
        }

      } else {
        podcasts.push(this.parsePodcast(body));
      }
    } catch (Exception) {
    }

    return podcasts;
  }
}
