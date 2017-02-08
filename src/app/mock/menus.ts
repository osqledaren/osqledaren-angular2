import {IMenu, IMenuList, IMenuItem} from '../model/interface-menu';

/**
 * Assigns constant menus for the application.
 * Contains a Main navigation and Secondary navigation.
 * @type {IMenu}
 */
export const Menus: IMenu = <IMenu>{
	// Main navigation
	'main-nav': <IMenuList>{
		'nytt': <IMenuItem>{
			name: 'Nytt',
			url: '#'
		},
		'play': <IMenuItem>{
			name: 'Play',
			url: '#'
		},
		'podcast': <IMenuItem>{
			name: 'Podcast',
			url: '#'
		}
	},
	// Secondary navigation
	'secondary-nav': <IMenuList>{
		'annonsering': <IMenuItem>{
			name: 'Annonsering',
			url: '#'
		},
		'fysiska-nummer': <IMenuItem>{
			name: 'Fysiska nummer',
			url: '#'
		},
		'legacy': <IMenuItem>{
			name: 'Legacy',
			url: '#'
		},
		'redaktionen': <IMenuItem>{
			name: 'Redaktionen',
			url: '#'
		},
		'kontakt': <IMenuItem>{
			name: 'Kontakt',
			url: '#'
		}
	}
};