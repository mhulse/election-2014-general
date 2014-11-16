/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	var $timeout;
	
	// http://stackoverflow.com/a/5533262/922323
	var len = function(obj) {
		
		var l = 0;
		
		$.each(obj, function(i, elem) {
			
			l++;
			
		});
		
		return l;
		
	};
	
	$.pollster({
		target: 'parallax',
		api: 'data/electionssp.json',
		seconds: 360, // 6 mins.
		type: 'json',
		callback: function($data, $options) {
			
			// http://www.programming-free.com/2013/12/change-background-image-jquery.html
			var $this = $(this);
			var $images = [];
			var i = 0;
			
			// http://stackoverflow.com/a/3969579/922323
			window.clearTimeout($timeout);
			$timeout = 0;
			
			$.each($data, function(i, v) {
				
				$images.push({
					url: v.url,
					caption: v.caption,
					credit: v.credit,
					org: v.org
				});
				
			});
			
			//console.log($images);
			
			// Combine/merge previous image list with current:
			//var $images = $.extend(true, {}, $this.data('parallax'), $images);
			
			// Store image list for use in next call:
			//$this.data('parallax', $images);
			
			// Basic slideshow:
			(function timer() {
				
				// Load the image first:
				$('<img src="' + $images[i].url + '">')
					.imagesLoaded(function() {
						
						// Hide the current image:
						$this.fadeOut(1000, function() {
							
							// Caption?
							var template = ($images[i].caption) ? [
								'<span>',
									'<span>',
										$images[i].caption,
									'</span>',
									(($images[i].credit) && ('<br><span>' + $images[i].credit) + (($images[i].credit) && ('<br><span>/</span>' + $images[i].org)) + '</span>'),
								'</span>'
							].join('\n') : '';
							
							// Link?
							if ($images[i].link) {
								
								// Yup, then hot it up:
								$this.attr('href', $images[i].link);
								
							} else {
								
								// Nope, so might as well remove it:
								$this.removeAttr('href');
								
							}
							
							// Update caption and show new image:
							$this
								.html(template)
								.css('background-image', 'url(' + $images[i].url +')')
								.fadeIn(1000);
							
							i++;
							
							// Start from beginning?
							if (i == len($images)) {
								
								i = 0; // Yes.
								
							}
							
							// Rinse, wash and repeat:
							$timeout = window.setTimeout(timer, 15000);
							
						});
						
					});
				
			}());
			
		}
	});
	
}); // RG
