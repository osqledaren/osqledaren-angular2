import {Component, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MasonryOptions} from 'angular2-masonry/src/masonry-options';
import {NewsArticleService} from '../news-article.service';
import {ArticleGridItemComponent} from '../article-grid-item/article-grid-item.component';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {ArticleQueryParams} from '../article-query-params.interface';
import {Article} from '../article.interface';
import {ArchiveService} from '../../archive/archive.service';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {PadNumberPipe} from '../../shared/pad-number.pipe';

@Component({
  selector: 'app-article-grid',
  templateUrl: 'article-grid.component.html',
  styleUrls: ['article-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleGridComponent extends UILoadableComponent {

  @ViewChildren(ArticleGridItemComponent) articleGridItems: QueryList<ArticleGridItemComponent>;

  public articles: Article[];
  public masonryOptions: MasonryOptions;
  public hasMorePosts = true;
  public isInitialized = false;
  public heading;
  private initialBatchSize = 12;
  private args: ArticleQueryParams;

  constructor(private NS: NewsArticleService,
              private route: ActivatedRoute,
              private router: Router,
              private archiveService: ArchiveService,
              loaderService: UIViewLoaderService) {
    super(loaderService);
    this.articles = [];
  }


  elementSize(urgency: number): string {

    let size: string;

    switch (urgency) {
      case 9:
      case 8:
      case 7:
      case 6:
        size = 'brick-large';
        break;
      case 5:
        size = 'brick-medium';
        break;
      default:
        size = 'brick-small';
        break;
    }

    return size;
  }

  init() {
    this.initializeData();
  }

  public layoutComplete(event) {
    if (!this.articleGridItems.dirty) {
      this.articleGridItems.forEach(function (item) {
        item.truncate();
      });
    }
  }

  private validateDate(date: string) {
    const d0 = new Date(date);
    const msToday = new Date().getTime();
    const msd0 = d0.getTime();

    if (msToday - msd0 < 0 || msd0 === 0) {
      return false;
    }

    if (date.length > 4 && date.length <= 7) {

      const a = date.split('-');

      if (a.length !== 2) {
        return false;
      }

      if (a[0].length !== 4 && a[1].length !== 2) {
        return false;
      }

    } else if (date.length !== 4) {
      return false;
    }

    return true;
  }

  private initializeData() {
    let errorMessage;

    this.sub = this.route.params.subscribe(params => {

      this.heading = 'Nyheter';

      if (params && Object.keys(params).length !== 0) {

        let date = '';
        let endDate = '';

        this.args = <ArticleQueryParams>{};

        if (params.hasOwnProperty('searchTerm')) {
          this.args.searchTerm = params['searchTerm'];
        }

        if (params.hasOwnProperty('date')) {

          if (this.validateDate(params['date'])) {

            const d0 = new Date(params['date']);
            const d1 = new Date(d0);

            this.args.date = params['date'];

            date = d0.getFullYear().toString();
            date += '-' + new PadNumberPipe().transform(d0.getMonth() + 1, 2);
            date += '-01';

            if (this.args.date.length > 4) {
              d1.setMonth(d1.getMonth() + 1);
            } else {
              d1.setFullYear(d1.getFullYear() + 1);
            }

            endDate = d1.getFullYear().toString();
            endDate += '-' + new PadNumberPipe().transform(d1.getMonth() + 1, 2);
            endDate += '-01';
          } else {

            this.archiveService.reset();
            return this.router.navigate(['/404']);

          }
        }

        if (date !== '' && isNullOrUndefined(params['searchTerm'])) {
          this.heading = 'Arkiv från <span>' + date + '</span> ';
          this.heading += 'till <span>' + endDate + '</span> ';
        } else if (date === '' && !isNullOrUndefined(params['searchTerm'])) {
          this.heading = 'Sökresultat för <span>' + params['searchTerm'] + '</span>';
        } else if (date !== '' && !isNullOrUndefined(params['searchTerm'])) {
          this.heading = 'Sökresultat för <span>' + params['searchTerm'] + '</span> från <span>' + date + '</span> ';
          this.heading += 'till <span>' + endDate + '</span> ';
        }

      } else {
        this.archiveService.reset();
      }

      this.sub = this.NS.getArticles(this.args).subscribe(
        posts => {

          this.articles = posts;
          this.isInitialized = true;
          this.hasMorePosts = true;
          this.loaded();

          if (posts.length > 0) {
            if (posts.length < this.initialBatchSize) {
              this.hasMorePosts = false;
            }
          } else {
            this.hasMorePosts = false;
          }

        },
        error => errorMessage = <any> error);

      // Need to explicitely command archive service to apply filters if these are active in url params.
      // The service can't determine it by itself as this components route parameters are out of scope
      // for the service.
      this.sub = this.archiveService.distributions.subscribe(
        archiveDistribution => {
          if (params && Object.keys(params).length !== 0) {

            let year: number = null;
            let month: number = null;
            let searchTerm = '';

            if (params.hasOwnProperty('date')) {
              const d0 = new Date(params['date']);

              year = d0.getFullYear();
              year = archiveDistribution.containsKey(year) ? year : null;
              month = params['date'].length > 4 ? d0.getMonth() + 1 : null;

            }

            if (params.hasOwnProperty('searchTerm')) {
              searchTerm = params['searchTerm'];
            }

            Observable.timer(0).subscribe(
              () => {
                this.archiveService.applyFilter({year, month, searchTerm}, false);
              }
            );

          }
        }
      );

      this.masonryOptions = {
        transitionDuration: '0.3s',
        itemSelector: '.article-grid-item',
        columnWidth: '.article-grid-sizer',
        percentPosition: true
      };

    });
  }

  public appendData() {
    let errorMessage;

    if (!this.isInitialized) {
      return;
    }

    this.sub = this.NS.getNextBatchOfArticles(this.args).subscribe(
      posts => {
        if (posts.length > 0) {
          this.articles = this.articles.concat(posts);

          if (posts.length < this.initialBatchSize) {
            this.hasMorePosts = false;
          }

        } else {
          this.hasMorePosts = false;
        }
      },
      error => errorMessage = <any> error);
  }
}
