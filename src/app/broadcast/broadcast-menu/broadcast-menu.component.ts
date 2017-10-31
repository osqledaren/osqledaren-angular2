import {Component, Host, OnInit} from '@angular/core';
import {MediaContentService} from '../abstract.media-content.service';

@Component({
  selector: 'app-broadcast-menu',
  templateUrl: './broadcast-menu.component.html',
  styleUrls: ['./broadcast-menu.component.scss']
})
export class BroadcastMenuComponent implements OnInit {

  private searchInput: string;

  constructor(@Host() private mediaService: MediaContentService) {
  }

  ngOnInit() {
  }

}
