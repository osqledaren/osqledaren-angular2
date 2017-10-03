import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Podcast } from '../play';
import { PlayService } from '../../play.service';
import { TextOverflowEllipsisPipe } from '../text-overflow-ellipsis.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { Series } from '../series';
import { PlayHeaderCommunicationService } from '../../play-grid-header-communication.service';
import {Subscription} from "rxjs/Subscription";

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
    @ViewChild('episodeListMobile') episodeListMobile: any;
    @ViewChild('episodeList') episodeList: any;
    arrowInfo: string = "Visa avsnitt";
    private videoHighligher: Subscription;

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
    loadEpisode(index, event){
        this.playerRef.loadEpisode(index);
        let el = event.target.parentNode.parentNode;
        let container = el.parentNode;
        container.getElementsByClassName("selected")[0].className = "title";
        el.getElementsByClassName("title")[0].className = "title selected";
    }

    highlightVideo(index){
        console.log(index);
        this.episodeListMobile.nativeElement.getElementsByClassName('selected')[0].className = "title";
        this.episodeListMobile.nativeElement.children[index].getElementsByClassName("title")[0].className = "title selected";
        this.episodeList.nativeElement.getElementsByClassName('selected')[0].className = "title";
        this.episodeList.nativeElement.children[index].getElementsByClassName("title")[0].className = "title selected";
    }

    getClass(index){
        return index==0? 'title selected': 'title';
    }

    //Add an episode to the playlist
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

    toggleEpisodeList(e){
        if(this.episodeListMobile.nativeElement.style.maxHeight == "300px"){
            this.episodeListMobile.nativeElement.style.maxHeight = "0px";
            this.episodeListMobile.nativeElement.style.padding = "0";
            e.target.className = "fa fa-arrow-circle-down rotate0";
            this.arrowInfo = "Visa avsnitt";
        }else{
            this.episodeListMobile.nativeElement.style.maxHeight = "300px";
            this.episodeListMobile.nativeElement.style.padding = "20px 0px";
            e.target.className = "fa fa-arrow-circle-down rotate180";
            this.arrowInfo = "Gömma avsnitt";
        }
    }

    ngOnInit() {
        this.episodeListMobile.nativeElement.style.padding = "0";
        this.route.params.subscribe((params: Params) => {
            this.programTitle = params['program'];
            this.getEpisodesPerSeries(this.programTitle);
        });

        this.videoHighligher = this.playService.notifySingleSeriesObservable$.subscribe((index)=>{
            this.highlightVideo(index);
        });
    }

}
