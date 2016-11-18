/**
 * Contains menu components
 */

export interface MenuItem{
	name: string;
	url: string;
	items: MenuList; // Allow items to create sub-menus
};

export interface MenuList{
	[index: string]: MenuItem;
};

export interface Menu {
	[index: string]: MenuList;
};