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
  private podcasts = [];

  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService, wpPodcasts: PodcastService) {
    super(loaderService);
    this.wpPodcasts = wpPodcasts
  }

  fetchPodcasts(){
    this.wpPodcasts.getArticles({}).subscribe(
      (pod) => {        
        for(let p in pod){
          this.podcasts.push(pod[p])}
        },
      (err) => console.log(err))
      
  }

  get podcast(){     
      return this.podcasts
  }
  

  ngOnInit() {
    this.archiveService.activate(Archive.article);
    this.fetchPodcasts()
    this.loaded()
  }
  
}
