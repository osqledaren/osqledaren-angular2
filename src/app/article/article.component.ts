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

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends LoadableComponent {

    public article: Article;
    public relatedArticles: Object[] = [];
    private showRelated: boolean = false;

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
                    
                    setTimeout(()=>this.checkQuoteElement());
                    if (isNullOrUndefined(posts[0])) {
                        this.router.navigate(['404']);
                    }

                    this.loaded();

                    // If this article has related posts
                    if (posts[0].related_posts != undefined) {    
                        this.showRelated = true;
                        for (let i=0; i< posts[0].related_posts.length; i++) {
                            //this.relatedArticles.push(posts[0].related_posts[i]);
                            
                            if(this.relatedArticles.length==0) {
                                this.NS.getArticle(posts[0].related_posts[i].post_name).subscribe(
                                related_post => {
                                    this.relatedArticles.push(related_post[0]);
                                }
                            )
                            }
                            
                        }
                        
                        
                    } else {
                        this.showRelated = false;
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

    init() {
        this.archiveService.activate(Archive.article);
        this.initializeData();
    }
}
