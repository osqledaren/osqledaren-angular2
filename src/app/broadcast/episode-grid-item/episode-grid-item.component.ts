import {ElementRef, Component, Input, AfterViewInit, OnInit} from "@angular/core";
import {Episode} from "../episode.interface";
import {MediaPlaylistService} from "../media-playlist.service";
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
                private mediaPlaylistService: MediaPlaylistService,
                private mediaPlayerService: MediaPlayerService) {}

    public play(){
        this.mediaPlayerService.load(this.episode);
    }

    public toggleQueue(){
        if(!this.inQueue) {
            this.mediaPlaylistService.enqueue(this.episode);
        } else {
            this.mediaPlaylistService.dequeue(this.episode);
        }
    }


    public truncate() {

        let container: HTMLElement = this.elementView.nativeElement.firstElementChild.firstElementChild;
        let episodeText: any = this.elementView.nativeElement.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild;
        let overlayPadding: number = parseInt(window.getComputedStyle(episodeText.parentElement).padding);
        let excerptMargin: number = parseInt(window.getComputedStyle(episodeText).marginBottom);

        let clampHeight: number = container.offsetHeight - overlayPadding * 2 - excerptMargin;
        $clamp(episodeText, {clamp: clampHeight + 'px'});
    }

    ngOnInit() {
        this.mediaPlaylistService.subjects.playlist.subscribe((queue) => {
            let q: LinkedList<Episode> = queue;
            this.inQueue = q.contains(this.episode, MediaPlaylistService.compare);
        });
    }

    ngAfterViewInit() {
        this.truncate();
    }
}

