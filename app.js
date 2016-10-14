var $article_grid = $('.article-grid-container');
//initializing isotope
$article_grid.imagesLoaded( function() {
  	// init Isotope after all images have loaded
	$article_grid.isotope({
		itemSelector: '.article-grid-item',
		percentPosition: true,
		masonry: {
		  	// use element for size control
			columnWidth: '.article-grid-sizer'
		}
	})
});




