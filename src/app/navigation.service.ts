import {Injectable} from '@angular/core';
import {Menus} from './mock/menus';
import {IMenu, IMenuList} from "./model/interface-menu";

@Injectable()
export class NavigationService {

	constructor() {
	}

	public getAllNavs(): IMenu {
		return Menus;
	}

	public getNav(name: string): IMenuList{
		return Menus[name];
	}

}
