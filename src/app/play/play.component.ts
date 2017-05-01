import { Component, OnInit } from '@angular/core';
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent extends LoadableComponent {

  constructor(loaderService: LoaderService) {
    super(loaderService);
  }

  init (){
    this.loaded();
  }
}
