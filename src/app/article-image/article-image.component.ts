import {Component, OnInit, Input} from '@angular/core';
import {Rendition} from "../shared/interface/article.interface";

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss']
})
export class ArticleImageComponent {

  @Input() renditions: { [id:string] : Rendition};

  constructor() { }

  private href(): string{
    return this.renditions['large'].href;
  }

  private title(): string {
    return this.renditions['large'].title;
  }

}
