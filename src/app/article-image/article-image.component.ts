import {Component, OnInit, Input} from '@angular/core';
import {Rendition} from "../shared/interface/rendition.interface";

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss']
})
export class ArticleImageComponent {

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
