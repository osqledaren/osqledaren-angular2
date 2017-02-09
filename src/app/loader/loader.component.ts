import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../loader.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loaded: boolean = false;
  public hidden: boolean = false;
  public initialized: boolean = false;
  private timer;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {

    this.loaderService.loaded.subscribe(
        (loaded) => {
          this.loaded = loaded;
          this.hidden = false;

          this.timer = Observable.timer(300);

          // Delay removal of initialization state a short while.
          if (!this.initialized) {

            this.timer.subscribe(t => {
              this.initialized = true;
              this.hidden = loaded;
            });

          } else {

            this.timer.subscribe(t => {
              this.hidden = loaded;
            });

          }

        }
    );
  }
}
