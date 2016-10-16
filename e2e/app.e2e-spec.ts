import {OsqledarenSitePage} from './app.po';

describe('osqledaren-site App', function () {
	let page: OsqledarenSitePage;

	beforeEach(() => {
		page = new OsqledarenSitePage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
