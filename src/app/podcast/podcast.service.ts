import {Injectable} from '@angular/core';
import {Podcast} from './podcast.interface';
import {WordpressService} from '../content/wordpress.service';
import {Observable} from 'rxjs/Observable';
import {PodcastQueryParams} from './podcast-query-params.interface';

@Injectable()
export class PodcastService {

  constructor(private WP: WordpressService) {
  }

  public getArticles(args?: PodcastQueryParams) {
    // TODO: If using several services e.g not only wordpress, join observables into one.
    return this.WP.getPodcasts(args);
  }

  public getNextBatchOfArticles(args?: PodcastQueryParams): Observable<Podcast[]> {

    return this.WP.getNextBatchOfPodcasts(args);
  }

  public getArticle(slug: any, args?: PodcastQueryParams): Observable<Podcast[]> {

    return this.WP.getPodcast(slug);

    // this.articles = this.articles.concat(Articles);

  }

}
