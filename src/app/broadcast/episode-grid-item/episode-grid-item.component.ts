import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {Episode} from '../episode.interface';
import {MediaPlaylistService} from '../media-playlist.service';
import {MediaPlayerService} from '../media-player.service';

declare let $clamp: any;

@Component({
  selector: '.episode-grid-item',
  templateUrl: 'episode-grid-item.component.html',
  styleUrls: ['episode-grid-item.component.scss'],
})

export class EpisodeGridItemComponent implements AfterViewInit, OnInit {
  @Input() episode: Episode;

  private inQueue = false;

  constructor(private elementView: ElementRef,
              private mediaPlaylistService: MediaPlaylistService,
              private mediaPlayerService: MediaPlayerService) {
  }

  public play() {
    this.mediaPlayerService.load(this.episode);
  }

  public toggleQueue() {
    if (!this.inQueue) {
      this.mediaPlaylistService.enqueue(this.episode);
    } else {
      this.mediaPlaylistService.dequeue(this.episode);
    }
  }


  public truncate() {

    const container: HTMLElement = this.elementView.nativeElement.firstElementChild.firstElementChild;
    const episodeText: any = this.elementView.nativeElement.firstElementChild.firstElementChild
      .lastElementChild.lastElementChild.firstElementChild;
    const overlayPadding: number = parseInt(window.getComputedStyle(episodeText.parentElement).padding);
    const excerptMargin: number = parseInt(window.getComputedStyle(episodeText).marginBottom);

    const clampHeight: number = container.offsetHeight - overlayPadding * 2 - excerptMargin;
    $clamp(episodeText, {clamp: clampHeight + 'px'});
  }

  ngOnInit() {
    this.mediaPlaylistService.subjects.playlist.subscribe((queue) => {
      this.inQueue = queue.contains(this.episode, MediaPlaylistService.compare);
    });
  }

  ngAfterViewInit() {
    this.truncate();
  }
}

