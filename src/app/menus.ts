import {Menu, MenuList, MenuItem} from './menu';

/**
 * Assigns constant menus for the application.
 * Contains a Main navigation and Secondary navigation.
 * @type {Menu}
 */
export const Menus: Menu = <Menu>{
	// Main navigation
	'main-nav': <MenuList>{
		'nytt': <MenuItem>{
			name: 'Nytt',
			url: '#'
		},
		'play': <MenuItem>{
			name: 'Play',
			url: '#'
		},
		'podcast': <MenuItem>{
			name: 'Podcast',
			url: '#'
		}
	},
	// Secondary navigation
	'secondary-nav': <MenuList>{
		'annonsering': <MenuItem>{
			name: 'Annonsering',
			url: '#'
		},
		'fysiska-nummer': <MenuItem>{
			name: 'Fysiska nummer',
			url: '#'
		},
		'legacy': <MenuItem>{
			name: 'Legacy',
			url: '#'
		},
		'redaktionen': <MenuItem>{
			name: 'Redaktionen',
			url: '#'
		},
		'kontakt': <MenuItem>{
			name: 'Kontakt',
			url: '#'
		}
	}
};