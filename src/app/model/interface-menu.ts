export interface IMenuItem{
	name: string;
	url: string;
	items: IMenuList; // Allow items to create sub-menus
};

export interface IMenuList{
	[index: string]: IMenuItem;
};

export interface IMenu {
	[index: string]: IMenuList;
};