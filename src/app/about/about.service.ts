import {Injectable, Inject} from '@angular/core';
import {Page} from "../content/page.interface";
import {WordpressService} from "../content/wordpress.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AboutService {
  private ABOUT_ID: string = '8420';

  constructor(private WP: WordpressService) {}

	public getAboutPage(): Observable<Page[]> {
        let WPObservable = this.WP.getPage(this.ABOUT_ID);
        return WPObservable;
    }
}
