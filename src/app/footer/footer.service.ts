import {Injectable, Inject} from '@angular/core';
import {Footer} from "./footer.interface";
import {WordpressService} from "../content/wordpress.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FooterService {
  private FOOTER_ID: string = '16393';

  constructor(private WP: WordpressService) {}

	public getFooterPage(): Observable<Footer[]> {
        let WPObservable = this.WP.getPage(this.FOOTER_ID);
        return WPObservable;
    }
}
