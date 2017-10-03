import {Component, OnInit, Input} from '@angular/core';
import {Rendition} from "../rendition.interface";

@Component({
  selector: 'app-image',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.scss']
})
export class ImageComponent {

  @Input() renditions: { [id:string] : Rendition};

  constructor() { }

  private href(): string{
    try {
      return this.renditions['large'].href;
    } catch (Exception){
      return undefined;
    }
  }

  private title(): string {
    try {
      return this.renditions['large'].title;
    } catch (Exception){
      return '';
    }
  }

}
