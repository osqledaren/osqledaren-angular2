import {Component, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Router} from '@angular/router';
import { Podcast } from '../play';
import { PlayService } from '../../play.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import {Subscription} from "rxjs/Subscription";

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
  @ViewChild('queueGrid') queueGrid: ElementRef;
  @ViewChild('videoList') videoList: ElementRef;
  queueStyle: any;
  episodeInfoStyle: any;
  descriptionStyle: any;
  queueGridStyle: any;
  private videoHighligher: Subscription;

  constructor(private router: Router, private playService: PlayService) { }

  //Load the episode into the player, and display the player
  loadEpisode(index, event){
    if(this.playerHidden){
      this.playerHidden = false;
    }
    this.playerRef.loadEpisode(index);
    this.queue.nativeElement.getElementsByClassName("selected")[0].className = "title";
    event.target.parentNode.parentNode.getElementsByClassName("title")[0].className = "title selected";
    if(this.queueGridStyle.marginTop != "10px"){
      this.queueGridStyle.marginTop = "0";
      this.descriptionStyle.marginLeft = "100%";
      let self = this;
      self.episodeInfoStyle.marginTop = "0";
      setTimeout(function () {
        self.descriptionStyle.display = "none";
      }, 500);
    }
  }

  getClass(index){
    return index==0? 'title selected': 'title';
  }

  highlightVideo(index){
    console.log(index);
    this.videoList.nativeElement.getElementsByClassName('selected')[0].className = "title";
    this.videoList.nativeElement.children[index].getElementsByClassName("title")[0].className = "title selected";
  }

  ngAfterViewInit () {
    this.episodes = this.playService.getEpisodesInQueue();
    this.videoOnStage = this.episodes[0];
    this.queueStyle = this.queue.nativeElement.style;
    this.episodeInfoStyle = this.episodeInfo.nativeElement.style;
    this.descriptionStyle = this.description.nativeElement.style;
    this.queueGridStyle = this.queueGrid.nativeElement.style;
    //Adjust the layout
    if(this.episodes.length > 0){
      this.isEmptyQueue = false;
    }else{
      this.isEmptyQueue = true;
      this.queueGridStyle.marginTop = "10px";
    }

    this.videoHighligher = this.playService.notifyQueueObservable$.subscribe((index)=>{
      this.highlightVideo(index);
    });
  }

}
