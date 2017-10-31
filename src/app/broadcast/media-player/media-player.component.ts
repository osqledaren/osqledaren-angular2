import {Component, OnInit} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {MediaPlaylistService} from '../media-playlist.service';
import {MediaPlayerService} from '../media-player.service';
import {Episode} from '../episode.interface';

interface MediaPlayableElement {
  source: string;
  type: string;
}

@Component({
  selector: 'app-media-player',
  templateUrl: 'media-player.component.html',
  styleUrls: ['media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  private mediaElements: MediaPlayableElement[];
  private current: Episode;
  private buffer;

  constructor(private playlistService: MediaPlaylistService, private playerService: MediaPlayerService) {
  }

  onPlayerReady(api: VgAPI) {
    this.playerService.api = api;
  }

  ngOnInit() {

    // Load default broadcast mediaService
    this.mediaElements = new Array<MediaPlayableElement>({
      source: null,
      type: null
    });

    // Listen for broadcast mediaService load event
    this.listen();

    // Listen for player end event
    // this.listenEnd();
  }

  private listen() {
    this.playerService.current.subscribe(
      (episode: Episode) => {

        this.current = episode;

        // Pause player
        this.playerService.api.pause();

        // Load broadcast mediaService
        this.mediaElements = new Array<MediaPlayableElement>({
          source: episode.media.url,
          type: 'video/mp4'
        });

        // Rewind to start
        this.playerService.api.getDefaultMedia().currentTime = 0;

        // Play broadcast mediaService once loaded
        this.playOnceLoaded();
      }
    );
  }

  /**
   * Loads next item in playlist if current mediaService has been fully played.
   * Triggers final event if playlist is empty.
   */
  private listenEnd() {
    this.playerService.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (this.playlistService.isEmpty()) {
        return;
      }
      this.playerService.load(this.playlistService.pop());
    });
  }

  /**
   * Plays mediaService once loaded
   */
  private playOnceLoaded() {
    this.buffer = this.playerService.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.playerService.api.play();
      this.buffer.unsubscribe();
    });
  }

}
