import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {APP_CONFIG} from "./app.config";
import {MediaContentService} from "./shared/abstract/abstract.media-content.service";
import {PodcastEnum} from "./shared/enums";

@Injectable()
export class PlayService extends MediaContentService {
    constructor(protected http: Http, @Inject(APP_CONFIG) config) {
        super(PodcastEnum.video, http, config.wordpressEndpoint + '/wp-json/wp/v2');
    }
}
