import {Component, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Router} from '@angular/router';
import { Podcast } from '../play';
import { PlayService } from '../../play.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-play-queue',
  templateUrl: './play-queue.component.html',
  styleUrls: ['./play-queue.component.scss']
})
export class PlayQueueComponent implements AfterViewInit  {
  episodes: Podcast[];
  videoOnStage: Podcast;
  @ViewChild('playerRef') playerRef: VideoPlayerComponent;
  playerHidden: boolean = true;
  isEmptyQueue: boolean = true;
  @ViewChild('queue') queue: ElementRef;
  @ViewChild('episodeInfo') episodeInfo: ElementRef;
  @ViewChild('description') description: ElementRef;
  queueStyle: any;
  episodeInfoStyle: any;
  descriptionStyle: any;

  constructor(private router: Router, private playService: PlayService) { }

  //Load the episode into the player, and display the player
  loadEpisode(index){
    if(this.playerHidden){
      this.playerHidden = false;
    }
    this.playerRef.loadEpisode(index);
    if(this.queueStyle.marginTop != "0"){
      this.queueStyle.marginTop = "0";
      this.descriptionStyle.marginLeft = "100%";
      let self = this;
      self.episodeInfoStyle.marginTop = "0";
      setTimeout(function () {
        self.descriptionStyle.display = "none";
      }, 500);
    }
  }

  ngAfterViewInit () {
    this.episodes = this.playService.getEpisodesInQueue();
    this.videoOnStage = this.episodes[0];
    this.queueStyle = this.queue.nativeElement.style;
    this.episodeInfoStyle = this.episodeInfo.nativeElement.style;
    this.descriptionStyle = this.description.nativeElement.style;
    //Adjust the layout
    if(this.episodes.length > 0){
      this.isEmptyQueue = false;
      this.queueStyle.marginTop = "-31%";
      this.episodeInfoStyle.marginTop = "-31%";
    }else{
      this.isEmptyQueue = true;
      this.queueStyle.marginTop = "0";
      this.episodeInfoStyle.marginTop = "0";
    }
  }

}
