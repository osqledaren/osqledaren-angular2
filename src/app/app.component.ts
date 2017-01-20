import {Component, HostBinding} from "@angular/core";
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
    loading: boolean = true;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {

        this.router.events.subscribe((event: Event) => {
            this.navigationInterceptor(event);
        });
    }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: Event): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }

        if (event instanceof NavigationEnd) {
            this.bodyRouterClass = this.getClass(this.activatedRoute.snapshot);
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
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
