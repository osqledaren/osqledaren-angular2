import {Component, HostBinding, OnInit} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import {MediaPlaylistService} from './broadcast/media-playlist.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') bodyRouterClass: string;

  private bodyClasses: { [id: string]: string } = {};
  private getClass = (snapshot) => {
    if (!!snapshot && !!snapshot.children && (snapshot.children.length > 0)) {
      return this.getClass(snapshot.children[0]);
    } else if (!!snapshot.data && !!snapshot.data['name']) {
      return snapshot.data['name'];
    } else {
      return '';
    }
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private queueService: MediaPlaylistService,
              angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);

      this.queueService.subjects.sidebarVisible.subscribe((visible) => {
        this.bodyClasses['mediaQueue'] = visible ? 'media-playlist-sidebar-visible' : '';

        this.bodyRouterClass = '';

        for (const c in this.bodyClasses) {
          if (this.bodyClasses[c] !== '') {
            this.bodyRouterClass += ' ' + this.bodyClasses[c];
          }
        }

        this.bodyRouterClass = this.bodyRouterClass.slice(1); // Remove initial white-space
      })
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
    }

    if (event instanceof NavigationEnd) {
      this.bodyClasses['page'] = this.getClass(this.activatedRoute.snapshot);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
    }
    if (event instanceof NavigationError) {
    }
  }

  ngOnInit() {

  }
}
