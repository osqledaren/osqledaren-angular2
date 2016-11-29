import {Injectable, Inject} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Article} from './model/article';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ContentService} from "./model/content-service";
import {APP_CONFIG} from "./app.config";

@Injectable()
export class WordpressService extends ContentService{

    constructor(protected http: Http, @Inject(APP_CONFIG) config) {
        super();
        this.endpoint = config.wordpressEndpoint;
    }

    public getArticle() {

    }

    public getArticles(): Observable<Article[]> {

        return this.http.get(this.endpoint + '/posts')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let posts = <Article[]>[];

        for (let i in body) {

            posts.push(<Article>{
                type: 'text',
                byline: 'Osqledaren',
                priority: 1,
                headline: body[i].title.rendered,
                body_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt congue sed ut dui. Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis.'
            });
        }

        return posts || {};
    }


}