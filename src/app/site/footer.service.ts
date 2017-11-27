import {Injectable} from '@angular/core';
import {Page} from '../content/page.interface';
import {WordpressService} from '../content/wordpress.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FooterService {
  private FOOTER_SLUG = 'Footer';

  constructor(private WP: WordpressService) {}

  public getFooterPage(): Observable<Page[]> {
    const WPObservable = this.WP.getPage(this.FOOTER_SLUG);
    return WPObservable;
  }
}
