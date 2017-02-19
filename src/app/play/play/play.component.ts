import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private router: Router) { }

  goToSingleProgram(program){
  	this.router.navigate(["play/"+program]);
  }

  ngOnInit() {
  }

}
