/**
 * Contains menu components
 */

export interface MenuItem{
	name: string;
	url: string;
	items: MenuItem[]; // Allow items to create sub-menus
};

export interface Menu {
	[index: string]: MenuItem[];
};