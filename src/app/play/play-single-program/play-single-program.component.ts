import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-play-single-program',
  templateUrl: './play-single-program.component.html',
  styleUrls: ['./play-single-program.component.scss']
})
export class PlaySingleProgramComponent implements OnInit {
  programTitle: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  goToEpisode(episode) {
    this.router.navigate(["play/"+this.programTitle+"/"+episode]);
  }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => {
  		this.programTitle = params['program'];
  	});
  }

}
