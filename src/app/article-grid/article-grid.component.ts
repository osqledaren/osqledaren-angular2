import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Article} from "../model/article";
import {MasonryOptions} from "angular2-masonry/src/masonry-options";
import {NewsArticleService} from "../news-article.service";

@Component({
    selector: 'app-article-grid',
    templateUrl: './article-grid.component.html',
    styleUrls: ['./article-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleGridComponent implements OnInit {

    public articles: Article[];
    public masonryOptions: MasonryOptions;

    constructor(private NS: NewsArticleService) {

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

    private initializeData(){
        let errorMessage;

        this.NS.getArticles().subscribe(
            posts => this.articles = posts,
            error => errorMessage = <any> error);

        this.masonryOptions = {
            transitionDuration: '0.8s',
            itemSelector: '.article-grid-item',
            columnWidth: '.article-grid-sizer',
            percentPosition: true
        };
    }

    ngOnInit() {
        this.initializeData();
    }

}
