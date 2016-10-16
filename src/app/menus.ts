import {Menu, MenuItem} from './menu';

/**
 * Assigns constant menus for the application.
 * Contains a Main navigation and Secondary navigation.
 * @type {Menu}
 */
export const Menus: Menu = <Menu>{
	// Main navigation
	'main-nav': <MenuItem[]>[
		{
			'name': 'Nytt',
			'url': '#'
		},
		{
			'name': 'Play',
			'url': '#'
		},
		{
			'name': 'Pod',
			'url': '#'
		},
	],
	// Secondary navigation
	'secondary-nav': <MenuItem[]>[
		{
			'name': 'Annonsering',
			'url': '#'
		},
		{
			'name': 'Fysiska nummer',
			'url': '#'
		},
		{
			'name': 'Legacy',
			'url': '#'
		},
		{
			'name': 'Redaktionen',
			'url': '#'
		},
		{
			'name': 'Kontakt',
			'url': '#'
		}
	]
};