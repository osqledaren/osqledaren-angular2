var $article_grid = $('.print-grid-container');
//initializing isotope
$article_grid.imagesLoaded( function() {
  	// init Isotope after all images have loaded
	$article_grid.isotope({
		itemSelector: '.print-grid-item',
		percentPosition: true,
		masonry: {
		  	// use element for size control
			columnWidth: '.print-grid-sizer'
		}
	})
});




