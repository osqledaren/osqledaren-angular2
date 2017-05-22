import {Component, OnInit, Host} from '@angular/core';
import {LoadableComponent} from "../../loader/abstract.loadable.component";
import {BroadcastLoaderService} from "../broadcast-loader.service";
import {MediaContentService} from "../abstract.media-content.service";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent extends LoadableComponent {

  private series;
  private hasMorePosts;
  private isInitialized;

  constructor(@Host() private mediaService: MediaContentService,
              loaderService: BroadcastLoaderService) {
    super(loaderService);
  }

  private hasMore(posts) {
    if (posts.length < this.mediaService.getSeriesBatchCount()) {
      this.hasMorePosts = false;
    }
  }

  private appendData() {
    if (!this.isInitialized) return;
    this.sub = this.mediaService.getNextBatchOfSeries().subscribe(
        series => {
          if (series.length <= 0) {
            this.hasMorePosts = false;
            return;
          }

          this.hasMore(series);
          this.series = this.series.concat(series);
        });
  }

  init() {
    this.sub = this.mediaService.getSeries().subscribe(
        (series) => {
          this.series = series;
          if (series.length <= 0) {
            this.hasMorePosts = false;
          }
          this.hasMore(series);
          this.isInitialized = true;
          this.mediaService.initialized.next(true);
          this.loaded();
        }
    );
  }

}
