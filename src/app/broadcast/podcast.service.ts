import { Injectable } from '@angular/core';
import {MediaContentService} from './abstract.media-content.service';
import {Http} from '@angular/http';
import {Broadcast} from './broadcast.enum';
import {ContentService} from '../content/abstract.content.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class PodcastService extends ContentService {
  constructor(protected http: Http, type: Broadcast, endpoint: string) {
    super(http, environment.wordpress.endpoint);
  }

  public getEpisode() {
    let query: Observable<any>;
    let url: string;
    url = this.endpoint + '/podcast';

    query = this.http.get(url);
    return url;
  }

}
