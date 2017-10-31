import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {ArchiveService} from '../archive/archive.service';
import {Archive} from '../archive/archive.enum';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isCollapsed = true;
  public archive: string;
  private filterActive;
  private visible = true;
  private lastScrollPos = 0;
  private autoCloseTimer: Subscription;
  private sub: Subscription;

  constructor(private router: Router,
              private archiveService: ArchiveService,
              private elementRef: ElementRef) {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!isNullOrUndefined(this.autoCloseTimer)) {
      this.autoCloseTimer.unsubscribe();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {

    this.autoCloseTimer = Observable.timer(3000).subscribe(
      () => {
        this.isCollapsed = true;
      }
    );
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
          case Archive.article:
            type = 'Webbarkiv';
            break;
          default:
            type = Archive[activeArchive].toLocaleUpperCase() + 'arkiv';
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
        const scrollTop = document.body.scrollTop;
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

  @HostListener('document:click', ['$event.target'])
  private onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
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
    this.isCollapsed = !(this.visible && !this.isCollapsed);
  }

  private ToggleSubMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

}
