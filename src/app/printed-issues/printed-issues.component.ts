import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-printed-issues',
  templateUrl: './printed-issues.component.html',
  styleUrls: ['./printed-issues.component.scss']
})
export class PrintedIssuesComponent implements OnInit {
  itemImages1617: Array<string>;
  itemImages1516: Array<string>;

  constructor() {
  	this.itemImages1617 = ["https://image.isu.pub/141128232153-067219625361f694a356d3f961e7d8c8/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140124165731-785470d503d489ce164a152fa35f3a21/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140521081054-bf53cb66629fdd3e741f6c547b6e4020/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140325134913-911b2a5b633355bbbfb14807d3a1e93a/jpg/page_1_thumb_large.jpg"];

  	this.itemImages1516 = ["https://image.isu.pub/141128232153-067219625361f694a356d3f961e7d8c8/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140124165731-785470d503d489ce164a152fa35f3a21/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140521081054-bf53cb66629fdd3e741f6c547b6e4020/jpg/page_1_thumb_large.jpg",
  		"https://image.isu.pub/140325134913-911b2a5b633355bbbfb14807d3a1e93a/jpg/page_1_thumb_large.jpg"];
  }

  ngOnInit() {
  	let article_grid: any = $('.print-grid-container');
	//initializing isotope
	article_grid.imagesLoaded( function() {
	  	// init Isotope after all images have loaded
		article_grid.isotope({
			itemSelector: '.print-grid-item',
			percentPosition: true,
			masonry: {
			  	// use element for size control
				columnWidth: '.print-grid-sizer'
			}
		})
	});
  }

}
