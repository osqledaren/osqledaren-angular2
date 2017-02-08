import {Component, OnInit} from '@angular/core';
import {IMenuList} from "../model/interface-menu";
import {NavigationService} from "../navigation.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public mainMenu: IMenuList;
	public secondaryMenu: IMenuList;
	public isCollapsed: boolean = true;

	constructor(private navigation: NavigationService) {
		this.mainMenu = navigation.getNav('main-nav');
		this.secondaryMenu = navigation.getNav('secondary-nav');
	}

	ngOnInit() {
	}

}
