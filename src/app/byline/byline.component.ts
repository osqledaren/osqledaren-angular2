import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-byline',
  templateUrl: './byline.component.html',
  styleUrls: ['./byline.component.scss']
})
export class BylineComponent implements OnInit {
  author_text_img: string;
  author_text_name: string;

  author_photo_img: string;
  author_photo_name: string;

  constructor() { }

  ngOnInit() {
  	this.author_text_img = "http://3.bp.blogspot.com/-Rerlap0l1BQ/T5UkVIL-Z9I/AAAAAAAABa0/n2v7X--yVbU/s1600/beautiful+picture.jpg";
  	this.author_text_name = "Emma Klint";

  	this.author_photo_img = "http://images.freeimages.com/images/premium/previews/3202/32028464-beautiful-christmas-lantern.jpg";
  	this.author_photo_name = "Sofia Blomgren";
  }

}
