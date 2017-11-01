import {Component, Input} from '@angular/core';
import {Rendition} from '../rendition.interface';

@Component({
  selector: 'app-image',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.scss']
})
export class ImageComponent {

  @Input() renditions: { [id: string]: Rendition };

  constructor() {
  }

  public href(): string {

    try {
      return this.renditions['large'].href;
    } catch (Exception) {
      return undefined;
    }
  }

  public title(): string {
    try {
      return this.renditions['large'].title;
    } catch (Exception) {
      return '';
    }
  }

}
