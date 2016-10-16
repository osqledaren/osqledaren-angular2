import {Injectable} from '@angular/core';
import {Menu, MenuItem} from './menu';
import {Menus} from './menus';

@Injectable()
export class NavigationService {

	constructor() {
	}

	public getAllNavs(): Menu {
		return Menus;
	}

	public getNav(name: string): MenuItem[]{
		return Menus[name];
	}

}
