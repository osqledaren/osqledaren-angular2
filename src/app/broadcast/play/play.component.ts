import {Component, ViewChildren, AfterViewInit, QueryList} from "@angular/core";
import {AppLoaderService} from "../../loader/app-loader.service";
import {PlayService} from "../play.service";
import {ArchiveService} from "../../archive/archive.service";
import {Archive} from "../../archive/archive.enum";
import {BroadcastViewComponent} from "../abstract.broadcast-view.component";
import {MediaContentService} from "../abstract.media-content.service";
import {EpisodeGridComponent} from "../episode-grid/episode-grid.component";

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
    viewProviders: [{provide: MediaContentService, useExisting: PlayService}] // Alias abstract service with implementation for episode grid
})
export class PlayComponent extends BroadcastViewComponent{

    constructor(loaderService: AppLoaderService,
                archiveService: ArchiveService,
                mediaService: PlayService) {
        super(loaderService, archiveService, mediaService);
    }
}
