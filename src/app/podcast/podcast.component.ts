import { Component, OnInit } from '@angular/core';
import {UILoadableComponent} from '../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../ui/ui-view-loader.service';
import {ArchiveService} from '../archive/archive.service';
import {Archive} from '../archive/archive.enum';
import {PodcastService} from './podcast.service';
import {PodcastQueryParams} from './podcast-query-params.interface'

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent extends UILoadableComponent {
  private wpPodcasts = null;
  private campusPod = [];
  private oldPod = [];
  private activeBtn = 'scampusBtn';

  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService, wpPodcasts: PodcastService) {
    super(loaderService);
    this.wpPodcasts = wpPodcasts
  }

  fetchPodcasts(){
    this.wpPodcasts.getArticles({}).subscribe(
      (pod) => {        
        for(let p in pod){
          if(pod[p].versioncreated < '2019-08-01'){
            this.oldPod.push(pod[p])
          }else{
            this.campusPod.push(pod[p])
          }
        }
      },
      (err) => console.log(err))
      
  }

  get podcast(){
    if(this.activeBtn == 'oldBtn'){
      return this.oldPod
    }else{
      return this.campusPod
    }     
  }

  get info(){
    if(this.activeBtn == 'oldBtn'){
      return {title: 'Tidigare poddar från OL', 
      description: `Här kan du lyssna på poddar som har producerats av OL tidigare år.
      Lyssna här eller sök på Osqledaren i din podcastspelare!`}
    }else{
      return {title: 'Campuspodden', 
      description: `Här kan du lyssna på Campuspodden som produceras av Osqledaren. 
      Podden tar upp lite olika saker om olika ting på KTH. 
      Lyssna här eller sök på Campuspodden i din podcastspelare!`}
    }   
    
  }

  switchBtn(btnClicked, btnToDeactivate){
    let deactivate = document.getElementById(btnToDeactivate)
    deactivate.classList.remove('active')
    
    let clicked = document.getElementById(btnClicked)
    clicked.classList.add('active')

    this.activeBtn = btnClicked
  }

  ngOnInit() {
    this.archiveService.activate(Archive.article);
    this.fetchPodcasts()
    this.loaded()
  }
  
}
