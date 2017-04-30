import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Podcast } from '../play';
import { PlayService } from '../../play.service';
import { TextOverflowEllipsisPipe } from '../text-overflow-ellipsis.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { Series } from '../series';
import {LoaderService} from "../../loader.service";

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
    videoMetaData: Podcast;
    episodesOnstage: Podcast[] = [];
    latestEpisodes: Podcast[] = [];
    searchResults: Podcast[] = [];
    featuredEpisodes: Podcast[] = [];
    weeklyTopEpisodes: Podcast[] = [];
    series: Series[];
    @ViewChild('playerRef') playerRef: VideoPlayerComponent;
    searchTerm: string;
    actualTypeTitle: string = "Senaste Nytt";
    displayLatestEpisodes: boolean = true;
    displaySeries: boolean = false;
    displaySearchResults: boolean = false;
    displayFeaturedEpisodes: boolean = false;
    displayWeeklyTopEpisodes: boolean = false;
    @ViewChild('gridContainer') gridContainer: ElementRef;
    @ViewChild('filterMenu') filterMenu: ElementRef;
    @ViewChild('searchBarElement') searchBarElement: ElementRef;
    @ViewChild('typeTitleElement') typeTitleElement: ElementRef;
    @ViewChild('searchButtonElement') searchButtonElement: ElementRef;
    private loaded: boolean = false;
    searchTermText: string = "";
    emptyInput: boolean = true;
    matchTerm: string = "";
    isExistMore_latestEpisodes: boolean = false;
    isExistMore_featuredEpisodes: boolean = false;
    isExistMore_weeklyTopEpisodes: boolean = false;
    isExistMore_searchResults: boolean = false;
    noResults: boolean = false;

    constructor(private playService: PlayService, private router: Router, private renderer: Renderer, private loaderService: LoaderService) { }

    //Retrieve play-grid-old latest episodes
    //After first retrieval, it retrieves subsequent episodes by specifying the date of the last episode from previously retrieved data
    getLatestEpisodes(){
        let lastPostDate = null;
        if(this.latestEpisodes.length){
            lastPostDate = this.latestEpisodes[this.latestEpisodes.length-1].date;
        }
        this.playService
            .getLatestEpisodes(lastPostDate)
            .subscribe(res => {
                if(res.length - (this.playService.count_perPage-1) > 0){
                    this.isExistMore_latestEpisodes = true;
                    res = res.slice(0, res.length-1);
                }else{
                    this.isExistMore_latestEpisodes = false;
                }
                this.latestEpisodes = this.latestEpisodes.concat(res);
                this.episodesOnstage = this.latestEpisodes;
                if(!this.videoMetaData){
                    this.videoMetaData = res[0];
                }
                this.loaded = true;
            });
    }

    //Get the featured episodes
    //After first retrieval, it retrieves subsequent episodes by specifying the date of the last episode from previously retrieved data
    getFeaturedEpisodes(){
        let lastPostDate = null;
        if(this.featuredEpisodes.length){
            lastPostDate = this.featuredEpisodes[this.featuredEpisodes.length-1].date;
        }
        this.playService
            .getLatestEpisodes(lastPostDate)
            .subscribe(res => {
                if(res.length - (this.playService.count_perPage-1) > 0){
                    this.isExistMore_featuredEpisodes = true;
                    res = res.slice(0, res.length-1);
                }else{
                    this.isExistMore_featuredEpisodes = false;
                }
                this.featuredEpisodes = this.featuredEpisodes.concat(res);
                this.episodesOnstage = this.featuredEpisodes;
                if(!this.videoMetaData){
                    this.videoMetaData = res[0];
                }
                this.loaded = true;
            });
    }

    //Get the weekly top episodes
    //After first retrieval, it retrieves subsequent episodes by specifying the date of the last episode from previously retrieved data
    getWeeklyTopEpisodes(){
        let lastPostDate = null;
        if(this.weeklyTopEpisodes.length){
            lastPostDate = this.weeklyTopEpisodes[this.weeklyTopEpisodes.length-1].date;
        }
        this.playService
            .getLatestEpisodes(lastPostDate)
            .subscribe(res => {
                if(res.length - (this.playService.count_perPage-1) > 0){
                    this.isExistMore_weeklyTopEpisodes = true;
                    res = res.slice(0, res.length-1);
                }else{
                    this.isExistMore_weeklyTopEpisodes = false;
                }
                this.weeklyTopEpisodes = this.weeklyTopEpisodes.concat(res);
                this.episodesOnstage = this.weeklyTopEpisodes;
                if(!this.videoMetaData){
                    this.videoMetaData = res[0];
                }
                this.loaded = true;
            });
    }

    //Get series
    getSeriesPerPage(){
        this.playService
            .getSeriesPerPage()
            .subscribe(res => {
                this.series = res;
                this.loaded = true;
            });
    }

    //Go to single series page
    goToSingleProgram(program){
        this.router.navigate(["play-grid-old/"+program]);
    }

    //Load/change the video on stage
    loadEpisode(index){
        this.playerRef.loadEpisode(index);
    }

    //Hide all the search results container
    hideAllResultViews(){
        this.displayLatestEpisodes = false;
        this.displaySeries = false;
        this.displaySearchResults = false;
        this.displayFeaturedEpisodes = false;
        this.displayWeeklyTopEpisodes = false;
    }

    //Refresh the results container, display the retrieved data
    getEpisodes(type, e){
        e.preventDefault();
        if(this.displaySearchResults){
            this.searchBarElement.nativeElement.style.backgroundColor = "#e8e8e8";
            this.typeTitleElement.nativeElement.style.color = "#e67233";
            this.searchButtonElement.nativeElement.style.color = "#e67233";
        }
        this.loaded = false;
        let selectedEl = this.filterMenu.nativeElement.getElementsByClassName("selected");
        if(typeof selectedEl[0] !== "undefined"){
            selectedEl[0].className = "";
        }
        e.target.className = "selected";
        this.searchTermText = "";
        let container = this.gridContainer.nativeElement;
        if(type == "Senaste"){
            container.style.backgroundColor = "white";
            this.hideAllResultViews();
            this.displayLatestEpisodes = true;
            if(!this.latestEpisodes.length){
                this.getLatestEpisodes();
            }else{
                this.episodesOnstage = this.latestEpisodes;
                this.loaded = true;
            }
            this.actualTypeTitle = "Senaste Nytt";
        }else if(type == "Serier"){
            container.style.backgroundColor = "#646464";
            this.hideAllResultViews();
            this.displaySeries = true;
            this.getSeriesPerPage();
            this.actualTypeTitle = "Serier A-Ö";
        }else if(type == "Rampljuset"){
            container.style.backgroundColor = "white";
            this.hideAllResultViews();
            this.displayFeaturedEpisodes = true;
            if(!this.featuredEpisodes.length){
                this.getFeaturedEpisodes();
            }else{
                this.episodesOnstage = this.featuredEpisodes;
                this.loaded = true;
            }
            this.actualTypeTitle = "Rampljuset";
        }else if(type == "Topp"){
            container.style.backgroundColor = "white";
            this.hideAllResultViews();
            this.displayWeeklyTopEpisodes = true;
            if(!this.weeklyTopEpisodes.length){
                this.getWeeklyTopEpisodes();
            }else{
                this.episodesOnstage = this.weeklyTopEpisodes;
                this.loaded = true;
            }
            this.actualTypeTitle = "Veckans Topp";
        }

    }

    //Search episodes and display the results
    searchPlay(e){
        e.preventDefault();
        this.loaded = false;
        if(this.searchTerm){
            this.matchTerm = this.searchTerm;
            this.loaded = false;
            let selectedEl = this.filterMenu.nativeElement.getElementsByClassName("selected");
            if(typeof selectedEl[0] !== "undefined"){
                selectedEl[0].className = "";
            }
            this.gridContainer.nativeElement.style.backgroundColor = "white";
            this.hideAllResultViews();
            this.displaySearchResults = true;
            this.actualTypeTitle = "Sökresultat efter ";
            this.searchTermText = '"'+this.searchTerm+'"';
            this.searchBarElement.nativeElement.style.backgroundColor = "#8bb5bf";
            this.typeTitleElement.nativeElement.style.color = "#ececec";
            this.searchButtonElement.nativeElement.style.color = "white";
            this.searchItems("search");
        }
    }

    //Search and retrieve the results from wordpress
    searchItems(arg){
        let lastPostDate = null;
        if(this.searchResults.length && arg == "getMore"){
            lastPostDate = this.searchResults[this.searchResults.length-1].date;
        }
        this.playService.search(this.searchTerm, lastPostDate).subscribe(res => {
            if(res.length - (this.playService.count_perPage-1) > 0){
                this.isExistMore_searchResults = true;
                res = res.slice(0, res.length-1);
            }else{
                this.isExistMore_searchResults = false;
            }
            if(arg == "getMore"){
                this.searchResults = this.searchResults.concat(res);
            }else{
                this.searchResults = res;
            }
            if(res.length > 0){
                this.noResults = false;
            }else{
                this.noResults = true;
            }
            this.episodesOnstage = this.searchResults;
            if(!this.videoMetaData){
                this.videoMetaData = res[0];
            }
            this.loaded = true;
        });
    }

    //Toggle the "X" button in the search input field
    toggleCleanFieldBtn(){
        if(this.searchTerm != ""){
            this.emptyInput = false;
        }else{
            this.emptyInput = true;
        }
    }

    //Clean the search input field
    cleanInputField(){
        this.searchTerm = "";
        this.toggleCleanFieldBtn();
    }

    //Retrieve more data
    getMore(){
        this.loaded = false;
        if(this.displayLatestEpisodes){
            this.getLatestEpisodes();
        }else if(this.displayFeaturedEpisodes){
            this.getFeaturedEpisodes();
        }else if(this.displayWeeklyTopEpisodes){
            this.getWeeklyTopEpisodes();
        }else if(this.displaySearchResults){
            this.searchItems("getMore");
        }
    }

    ngOnInit() {
        this.getLatestEpisodes();
    }

}
