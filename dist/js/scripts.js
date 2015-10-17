$(function() {
	$(".newsletter_signup_form").validationEngine({promptPosition : "topLeft"});

	$('.js-load-more-articles').on('click', function(e) {
		e.preventDefault()
		$('.articles_latest_article--hidden').removeClass('articles_latest_article--hidden');
		$(this).hide();
	});
});