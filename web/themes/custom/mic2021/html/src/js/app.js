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
			 * GENERAL
			 */
			$('#menu_on').on('click', function (e) {
				e.preventDefault();
				$('body').toggleClass('visible_menu'); // Añadimos o eliminamos la clase 'visible_menu' al body
			})

			/**
			 * HOME
			 */
			// banner principal
			$('.owl-carousel-home').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				dots: false,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				items: 1
			})

			// niveles
			$('.owl-carousel-niveles').owlCarousel({
				loop: true,
				margin: 70,
				nav: true,
				dots: true,
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
				dots: false,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				items: 1
			})

			/**
			 * PAGES INNER
			 */
			// para todas las páginas, imagen header
			$('.owl-carousel-internas-header').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				dots: false,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				items: 1,
				mouseDrag: false,
				touchDrag: false,
				pullDrag: false,
				freeDrag: false
			})

			/**
			 * IS MOBILE
			 */
			if (getWidth() < 768) {
				let altoSliderNav;
				let altoSlider = $('.c-carousel-home .item img').height();
				altoSliderNav = (altoSlider / 2) - 25;


				$('.c-carousel-home .owl-carousel .owl-nav').css('top', altoSliderNav + 'px');
				console.log(altoSlider);
			}
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
