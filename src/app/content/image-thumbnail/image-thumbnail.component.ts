import {Component, Input} from '@angular/core';
import {Rendition} from '../rendition.interface';

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: 'image-thumbnail.component.html',
  styleUrls: ['image-thumbnail.component.scss']
})
export class ImageThumbnailComponent {

  @Input() renditions: { [id: string]: Rendition };

  constructor() {
  }

  public href(): string {
    try {
      return this.renditions['thumbnail'].href;
    } catch (Exception) {
      return undefined;
    }
  }

  public title(): string {
    try {
      return this.renditions['thumbnail'].title;
    } catch (Exception) {
      return '';
    }
  }

}
