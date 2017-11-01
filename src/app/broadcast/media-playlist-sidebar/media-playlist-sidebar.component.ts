import {Component, OnInit} from '@angular/core';
import {MediaPlaylistService} from '../media-playlist.service';
import {Episode} from '../episode.interface';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-media-playlist-sidebar',
  templateUrl: 'media-playlist-sidebar.component.html',
  styleUrls: ['media-playlist-sidebar.component.scss']
})
export class MediaPlaylistSidebarComponent implements OnInit {

  public queue: Episode[];
  public isVisible = false;

  constructor(private playlistService: MediaPlaylistService) {
  }

  public remove(item: Episode) {
    this.playlistService.dequeue(item);
  }

  ngOnInit() {
    this.playlistService.subjects.sidebarVisible.subscribe((visible) => {
      this.isVisible = visible;
    });


    this.playlistService.subjects.playlist.subscribe((playlist) => {
      this.queue = !isNullOrUndefined(playlist) ? playlist.toArray() : [];
    });
  }

}
