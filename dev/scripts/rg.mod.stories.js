/* global moment */
/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	$.pollster.defaults.api = '/election-2014-general/data/stories.json';
	$.pollster.defaults.seconds = 180; // 3 mins.
	$.pollster.defaults.type = 'json';
	
	$.each($('.stories'), function(n, y) {
		
		var $that = $(this);
		var items;
		
		if ($that.attr('data-subcats')) {
			
			items = ($that.attr('data-items') ? ( + $that.data('items')) : 10);
			
			$.pollster({
				target: $that.attr('id'),
				params: 'items=' + items + '&subcats=' + encodeURIComponent($that.data('subcats')),
				callback: function($data, $options) {
					
					var $this = $(this);
					var template = [];
					
					$.each($data.stories, function(i, v) {
						
						template.push([
							'<article class="story">',
								'<time>' + moment(v.published).twitterShort() + '</time>',
								'<h6>' + v.category + '</h6>',
								'<h4><a href="' + v.server + v.path + '" target="_blank">' + v.headline + '</a></h4>',
								(v.deck) && ('<h5 class="sh5">' + v.deck + '</h5>'),
							'</article>'
						].join('\n'));
						
					});
					
					$this
						.removeClass('loading')
						.html(template);
					
				}
			});
			
		}
		
	});
	
}); // RG
