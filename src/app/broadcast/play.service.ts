import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {MediaContentService} from './abstract.media-content.service';
import {Broadcast} from './broadcast.enum';
import {environment} from '../../environments/environment';

@Injectable()
export class PlayService extends MediaContentService {
  constructor(protected http: Http) {
    super(Broadcast.video, http, environment.wordpress.endpoint + '/wp-json/wp/v2');
  }
}
