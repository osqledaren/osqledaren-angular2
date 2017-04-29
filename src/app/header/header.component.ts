import {Component, OnInit, HostListener, ElementRef, OnDestroy} from "@angular/core";
import {IMenuList} from "../shared/interface/menu.interface";
import {NavigationService} from "../navigation.service";
import "rxjs/add/operator/throttleTime";
import "rxjs/add/observable/fromEvent";
import {Observable, Subscription} from "rxjs";
import {ArchiveService} from "../archive.service";
import {ArchiveType} from "../shared/enums";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public mainMenu: IMenuList;
    public secondaryMenu: IMenuList;
    public isCollapsed: boolean = true;
    public archive: string;
    private filterActive;
    private visible = true;
    private lastScrollPos = 0;
    private autoCloseTimer: Subscription;
    private inside: boolean;
    private sub: Subscription;
    private displayPlayQueue: boolean = false;
    public numberOfEpisodes: number;
    private queueUpdater: Subscription;

    constructor(private router: Router,
                private navigation: NavigationService,
                private archiveService: ArchiveService,
                private elementRef: ElementRef) {
        this.mainMenu = navigation.getNav('main-nav');
        this.secondaryMenu = navigation.getNav('secondary-nav');
    }

    @HostListener('document:click', ['$event.target'])
    private onClick(targetElement) {
        let clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.isCollapsed = true;
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (!isNullOrUndefined(this.autoCloseTimer))
            this.autoCloseTimer.unsubscribe();
    }

    @HostListener('mouseleave') onMouseLeave() {

        this.autoCloseTimer = Observable.timer(3000).subscribe(
            () => {
                this.isCollapsed = true;
            }
        );
    }

    private hideMenu() {
        this.visible = false;
        this.isCollapsed = true;
    }

    private showMenu() {
        this.visible = true;
        this.isCollapsed = this.visible && !this.isCollapsed ? false : true;
    }

    private ToggleSubMenu() {
        this.isCollapsed = !this.isCollapsed;
    }

    public reset() {
        this.router.navigate(['/nyheter']);
        this.archiveService.reset();
    }

    ngOnInit() {

        this.sub = this.archiveService.activated.subscribe(
            (activated) => {
                this.visible = activated;
            }
        );

        this.sub = this.archiveService.archive.subscribe(
            (activeArchive) => {

                let type: string;

                switch (activeArchive) {
                    case ArchiveType.article:
                        type = 'Webbarkiv';
                        break;
                    default:
                        type = ArchiveType[activeArchive].toLocaleUpperCase() + 'arkiv';
                        break;
                }

                this.archive = type;
            }
        );

        this.sub = this.archiveService.filterActive.subscribe(
            (active) => this.filterActive = active
        );

        // throttle scroll event
        Observable.fromEvent(window, 'scroll')
            .throttleTime(100)
            .subscribe(() => {
                let scrollTop = document.body.scrollTop;

                if (scrollTop < 100 || (scrollTop < this.lastScrollPos && scrollTop <= document.body.offsetHeight - window.outerHeight - 50)) {
                    this.showMenu();
                } else {
                    this.hideMenu();
                }

                this.lastScrollPos = scrollTop;
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.autoCloseTimer.unsubscribe();
    }

}
