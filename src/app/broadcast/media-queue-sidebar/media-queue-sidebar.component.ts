import { Component, OnInit } from '@angular/core';
import {MediaQueueService} from "../media-queue.service";
import {Episode} from "../episode.interface";
import {isNullOrUndefined} from "util";
import LinkedList from "typescript-collections/dist/lib/LinkedList";

@Component({
  selector: 'app-media-queue-sidebar',
  templateUrl: 'media-queue-sidebar.component.html',
  styleUrls: ['media-queue-sidebar.component.scss']
})
export class MediaQueueSidebarComponent implements OnInit {

  private isVisible: boolean = false;
  public queue: Episode[];

  constructor(private queueService: MediaQueueService) { }

  public remove(item: Episode){
    this.queueService.dequeue(item);
  }

  ngOnInit() {
    this.queueService.subjects.sidebarVisible.subscribe((visible)=>{
      this.isVisible = visible;
    });


    this.queueService.subjects.queue.subscribe((queue)=>{
        this.queue = !isNullOrUndefined(queue) ? queue.toArray() : [];
    });
  }

}
