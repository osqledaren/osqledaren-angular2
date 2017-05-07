import {Component, ViewChildren, QueryList, ViewEncapsulation} from "@angular/core";
import {LoaderService} from "../loader.service";
import {PlayService} from "../play.service";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {MasonryOptions} from "angular2-masonry/src/masonry-options";
import {ArchiveEnum} from "../shared/enums";
import {ArchiveService} from "../archive.service";
import {EpisodeGridItemComponent} from "../episode-grid-item/episode-grid-item.component";

@Component({
    selector: 'app-play-grid',
    templateUrl: 'play-grid.component.html',
    styleUrls: ['./play-grid.component.scss', '../episode-grid-item/episode-grid-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PlayGridComponent extends LoadableComponent{

    @ViewChildren(EpisodeGridItemComponent) episodeGridItems: QueryList<EpisodeGridItemComponent>;

    private episodes;
    private hasMorePosts: boolean = true;
    private isInitialized: boolean = false;
    private masonryOptions: MasonryOptions;
    private args;

    constructor(private playService: PlayService,
                private archiveService: ArchiveService,
                loaderService: LoaderService) {
        super(loaderService);
    }

    private layoutComplete(event) {
        if (!this.episodeGridItems.dirty) {
            this.episodeGridItems.forEach(function (item) {
                item.truncate();
            });
        }
    }

    private hasMore(posts){
        if (posts.length < this.playService.getEpisodeBatchCount()) {
            this.hasMorePosts = false;
        }
    }

    private appendData() {
        if (!this.isInitialized) return;
        this.sub = this.playService.getNextBatchOfEpisodes(this.args).subscribe(
            episodes => {
                if (episodes.length <= 0) {
                    this.hasMorePosts = false;
                    return;
                }

                this.hasMore(episodes);
                this.episodes = this.episodes.concat(episodes);
            });
    }

    init() {
        this.archiveService.activate(ArchiveEnum.article);
        this.sub = this.playService.getEpisodes().subscribe(
            (episodes) => {
                this.episodes = episodes;
                if (episodes.length <= 0) {
                    this.hasMorePosts = false;
                }
                this.hasMore(episodes);
                this.isInitialized = true;
                this.loaded();
            }
        );

        this.masonryOptions = {
            transitionDuration: '0.3s',
            itemSelector: '.episode-grid-item',
            columnWidth: '.episode-grid-sizer',
            percentPosition: true
        };
    }
}
