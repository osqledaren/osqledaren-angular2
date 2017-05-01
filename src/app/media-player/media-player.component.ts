import { Component, OnInit } from '@angular/core';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  preload: string = 'auto';
  api: VgAPI;

  constructor() {
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    //this.api.unregisterMedia();
    //this.api.registerMedia();
  }

  ngOnInit() {
  }

}