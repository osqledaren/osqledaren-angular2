import {Component, OnInit, HostListener, ElementRef, OnDestroy} from "@angular/core";
import {IMenuList} from "../shared/interface/menu.interface";
import {NavigationService} from "../navigation.service";
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public mainMenu: IMenuList;
    public secondaryMenu: IMenuList;
    public isCollapsed: boolean = true;
    private visible = true;
    private lastScrollPos = 0;
    private autoCloseTimer: Subscription;
    private autoCloseTime: number = 0;
    private inside: boolean;

    constructor(private navigation: NavigationService, private elementRef: ElementRef) {
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

    private mouseOver() {
        this.inside = true;
    }

    private mouseLeave(){
        this.inside = false;
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

        /*if (!this.isCollapsed) {

            let time: number = 0;

            this.autoCloseTimer = Observable.timer(0, 1000).subscribe(
                () => {
                    if(!this.inside && this.autoCloseTime > 3){
                        this.ToggleSubMenu();
                    } else {
                        this.autoCloseTime += 1;
                    }
                }
            );
        } else {
            this.autoCloseTimer = new Subscription;
            this.autoCloseTime = 0;
        }*/
    }

    ngOnInit() {
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
        this.autoCloseTimer.unsubscribe();
    }

}
