$(function() {
	$(".newsletter_signup_form").validationEngine({promptPosition : "topLeft"});

	$('.js-load-more-articles').on('click', function(e) {
		e.preventDefault()
		$('.articles_latest_article--hidden').removeClass('articles_latest_article--hidden');
		$(this).hide();
	});
});

var fontA = new FontFaceObserver( "Roboto Slab" );
var fontB = new FontFaceObserver( "Open Sans" );

Promise
    .all([fontA.check()])
    .then(function(){
        document.documentElement.className += "fonts-loaded";
        console.log
    });