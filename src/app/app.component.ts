import {Component, HostBinding} from "@angular/core";
import {Angulartics2GoogleAnalytics} from 'angulartics2';
import {
    Event,
    Router,
    ActivatedRoute,
    NavigationEnd,
    NavigationStart,
    NavigationCancel,
    NavigationError
} from "@angular/router";

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @HostBinding('class') bodyRouterClass: string = 'start';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

        this.router.events.subscribe((event: Event) => {
            this.navigationInterceptor(event);
        });
    }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: Event): void {
        if (event instanceof NavigationStart) {
        }

        if (event instanceof NavigationEnd) {
            this.bodyRouterClass = this.getClass(this.activatedRoute.snapshot);
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
        }
        if (event instanceof NavigationError) {
        }
    }

    private getClass = (snapshot) => {
        if (!!snapshot && !!snapshot.children && (snapshot.children.length > 0)) {
            return this.getClass(snapshot.children[0]);
        }
        else if (!!snapshot.data && !!snapshot.data['name']) {
            return snapshot.data['name'];
        }
        else {
            return '';
        }
    }
}
