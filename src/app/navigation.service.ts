import {Injectable} from '@angular/core';
import {Menu, MenuList} from './model/menu';
import {Menus} from './mock/menus';

@Injectable()
export class NavigationService {

	constructor() {
	}

	public getAllNavs(): Menu {
		return Menus;
	}

	public getNav(name: string): MenuList{
		return Menus[name];
	}

}
