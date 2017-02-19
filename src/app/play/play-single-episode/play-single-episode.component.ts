import { Component, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-play-single-episode',
  templateUrl: './play-single-episode.component.html',
  styleUrls: ['./play-single-episode.component.scss']
})
export class PlaySingleEpisodeComponent implements OnInit {
  videoMetaData: any;
  videoOnStage: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
