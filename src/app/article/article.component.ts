import {Component, OnInit, OnDestroy} from "@angular/core";
import {NewsArticleService} from "../news-article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../shared/interface/article.interface";
import {ArchiveService} from "../archive.service";
import {Archive} from "../shared/enums";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";
import {BylineComponent} from "../byline/byline.component";
import {isNullOrUndefined} from "util";
import {ArticleQueryParams} from "../shared/interface/article-query-params.interface";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends LoadableComponent {

    public article: Article;
    public relatedArticles: Object[] = [];
    private showRelated: boolean = false;
    private args: ArticleQueryParams;

    constructor(private NS: NewsArticleService,
                private route: ActivatedRoute,
                private router: Router,
                private archiveService: ArchiveService,
                loaderService: LoaderService) {
        super(loaderService);
    }

    private initializeData() {
        let errorMessage;

        this.route.params
            .map(params => params['slug']).subscribe((slug) => {
            this.sub = this.NS.getArticle(slug).subscribe(
                posts => {
                    this.article = posts[0];
                    // Clearing variables
                    this.args = <ArticleQueryParams>{};
                    this.relatedArticles = [];
                    this.showRelated = false;
                    
                    setTimeout(()=>this.checkQuoteElement());
                    if (isNullOrUndefined(posts[0])) {
                        this.router.navigate(['404']);
                    }

                    this.loaded();

                    // If this article has related posts defined
                    if (posts[0].related_posts != undefined) {    
                        
                        for (let i=0; i< posts[0].related_posts.length; i++) {
  
                            this.NS.getArticle(posts[0].related_posts[i].post_name).subscribe(
                                related_post => {
                                    this.relatedArticles.push(related_post[0]);
                                    console.log(this.relatedArticles);
                                }
                            )
                            this.showRelated = true;    
                        }
                        
                        
                    } else {

                        // Randomizes which category we look at for related posts
                        if ( posts[0].categoriesById.length>0) {
                            let randomCat = this.getRandomInt(0, posts[0].categoriesById.length-1)
                            this.args.category = posts[0].categoriesById[randomCat];
                        }
                        
                        this.NS.getArticles(this.args).subscribe(
                            posts => {
                                let usedNumbers = [];
                                let randomNum;
                                // Grabs three randem related articles from the same category as the original post
                                for (let j=0; j<3; j++) {
                                    randomNum = this.getRandomInt(0,11);
                                    
                                    // If we have used this number, find another
                                    while(usedNumbers.indexOf(randomNum) > -1 ) {
                                        randomNum = this.getRandomInt(0,11);
                                        
                                    }
                                    usedNumbers.push(randomNum);
                                    this.relatedArticles.push(posts[randomNum]);
                                }

                                if (this.relatedArticles.length == 0) {
                                    this.showRelated = false;
                                }

                            },
                            error => errorMessage = <any> error);

                        this.showRelated = true;


                    }
                    

                },
                error => {
                    errorMessage = <any> error
                });
        });

    }

    //Check if there are qoutes in article and add qoute symbol if so.
    checkQuoteElement(){
        let d: any = document.getElementsByTagName("blockquote");
        
        for(let i=0; i < d.length; i++){
            //Create quote symbol element
            let e: any = document.createElement('i');
            let classAtt: any = document.createAttribute("class");
            classAtt.value = "fa fa-quote-right";
            e.setAttributeNode(classAtt);
            let ariaAtt: any = document.createAttribute("aria-hidden");
            ariaAtt.value = "true";
            e.setAttributeNode(ariaAtt);
            d[i].insertBefore(e, d[i].firstChild);
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    init() {
        this.archiveService.activate(Archive.article);
        this.initializeData();
    }
}
