/**
 * Main JS file for Chopstick behaviours
 */
 
 /* globals jQuery, document */
(function($) {
    "use strict";
		
		// social media links
		function socialmedia() {
			if ($('#social-share').length) {
				
				// YouTube
				if( cp_youtube.length > 0 ) {
					$('#youtube-page').html('<a href=" '+ cp_youtube +' " class="youtube-share" target="_blank"><i class="fa fa-youtube"></i></a>');
					$( '#youtube-page' ).removeClass( "hidden" );
				} else {
					$( '#youtube-page' ).addClass( "hidden" );
				}
				
				// Instagram
				if( cp_instagram.length > 0 ) {
					$('#instagram-page').html('<a href=" '+ cp_instagram +' " class="instagram-share" target="_blank"><i class="fa fa-instagram"></i></a>');
					$( '#instagram-page' ).removeClass( "hidden" );
				} else {
					$( '#instagram-page' ).addClass( "hidden" );
				}
				
				// Twitter
				if( cp_twitter.length > 0 ) {
					$('#twitter-page').html('<a href=" '+ cp_twitter +' " class="twitter-share" target="_blank"><i class="fa fa-twitter"></i></a>');
					$( '#twitter-page' ).removeClass( "hidden" );
				} else {
					$( '#twitter-page' ).addClass( "hidden" );
				}
				
				// Google+
				if( cp_googleplus.length > 0 ) {
					$('#googleplus-page').html('<a href=" '+ cp_googleplus +' " class="googleplus-share" target="_blank"><i class="fa fa-google-plus"></i></a>');
					$( '#googleplus-page' ).removeClass( "hidden" );
				} else {
					$( '#googleplus-page' ).addClass( "hidden" );
				}
				
				// Facebook
				if( cp_facebook.length > 0 ) {
					$('#facebook-page').html('<a href=" '+ cp_facebook +' " class="facebook-share" target="_blank"><i class="fa fa-facebook"></i></a>');
					$( '#facebook-page' ).removeClass( "hidden" );
				} else {
					$( '#facebook-page' ).addClass( "hidden" );
				}
				
				
			}
		}
		
		//smooth scrolling and scroll to top
		function cpScroll() {
			$('a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
		
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 2000);
						return false;
					}
				}
			});
			
			$(window).scroll(function(){
				if ($(this).scrollTop() > 1000) {
					$('#ScrollToTop').fadeIn();
				} else {
					$('#ScrollToTop').fadeOut();
				}
			});
			
			//Click event to scroll to top
			$('#ScrollToTop').click(function(){
				$('html, body').animate({scrollTop : 0},2000);
				return false;
			});
		}
		
		// facebook page plugin
        function facebook() {
			if ($('#fb-widget').length) {
				var facebook_sdk_script = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
				var fb_page = '<div class="fb-page" data-href="'+fb_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore">Facebook</div></div>';
				$('body').append(facebook_sdk_script);
				$('#fb-widget').append(fb_page);
				$("#fb-widget").fitVids();
				}
		}
		
		function disqus() {
			 /* * * CONFIGURATION VARIABLES * * */
			var disqus_shortname = disqus_shortname;
			
			/* * * DON'T EDIT BELOW THIS LINE * * */
			(function () {
				var s = document.createElement('script'); s.async = true;
				s.type = 'text/javascript';
				s.src = '//' + disqus_shortname + '.disqus.com/count.js';
				(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
			}());
		}
		
		// initialize search
		$(".cp-search").on("keyup", function () {
			if($('.cp-search').val().length > 0) {
				$('.cp-post-search').addClass('search-results-active');
			}
			else {
				$('.cp-post-search').removeClass('search-results-active'); 
			}
		});
		
		$(".cp-search").on("focusin", function () {
			if($('.cp-search').val().length > 0) {
				$('.cp-search').keyup();
			}
		});
		
		$(document).click(function(event) { 
			if(!$(event.target).closest('.cp-post-search').length) {
				$('.cp-post-search').removeClass('search-results-active');
			}        
		});
		
		$(".cp-search-icon").on("click", function() {
			$(".cp-search").focus();
		});
		
		$("#search-field").ghostHunter({
			results : "#search-results",
			zeroResultsInfo : true,
			info_template   : "<p class='sr-heading'>Number of posts found: {{amount}}</p>",
			result_template : "<p><a href='{{link}}'> {{title}}</a></p>",
			onKeyUp : true,
		});
		
				
		$(document).ready(function() {
			socialmedia();
			cpScroll();
			facebook();
			disqus();
			
			// Fitvids
			$(".post-content").fitVids();
			
		});
    
})(jQuery);

 
