import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	providers: [NavigationService]
})
export class FooterComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
