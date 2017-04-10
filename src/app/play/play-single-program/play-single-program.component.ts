import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Podcast } from '../play';
import { PlayService } from '../../play.service';
import { TextOverflowEllipsisPipe } from '../text-overflow-ellipsis.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { Series } from '../series';
import { PlayHeaderCommunicationService } from '../../play-header-communication.service';

@Component({
    selector: 'app-play-single-program',
    templateUrl: './play-single-program.component.html',
    styleUrls: ['./play-single-program.component.scss']
})
export class PlaySingleProgramComponent implements OnInit {
    programTitle: string;
    videoMetaData: Podcast;
    episodes: Podcast[];
    @ViewChild('playerRef') playerRef: VideoPlayerComponent;

    constructor(private router: Router, private route: ActivatedRoute, private playService: PlayService, private playHeaderCommunicationService: PlayHeaderCommunicationService) { }

    //Get episodes of a series
    getEpisodesPerSeries(series_slug){
        this.playService
            .getEpisodesPerSeries(series_slug)
            .subscribe(res => {
                this.episodes = res;
                this.videoMetaData = res[0];
            });
    }

    //Load the episode into the player
    //that has "index" in the array episodes.
    loadEpisode(index){
        this.playerRef.loadEpisode(index);
    }

    //Add an episode to the queue
    addToQueue(index, event){
        let queue = this.playService.getEpisodesInQueue();
        let isExistInQueue: boolean = false;
        if(queue){
            for(let i = 0; i<queue.length; i++){
                if(queue[i].id == this.episodes[index].id){
                    isExistInQueue = true;
                }
            }
        }
        let div = event.target.parentNode.lastElementChild;
        div.style.padding = "10px";
        div.style.fontSize = "0.875rem";
        if(!isExistInQueue){
            this.playService.addEpisodesToQueue(this.episodes[index]);
            div.innerHTML = "Avsnittet har lagts till i kön.";
            this.playHeaderCommunicationService.updateHeaderQueue();
        }else{
            div.style.backgroundColor = "#4c1c01";
            div.innerHTML = "Avsnittet finns redan i kön!";
        }
        setTimeout(function () {
            event.target.parentNode.lastElementChild.style.padding = "0";
            event.target.parentNode.lastElementChild.style.fontSize = "0";
        }, 1500);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.programTitle = params['program'];
            this.getEpisodesPerSeries(this.programTitle);
        });
    }

}
