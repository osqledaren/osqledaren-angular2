import {Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, OnDestroy} from "@angular/core";
import {Article} from "../model/article";
import {MasonryOptions} from "angular2-masonry/src/masonry-options";
import {NewsArticleService} from "../news-article.service";
import {ArticleGridItemComponent} from "../article-grid-item/article-grid-item.component";

@Component({
    selector: 'app-article-grid',
    templateUrl: './article-grid.component.html',
    styleUrls: ['./article-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleGridComponent implements OnInit, OnDestroy {

    @ViewChildren(ArticleGridItemComponent) articleGridItems: QueryList<ArticleGridItemComponent>;

    public articles: Article[];
    public masonryOptions: MasonryOptions;
    public hasMorePosts: boolean = true;
    public isInitialized: boolean = false;
    private sub: any;
    private initialBatchSize: number;

    constructor(private NS: NewsArticleService) {
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

        this.sub = this.NS.getArticles().subscribe(
            posts => {
                this.articles = posts;
                this.initialBatchSize = posts.length;
                this.isInitialized = true;
                console.log(this.articles);
            },
            error => errorMessage = <any> error);

        this.masonryOptions = {
            transitionDuration: '0.5s',
            itemSelector: '.article-grid-item',
            columnWidth: '.article-grid-sizer',
            percentPosition: true
        };
    }

    private appendData() {
        let errorMessage;

        if (!this.isInitialized) return;

        this.sub = this.NS.getNextBatchOfArticles().subscribe(
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

    ngOnInit() {
        this.initializeData();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
