import {Component, OnInit, Input} from '@angular/core';
import {Rendition} from "../shared/interface/rendition.interface";

@Component({
  selector: 'app-article-image-thumbnail',
  templateUrl: './article-image-thumbnail.component.html',
  styleUrls: ['./article-image-thumbnail.component.scss']
})
export class ArticleImageThumbnailComponent {

  @Input() renditions: { [id:string] : Rendition};

  constructor() { }

  private href(): string{
    try {
      return this.renditions['thumbnail'].href;
    } catch (Exception){
      return undefined;
    }
  }

  private title(): string {
    try {
      return this.renditions['thumbnail'].title;
    } catch (Exception){
      return '';
    }
  }

}
