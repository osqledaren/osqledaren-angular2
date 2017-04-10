import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Podcast } from './play/play';
import { Series } from './play/series';
import {APP_CONFIG} from "./app.config";

@Injectable()
export class PlayService {
    protected _wpBase: string;
  private episodesInQueue: Array<Podcast> = [];
  public count_perPage: number = 5;
  constructor(protected http: Http, @Inject(APP_CONFIG) config) {
      this._wpBase = config.wordpressEndpoint;
  }

  //Get episodes in queue
  getEpisodesInQueue(){
    return this.episodesInQueue;
  }

  //Add episodes in queue
  addEpisodesToQueue(episode){
    this.episodesInQueue.push(episode);
  }

  //Get latest episodes
  getLatestEpisodes(lastPostDate): Observable<Podcast[]> {
      let timeQuery = "";
      if(lastPostDate != null){
          timeQuery = "&before="+lastPostDate;
      }
    return this.http
        .get(this._wpBase + `/podcast?filter[meta_query][0][key]=episode_type&filter[meta_query][0][value]=video${timeQuery}&per_page=${this.count_perPage}` +'&_embed&order=desc')
        .map((res: Response) => res.json())
        .map((podcasts: Array<any>) => this.castResponseToPlayType(podcasts));
  }

  //Retrieve episodes of specified series
  getEpisodesPerSeries(series_slug): Observable<Podcast[]>{
    return this.http
        .get(this._wpBase + `/podcast?filter[meta_query][0][key]=episode_type&filter[meta_query][0][value]=video&filter[series]=${series_slug}` +'&_embed&order=desc')
        .map((res: Response) => res.json())
        .map((podcasts: Array<any>) => this.castResponseToPlayType(podcasts));
  }

  //Get series per page
  getSeriesPerPage(): Observable<Series[]> {
    return this.http
        .get(this._wpBase + `/series?per_page=${this.count_perPage}` +'&order=desc')
        .map((res: Response) => res.json())
        //Cast response data to series type
        .map((res: Array<any>) => {
          let result:Array<Series> = [];
          if (res){
            res.forEach((p) => {
              let seriesData: Series = {
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                episodes_count: p.count
              };
              result.push(seriesData);
            });
          }
          return result;
        });
  }

  //Search podcast
  search(searchTerm, lastPostDate): Observable<Podcast[]>{
      let timeQuery = "";
      if(lastPostDate != null){
          timeQuery = "&before="+lastPostDate;
      }
    return this.http
        .get(this._wpBase + `/podcast?search=${searchTerm}${timeQuery}&filter[meta_query][0][key]=episode_type&filter[meta_query][0][value]=video&per_page=${this.count_perPage}` +'&_embed&order=desc')
        .map((res: Response) => res.json())
        .map((podcasts: Array<any>) => this.castResponseToPlayType(podcasts));
  }

  //Cast response data to play/podcast type
  castResponseToPlayType(res){
    let result:Array<Podcast> = [];
    if (res){
      res.forEach((p) => {
          let videoData = {
            url: p.meta.audio_file,
            duration: p.meta.duration,
            filesize: p.meta.filesize,
            date_recorded: p.meta.date_recorded
          };
          let authorData = {
            id: p._embedded.author[0].id,
            name: p._embedded.author[0].name,
            link: p._embedded.author[0].link
          };
          let seriesData = {
            id: p.pure_taxonomies.series[0].term_id,
            name: p.pure_taxonomies.series[0].name,
            slug: p.pure_taxonomies.series[0].slug,
            description: p.pure_taxonomies.series[0].description,
            episodes_count: p.count
          };
          let featured_image = p._embedded["wp:featuredmedia"][0].source_url;
          result.push(new Podcast(p.id, p.date, p.slug, p.title.rendered, p.content.rendered, p.excerpt.rendered, featured_image, p.acf.avsnittsnummer, videoData, authorData, seriesData));
      });
    }
    return result;
  }
}
