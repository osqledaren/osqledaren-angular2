import {Component, OnInit, HostListener, ElementRef} from "@angular/core";
import {IMenuList} from "../shared/interface/menu.interface";
import {NavigationService} from "../navigation.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public mainMenu: IMenuList;
    public secondaryMenu: IMenuList;
    public isCollapsed: boolean = true;
    private visible = true;
    private lastScrollPos = 0;

    constructor(private navigation: NavigationService, private elementRef: ElementRef) {
        this.mainMenu = navigation.getNav('main-nav');
        this.secondaryMenu = navigation.getNav('secondary-nav');
    }

    @HostListener('window:scroll', ['$event'])
    private onScroll(event) {
        let scrollTop = document.body.scrollTop;

        if (scrollTop < 100 || (scrollTop < this.lastScrollPos && scrollTop <= document.body.offsetHeight - window.outerHeight - 50)) {
            this.showMenu();
        } else {
            this.hideMenu();
        }

        this.lastScrollPos = scrollTop;
    }

    @HostListener('document:click', ['$event.target'])
    private onClick(targetElement) {
        let clickedInside = this.elementRef.nativeElement.contains(targetElement);
        let scrollTop = document.body.scrollTop;

        if (!clickedInside) {
            this.isCollapsed = true;
        }
    }

    private hideMenu() {
        this.visible = false;
        this.isCollapsed = true;
    }

    private showMenu() {
        this.visible = true;
        this.isCollapsed = this.visible && !this.isCollapsed ? false : true;
    }

    ngOnInit() {
    }

}
