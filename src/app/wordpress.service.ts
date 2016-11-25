import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Article} from './model/article';
import {APP_CONFIG} from './app.config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressService {

  private endpoint;

  constructor(private http: Http, @Inject(APP_CONFIG) config) {
    this.endpoint = config.wordpressEndpoint;
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get(this.endpoint + '/posts')
        .map(this.extractData)
        .catch(this.handleError);
  }

  public getArticle() {

  }

  private extractData(res: Response){
    let body = res.json();
    let posts = <Article[]>[];

    for (let i in body){

      posts.push(<Article>{
        type: 'text',
        byline: 'Osqledaren',
        urgency: 1,
        headline: body[i].title.rendered,
        body_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt congue sed ut dui. Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis.'
      });
    }

    return posts || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = '${error.status} - ${error.statusText || ""} ${err}';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
