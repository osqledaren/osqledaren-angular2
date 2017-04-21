import {ArticleComponent} from "./article.component";
import {Component, Inject} from "@angular/core";
import {LoaderService} from "../loader.service";
import {ArchiveService} from "../archive.service";
import {Router, ActivatedRoute} from "@angular/router";
import {NewsArticleService} from "../news-article.service";
import {Archive} from "../shared/enums";
import {ArticleQueryParams} from "../shared/interface/article-query-params.interface";
import {WordpressAuthService} from "../wordpress-auth.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticlePreviewComponent extends ArticleComponent {

    private accessToken: string;
    private accessGranted: boolean = false;
    private errorMsg: string;

    constructor(NS: NewsArticleService,
                route: ActivatedRoute,
                router: Router,
                archiveService: ArchiveService,
                loaderService: LoaderService,
                private auth: WordpressAuthService) {
        super(NS, route, router, archiveService, loaderService);
    }

    private authenticatedRequest(queryParams) {

        if(isNullOrUndefined(queryParams['access_token'])){
            this.auth.authenticate(this.router.url);
            return;
        }

        try {
            let requestParams = <ArticleQueryParams>{
                access_token: queryParams['access_token']
            };
            this.initializeData(requestParams);
            this.accessGranted = true;
            return;

        } catch (Exception) {
            this.loaded();
            return;
        }
    }

    init() {
        this.archiveService.activate(Archive.article);
        this.route.queryParams.subscribe((qp) => this.authenticatedRequest(qp));
    }
}