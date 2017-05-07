import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {APP_CONFIG} from "../app.config";
import {MediaContentService} from "./abstract.media-content.service";
import {Broadcast} from "./broadcast.enum";

@Injectable()
export class PlayService extends MediaContentService {
    constructor(protected http: Http, @Inject(APP_CONFIG) config) {
        super(Broadcast.video, http, config.wordpressEndpoint + '/wp-json/wp/v2');
    }
}
