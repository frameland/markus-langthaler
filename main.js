$activeContent = null;

$(document).ready(function() {

	$('.loader').on('click', function(e) {
		var $target = $(e.target);
		var $parent = $target.parent();
		if ($parent.find('.loaded-content')[0]) {
			$('.loader').removeClass('loaded');
			$activeContent.slideUp(150, function() {
				$('.loaded-content').remove();
				$activeContent = null;
			});
		} else {
			if ($('.loaded-content')[0]) {
				$('.loaded-content').slideUp(150, function() {
					loadContent($target, $parent);
				});
			} else {
				loadContent($target, $parent);
			}
		}

		return false;
	});

	function loadContent($target, $parent) {
		$('.loaded-content').remove();
		$('.loader').removeClass('loaded');
		$.ajax({
			url: $target.attr('href')
		}).done(function(data) {
			$parent.append(data);
			$target.addClass('loaded');
			$activeContent = $parent.find('.loaded-content');
			$activeContent.hide();
			$activeContent.slideDown(150);
			$('html, body').animate({
			   scrollTop: $target.offset().top - 150
		   }, 200);
		}).fail(function(jqXHR, textStatus, errorThrow) {
			console.log(textStatus);
			console.log(errorThrow);
		});
	}

	$(document).on('click', function(e) {
		if ($activeContent !== null) {
			if (!$activeContent[0].contains(e.target)) {
				var pos = $activeContent.offset().top - 150;
				$('.loader').removeClass('loaded');
				$('html, body').animate({
			       scrollTop: pos
			   	}, 200);
				$activeContent.slideUp(150, function() {
					$activeContent = null;
					$('.loaded-content').remove();
				});
			}
		}
	});
});
