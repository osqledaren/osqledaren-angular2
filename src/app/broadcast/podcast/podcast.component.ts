import { Component, OnInit } from '@angular/core';
import { PodcastService} from '../podcast.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {
  constructor(ps: PodcastService) {
  }

  ngOnInit() {
  }

}
