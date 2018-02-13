import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector   : 'app-printed-issues-grid',
  templateUrl: 'printed-issues-grid.component.html',
  styleUrls  : ['printed-issues-grid.component.scss']
})
export class PrintedIssuesGridComponent implements OnInit {
  @Input() stack;

  constructor() {
  }

  ngOnInit() {
  }

}
