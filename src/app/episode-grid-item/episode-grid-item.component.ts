import {ElementRef, Component, Input, AfterViewInit, OnInit} from "@angular/core";
import {Episode} from "../shared/interface/episode.interface";
import {MediaQueueService} from "../media-queue.service";
import {MediaPlayerService} from "../media-player.service";
import LinkedList from "typescript-collections/dist/lib/LinkedList";

declare let $clamp: any;

@Component({
    selector: '.episode-grid-item',
    templateUrl: 'episode-grid-item.component.html',
    styleUrls: ['episode-grid-item.component.scss'],
})

export class EpisodeGridItemComponent implements AfterViewInit, OnInit {
    @Input() episode: Episode;

    private inQueue: boolean = false;

    constructor(private elementView: ElementRef,
                private mediaQueueService: MediaQueueService,
                private mediaPlayerService: MediaPlayerService) {}

    public play(){

    }

    public toggleQueue(){
        if(!this.inQueue) {
            this.mediaQueueService.enqueue(this.episode);
        } else {
            this.mediaQueueService.dequeue(this.episode);
        }
    }


    public truncate() {

        let container = this.elementView.nativeElement.firstElementChild.firstElementChild;
        let episodeText = this.elementView.nativeElement.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild;
        let overlayPadding = parseInt(window.getComputedStyle(episodeText.parentElement).padding);
        let excerptMargin = parseInt(window.getComputedStyle(episodeText).marginBottom);

        let clampHeight = container.offsetHeight - overlayPadding * 2 - excerptMargin;
        $clamp(episodeText, {clamp: clampHeight + 'px'});
    }

    ngOnInit() {
        this.mediaQueueService.subjects.queue.subscribe((queue) => {
            let q: LinkedList<Episode> = queue;
            this.inQueue = q.contains(this.episode, MediaQueueService.compare);
        });
    }

    ngAfterViewInit() {
        this.truncate();
    }
}

