import {Component, OnInit, OnDestroy} from "@angular/core";
import {NewsArticleService} from "../news-article.service";
import {ActivatedRoute} from "@angular/router";
import {IArticle} from "../model/interface-article";
import {ArchiveService} from "../archive.service";
import {Archive} from "../model/enums";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

    private sub: any;
    public article: IArticle;

    constructor(private NS: NewsArticleService, private route: ActivatedRoute, private searchService: ArchiveService) {
    }

    private initializeData() {
        let errorMessage;

        this.route.params
            .map(params => params['slug']).subscribe((slug) => {
            this.sub = this.NS.getArticle(slug).subscribe(
                posts => this.article = posts[0],
                error => errorMessage = <any> error);
        });

    }

    ngOnInit() {
        this.searchService.activate(Archive.article);
        this.initializeData();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
