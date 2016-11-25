import {Injectable} from '@angular/core';
import {Menus} from './mock/menus';
import {Menu, MenuList} from "./model/menu";

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
