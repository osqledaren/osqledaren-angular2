import { Component, OnInit } from '@angular/core';
import {MediaQueueService} from "../media-queue.service";

@Component({
  selector: 'app-media-queue',
  templateUrl: './media-queue.component.html',
  styleUrls: ['./media-queue.component.scss']
})
export class MediaQueueComponent implements OnInit {
  private queueCount: number;

  constructor(private mediaQueue: MediaQueueService) { }

  ngOnInit() {
    this.mediaQueue.queue.subscribe((queue)=>{
      this.queueCount = queue.items.length;
    })
  }

}
