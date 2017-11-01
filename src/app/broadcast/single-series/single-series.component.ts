import {Component, Host, OnInit} from '@angular/core';
import {Series} from '../series.interface';
import {SeriesComponent} from '../series/series.component';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {

  public series: Array<Series>;

  constructor(@Host() private seriesParent: SeriesComponent) {
  }

  ngOnInit() {
    this.series = this.seriesParent.series;
  }

}
