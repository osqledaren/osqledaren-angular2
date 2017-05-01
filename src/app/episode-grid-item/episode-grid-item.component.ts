import {ElementRef, Component, Input, AfterViewInit} from "@angular/core";
import {Episode} from "../shared/interface/episode.interface";

declare let $clamp: any;

@Component({
    selector: '.episode-grid-item',
    templateUrl: 'episode-grid-item.component.html',
    styleUrls: ['./episode-grid-item.component.scss'],
})

export class EpisodeGridItemComponent implements AfterViewInit {
    @Input() episode: Episode;

    constructor(private elementView: ElementRef) {
    }

    public truncate() {

        let container = this.elementView.nativeElement.firstElementChild.firstElementChild;
        let episodeText = this.elementView.nativeElement.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild;
        let overlayPadding = parseInt(window.getComputedStyle(episodeText.parentElement).padding);
        let excerptMargin = parseInt(window.getComputedStyle(episodeText).marginBottom);

        console.log(episodeText);

        let clampHeight = container.offsetHeight - overlayPadding * 2 - excerptMargin;
        $clamp(episodeText, {clamp: clampHeight + 'px'});
    }

    ngAfterViewInit() {
        this.truncate();
    }
}

