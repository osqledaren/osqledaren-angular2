import { Component, OnInit } from '@angular/core';
import {MediaQueueService} from "../media-queue.service";

@Component({
  selector: 'app-media-queue-sidebar',
  templateUrl: './media-queue-sidebar.component.html',
  styleUrls: ['./media-queue-sidebar.component.scss']
})
export class MediaQueueSidebarComponent implements OnInit {

  private isVisible: boolean = false;

  constructor(private queueService: MediaQueueService) { }

  ngOnInit() {
    this.queueService.sidebarVisible.subscribe((visible)=>{
      this.isVisible = visible;
    });
  }

}
