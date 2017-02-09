import {Injectable} from '@angular/core';
import {Menus} from './shared/mock/menus';
import {IMenu, IMenuList} from "./shared/interface/menu.interface";

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
