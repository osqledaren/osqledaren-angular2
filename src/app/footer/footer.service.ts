import {Injectable, Inject} from '@angular/core';
import {Page} from "../content/page.interface";
import {WordpressService} from "../content/wordpress.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FooterService {
  private FOOTER_ID: string = '16393';

  constructor(private WP: WordpressService) {}

	public getFooterPage(): Observable<Page[]> {
        let WPObservable = this.WP.getPage(this.FOOTER_ID);
        return WPObservable;
    }
}
