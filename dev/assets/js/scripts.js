(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v2.5&appId=797543646932373";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

$(function() {
	$(".newsletter_signup_form").validationEngine({promptPosition : "topLeft"});

	$('.js-load-more-articles').on('click', function(e) {
		e.preventDefault()
		$('.articles_latest_article--hidden').removeClass('articles_latest_article--hidden');
		$(this).hide();
	});
});