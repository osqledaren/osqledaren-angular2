import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuList} from "../model/menu";
import {NavigationService} from "../navigation.service";
import {HeaderSubmenuComponent} from "../header-submenu/header-submenu.component";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@ViewChild(HeaderSubmenuComponent)
	private child: HeaderSubmenuComponent;

	public mainMenu: MenuList;
	public secondaryMenu: MenuList;
	public isCollapsed: boolean = true;

	constructor(private navigation: NavigationService) {
		this.mainMenu = navigation.getNav('main-nav');
		this.secondaryMenu = navigation.getNav('secondary-nav');
	}

	ngOnInit() {
		//this.child.notifyMe();
	}

}
