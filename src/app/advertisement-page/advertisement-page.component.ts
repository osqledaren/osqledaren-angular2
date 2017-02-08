import { Component, OnInit } from '@angular/core';
import {ArchiveService} from "../archive.service";
import {Archive} from "../shared/enums";

@Component({
  selector: 'app-advertisement-page',
  templateUrl: './advertisement-page.component.html',
  styleUrls: ['./advertisement-page.component.scss']
})
export class AdvertisementPageComponent implements OnInit {
  covers: Array<string>;
  osqledaren_email: string;
  osqledaren_mobile: string;
  osqledaren_telephone: string;
  erik_tingstrom_email: string;
  erik_tingstrom_mobile: string;

  constructor(private archiveService: ArchiveService) {
  	this.covers = ["http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141502.jpg",
  			"http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141501.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141500.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131404.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131403.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131402.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131401.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131400.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121305.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121304.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121303.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121302.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121301.jpg",
	        "http://osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141502.jpg"];

	this.osqledaren_email = "osqledaren@ths.kth.se";
  	this.osqledaren_mobile = "08-790 98 70";
  	this.osqledaren_telephone = "070-790 98 70";

  	this.erik_tingstrom_email = "erik.tingstrom@newsfactory.se";
  	this.erik_tingstrom_mobile = "08-505 73 812";

  }

  ngOnInit() {
  	this.archiveService.activate(Archive.article);
  }

}
