jQuery.noConflict();
(function ($) {
	$(function () {

		$(document).ready(function () {

			$('a[href^="#"]').on('click', function (event) {
				var target = $(this.getAttribute('href'));
				if (target.length) {
					event.preventDefault();
					$('html, body').stop().animate({
						scrollTop: target.offset().top
					}, 1000);
				}
			});

			/**
			 * HOME
			 */
			// banner principal
			$('.owl-carousel-home').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				items: 1
			})

			// niveles
			$('.owl-carousel-niveles').owlCarousel({
				loop: true,
				margin: 70,
				nav: true,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 2
					},
					768: {
						items: 3
					}
				}
			})

			// instalaciones
			$('.owl-carousel-instalaciones').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				items: 1
			})

			console.log('hola mundo');
		});

	});
})(jQuery);

function getWidth() {
	return Math.max(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	);
}
