import {Component, HostBinding, OnInit} from "@angular/core";
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
import {MediaQueueService} from "./broadcast/media-queue.service";

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @HostBinding('class') bodyRouterClass: string;

    private bodyClasses: {[id:string]: string} = {};

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private queueService: MediaQueueService,
                angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

        this.router.events.subscribe((event: Event) => {
            this.navigationInterceptor(event);

            this.queueService.subjects.sidebarVisible.subscribe((visible) =>{
                this.bodyClasses['mediaQueue'] = visible ? 'media-queue-sidebar-visible' : '';

                this.bodyRouterClass = '';

                for(let c in this.bodyClasses){
                    if(this.bodyClasses[c] !== ''){
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

    ngOnInit(){

    }
}
