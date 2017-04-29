import {Component, Input} from '@angular/core';
import {Byline} from "../shared/interface/byline.interface";

@Component({
    selector: 'app-byline',
    templateUrl: './byline.component.html',
    styleUrls: ['./byline.component.scss']
})
export class BylineComponent {
    @Input() byline: Array<Byline>;

    constructor() {
    }
}
