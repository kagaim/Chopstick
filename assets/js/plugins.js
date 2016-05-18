/* Declare Editor's Pick */
var pluginApp = {

	getData:function(page, pppID, data) {
		var page = page || 1;
		var pppID = pppID || '';
		var data = data || [];
		var parent = this;
		var status = '';

		var FEED_URL = '/rss/' + page + '/';

		$.ajax({
			url: FEED_URL,
			type: 'get',
			success: function(parsedData) {
				var cppID = $(parsedData).find('item > guid').text();
				if(pppID != cppID || cppID != 'undefined') {
					$(parsedData).find('item').each(function(){
						data.push(this);
					});
					parent.getData(page+1, cppID, data);
				} else {
					parent.pluginAppPosts(data);
				}
			},
			complete: function(xhr) {
				console.log(xhr);
				if (xhr.status == 404){
					parent.pluginAppPosts(data);
				}
			}
		});
	},

	taggedPost:function(getdata, tag){
		var posts= [];
		$.each(getdata, function(index, value){
			var category = [];
			var categoryLowerCase = [];
			$(value).find('category').each(function(){
				category.push($(this).text());
				categoryLowerCase.push($(this).text().toLowerCase());
			});
			if (categoryLowerCase.indexOf(tag.toLowerCase()) >= 0) {
				posts.push({
				link: $(value).find('link').text(),
				title: $(value).find('title').text(),
				content: $(value).find('content\\:encoded, encoded').text(),
				category: $(value).find('category'),
				published_date: $(value).find('pubDate').text(),
				image_link : $(this).find('media\\:content, content').attr('url')
				});
			}
		});
		return posts;
	},

	pluginAppPosts: function(data){
		if($('#editors-pick').length && typeof editors_tag !== 'undefined' && typeof editors_tag_post_count !== 'undefined') {
			var filteredPosts = pluginApp.taggedPost(data, editors_tag);
			var string = '';
			if (filteredPosts.length > 0) {
				
				for(i = 0; i< filteredPosts.length ; i++) {
					if( i < editors_tag_post_count) {
						console.log(filteredPosts[i]);
						var title = filteredPosts[i].title;
						var link = filteredPosts[i].link;
						var image_link = filteredPosts[i].image_link;
						var category = filteredPosts[i].category;
						var ep_image = '';
						var category_link = '';
						if(typeof category!== 'undefined') {
							$.each(category, function(index, value) {
								var cat = $(value).text();
								var cat_link = cat.toLowerCase().replace(/ /g,"-");
								category_link += '<a href="/tag/'+cat_link+'/">'+cat+'</a>';
							});
						}
						if (typeof image_link !== 'undefined') {
							ep_image = '<div class="image-ep">\
									<a href="'+link+'" alt="'+title+'" title="'+title+'">\
										<img class="img-responsive" src="'+image_link+'" title="'+title+'" alt="'+title+'" />\
									</a>\
								</div>';
						} 
						string += '<!-- start post -->\
							<div class="ep-content" style="background-image: url('+image_link+');">\
							<article>\
								<div class="ep-content-overlay">\
									<h3><a href="'+link+'">'+title+'</a></h3>\
								</div>\
							</article>\
							</div>\
							<!-- end post -->';
					}
				}
				string += '</div></div>';
				$("#editors-pick").append(string);
			}
		}
	},

	formatDate: function(dt) {
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month+' '+date+','+' '+year;
		return formatted_dt;
	},
	
	mailchimp:function() {
		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		var form = $('#mc-embedded-subscribe-form');
		form.attr("action", mcform_url);
		var message = $('#message');
		var submit_button = $('mc-embedded-subscribe');
		form.submit(function(e){
			e.preventDefault();
			$('#mc-embedded-subscribe').attr('disabled','disabled');
			if($('#mce-EMAIL').val() != '' && IsEmail($('#mce-EMAIL').val())) {
				message.html('<div class="alert alert-warning" role="alert">Please wait...</div>').fadeIn(1000);
				var url=form.attr('action');
				if(url=='' || url=='YOUR_MAILCHIMP_WEB_FORM_URL_HERE') {
					alert('Please config your mailchimp form url for this widget');
					return false;
				}
				else{
					url=url.replace('?u=', '/post-json?u=').concat('&c=?');
					console.log(url);
					var data = {};
					var dataArray = form.serializeArray();
					$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
					});
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						dataType: 'json',
						success: function(response, text){
							if (response.result === 'success') {
								message.html("<div class=\"alert alert-success\" role=\"alert\">"+msg_success+"</div>").delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').val('');
							}
							else{
								message.html(response.result+ ": " + response.msg).delay(10000).fadeOut(500);
								console.log(response);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').focus().select();
							}
						},
						dataType: 'jsonp',
						error: function (response, text) {
							console.log('mailchimp ajax submit error: ' + text);
							$('#mc-embedded-subscribe').removeAttr('disabled');
							$('#mce-EMAIL').focus().select();
						}
					});
					return false;
				}
			}
			else {
				message.html('<div class="alert alert-danger" role="alert">Please provide a valid email</div>').fadeIn(1000);
				$('#mc-embedded-subscribe').removeAttr('disabled');
				$('#mce-EMAIL').focus().select();
			}            
		});
	},

	
	init:function(){
		pluginApp.getData();
		pluginApp.mailchimp();
	}
}

/* Initialize Editor's Pick */

$(document).ready(function(){
	pluginApp.init();
});