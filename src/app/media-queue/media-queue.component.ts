import { Component, OnInit } from '@angular/core';
import {PlayHeaderCommunicationService} from "../play-header-communication.service";
import {PlayService} from "../play.service";

@Component({
  selector: 'app-media-queue',
  templateUrl: './media-queue.component.html',
  styleUrls: ['./media-queue.component.scss']
})
export class MediaQueueComponent implements OnInit {
  private numberOfEpisodes: number;

  constructor(private playService: PlayService,
              private playHeaderCommunicationService: PlayHeaderCommunicationService) { }

  ngOnInit() {
  }

  public updateNumberInQueue() {
    this.numberOfEpisodes = this.playService.getEpisodesInQueue().length;
  }

}
