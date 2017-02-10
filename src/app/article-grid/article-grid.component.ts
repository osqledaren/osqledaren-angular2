import {Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, OnDestroy} from "@angular/core";
import {Article} from "../shared/interface/article.interface";
import {MasonryOptions} from "angular2-masonry/src/masonry-options";
import {NewsArticleService} from "../news-article.service";
import {ArticleGridItemComponent} from "../article-grid-item/article-grid-item.component";
import {ActivatedRoute} from "@angular/router";
import {ArticleQueryParams} from "../shared/interface/article-query-params.interface";
import {isNullOrUndefined} from "util";
import {PadNumberPipe} from "../pad-number.pipe";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";

@Component({
    selector: 'app-article-grid',
    templateUrl: './article-grid.component.html',
    styleUrls: ['./article-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleGridComponent extends LoadableComponent {

    @ViewChildren(ArticleGridItemComponent) articleGridItems: QueryList<ArticleGridItemComponent>;

    public articles: Article[];
    public masonryOptions: MasonryOptions;
    public hasMorePosts: boolean = true;
    public isInitialized: boolean = false;
    public heading;
    private initialBatchSize: number = 12;
    private args: ArticleQueryParams;

    constructor(private NS: NewsArticleService,
                private route: ActivatedRoute,
                loaderService: LoaderService) {
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

    private layoutComplete(event) {

        if (!this.articleGridItems.dirty) {
            this.articleGridItems.forEach(function (item) {
                item.truncate();
            });
        }
    }

    private initializeData() {
        let errorMessage;

        this.sub = this.route.params.subscribe(params => {

            if (params) {

                let date = null;

                this.args = <ArticleQueryParams>{};

                if (params.hasOwnProperty('searchTerm')) {
                    this.args.searchTerm = params['searchTerm'];
                }
                if (params.hasOwnProperty('date')) {
                    this.args.date = params['date'];

                    let dO = new Date(params['date']);
                    date = dO.getFullYear();
                    date += '-' + new PadNumberPipe().transform(dO.getMonth() +1, 2);
                    date += '-01';

                }

                if (!isNullOrUndefined(params['date']) && isNullOrUndefined(params['searchTerm'])) {
                    this.heading = 'Arkiv från <span>' + date + '</span>';
                } else if (isNullOrUndefined(date) && !isNullOrUndefined(params['searchTerm'])) {
                    this.heading = 'Sökresultat för <span>' + params['searchTerm'] + '</span>';
                } else if (!isNullOrUndefined(date) && !isNullOrUndefined(params['searchTerm'])){
                    this.heading = 'Sökresultat för <span>' + params['searchTerm'] + '</span> från <span>' + date + '</span>';
                } else {
                    this.heading = 'Nyheter';
                }

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

            this.masonryOptions = {
                transitionDuration: '0.5s',
                itemSelector: '.article-grid-item',
                columnWidth: '.article-grid-sizer',
                percentPosition: true
            };

        });
    }

    private appendData() {
        let errorMessage;

        if (!this.isInitialized) return;

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

    init() {
        this.initializeData();
    }
}
