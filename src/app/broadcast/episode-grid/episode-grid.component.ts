import {Component, Host, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MasonryOptions} from 'angular2-masonry/src/masonry-options';
import {EpisodeGridItemComponent} from '../episode-grid-item/episode-grid-item.component';
import {MediaContentService} from '../abstract.media-content.service';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {BroadcastLoaderService} from '../broadcast-loader.service';

@Component({
  selector: 'app-episode-grid',
  templateUrl: 'episode-grid.component.html',
  styleUrls: ['episode-grid.component.scss', '../episode-grid-item/episode-grid-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EpisodeGridComponent extends UILoadableComponent {

  @ViewChildren(EpisodeGridItemComponent) episodeGridItems: QueryList<EpisodeGridItemComponent>;

  public episodes;
  public hasMorePosts = true;
  public isInitialized = false;
  public masonryOptions: MasonryOptions;
  private args;

  // Accepts implemented abstract service
  constructor(@Host() private mediaService: MediaContentService,
              loaderService: BroadcastLoaderService) {
    super(loaderService);
  }

  init() {
    this.sub = this.mediaService.getEpisodes().subscribe(
      (episodes) => {
        this.episodes = episodes;
        if (episodes.length <= 0) {
          this.hasMorePosts = false;
        }
        this.hasMore(episodes);
        this.isInitialized = true;
        this.mediaService.initialized.next(true);
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

  public layoutComplete(event) {
    if (!this.episodeGridItems.dirty) {
      this.episodeGridItems.forEach(function (item) {
        item.truncate();
      });
    }
  }

  public hasMore(posts) {
    if (posts.length < this.mediaService.getEpisodeBatchCount()) {
      this.hasMorePosts = false;
    }
  }

  public appendData() {
    if (!this.isInitialized) {
      return;
    }
    this.sub = this.mediaService.getNextBatchOfEpisodes(this.args).subscribe(
      episodes => {
        if (episodes.length <= 0) {
          this.hasMorePosts = false;
          return;
        }

        this.hasMore(episodes);
        this.episodes = this.episodes.concat(episodes);
      });
  }
}
