/* PrognRoll | https://mburakerman.github.io/prognroll/ | @mburakerman | License: MIT */
(function ($) {
	$.fn.prognroll = function (options) {

		var settings = $.extend({
			height: 5, // progress bar height
			color: "#50bcb6", // progress bar background color
			custom: false // if you make it true, you can add your custom div and see it's scroll progress on the page
		}, options);

		var progressBar = $("<span>", {
			class: "prognroll-bar",
		});

		return this.each(function (i, el) {
			if ($(this).data("prognroll")) {
				return false;
			}
			$(this).data("prognroll", true);

			$("body").prepend(progressBar).end().find(".prognroll-bar").not(":first").remove();

			$(".prognroll-bar").css({
				position: "fixed",
				top: 0,
				left: 0,
				width: 0,
				height: settings.height,
				backgroundColor: settings.color,
				zIndex: 2147483647
			});

			var globals = {
				"windowScrollTop": $(window).scrollTop(),
				"windowOuterHeight": $(window).outerHeight(),
				"bodyHeight": $(document).height()
			}

			function bindWindowScroll() {
				$(window).scroll(function (e) {
					e.preventDefault();
					globals.windowScrollTop = $(window).scrollTop() - 650;
					globals.windowOuterHeight = $(window).outerHeight();
					globals.bodyHeight = $(document).height() - 1300; // 650 height footer + 650 header

					var total = (globals.windowScrollTop / (globals.bodyHeight - globals.windowOuterHeight)) * 100;
					$(".prognroll-bar").css("width", total + "%");
				});
			}

			if (settings.custom === false) {
				bindWindowScroll();
			} else {
				// if el has no max-height set
				if ($(this).css("max-height") == "none") {
					bindWindowScroll();
				} else {
					$(this).scroll(function (e) {
						e.preventDefault();
						var customScrollTop = $(this).scrollTop();
						var customOuterHeight = $(this).outerHeight();
						var customScrollHeight = $(this).prop("scrollHeight");

						var total = (customScrollTop / (customScrollHeight - customOuterHeight)) * 100;
						$(".prognroll-bar").css("width", total + "%");
					});
				}
			}

			// get scroll position on on page load
			var total = (globals.windowScrollTop / (globals.bodyHeight - globals.windowOuterHeight)) * 100;
			$(".prognroll-bar").css("width", total + "%");
		});
	};
})(jQuery);

jQuery.noConflict();
(function ($) {
	$(function () {

		$(document).ready(function () {

			/**
			 * GENERAL
			 */

				// menu sticky scroll - fixed
			let scrollTop = $('.c-header__menu-principal').offset().top;
			//console.log(scrollTop);

			$(window).scroll(function () {
				if (getWidth() > 768) {
					if ($(window).scrollTop() > scrollTop) {
						$('.c-header__menu-principal').addClass('fixed-top');
						$('.fixed-margin-top').addClass('fixed-yes');
						$('.fixed-margin-top').removeClass('fixed-no');
					} else {
						$('.c-header__menu-principal').removeClass('fixed-top');
						$('.fixed-margin-top').addClass('fixed-no');
						$('.fixed-margin-top').removeClass('fixed-yes');
					}
				}
			});

			// scrool to
			$('a[href^="#"]').on('click', function (event) {
				var target = $(this.getAttribute('href'));
				if (target.length) {
					event.preventDefault();
					$('html, body').stop().animate({
						scrollTop: target.offset().top
					}, 1000);
				}
			});

			// para button toogle menu mobile
			$('#menu_on').on('click', function (e) {
				e.preventDefault();
				$('body').toggleClass('visible_menu'); // A??adimos o eliminamos la clase 'visible_menu' al body
			})

			// barra progreso lectura, usa la class ".noticia-full"
			$('.noticia-full').prognroll({
				//Altura de la barra de progreso
				height: 7,
				//Color de la barra de progreso
				color: "#E30613",
				// Si queremos a??adir una barra de progreso a una capa ponemos el valor true
				custom: true
			});

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
				margin: 40,
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
			// para todas las p??ginas, imagen header
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
			 * PAGES - MIC GAMES
			 */
			$('.owl-carousel-mic-games').owlCarousel({
				items: 1,
				loop: false,
				center: true,
				margin: 10,
				lazyLoad: true,
				touchDrag: false,
				mouseDrag: false,
				URLhashListener: true,
				autoplayHoverPause: true,
				startPosition: 'URLHash'
			});
			$('.owl-carousel-mic-games-pager').owlCarousel({
				items: 3,
				loop: false,
				margin: 16,
				lazyLoad: true,
				touchDrag: false,
				mouseDrag: false,
				nav: false,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				dots: true
			});
			$('.owl-carousel-mic-games-pager .owl-item-photo').on('click', function (event) {
				$('.owl-item-photo').removeClass('is-active');
				var $this = $(this);
				$this.addClass('is-active')
			})

			// owl mic captains
			$('.owl-carousel-mic-games-pager-2').owlCarousel({
				loop: false,
				margin: 16,
				nav: false,
				navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
				dots: true,
				touchDrag: false,
				mouseDrag: false,
				responsive: {
					0: {
						items: 3
					},
					768: {
						items: 4
					},
					960: {
						items: 5
					}
				}
			});
			$('.owl-carousel-mic-games-pager-2 .item-link').on('click', function (event) {
				$('.item-link').removeClass('is-active');
				var $this = $(this);
				$this.addClass('is-active')

				$('.equipo-mic').removeClass('d-block');
				$('.equipo-mic').addClass('d-none');
				var anio = $this.children('a').attr('data-anio');
				$('.equipo-mic--' + anio).addClass('d-block');
				console.log(anio);
			})


			/**
			 * IS MOBILE
			 */
			if (getWidth() < 768) {
				let altoSliderNav;
				let altoSlider = $('.c-carousel-home .item img').height();
				altoSliderNav = (altoSlider / 2) - 25;

				$('.c-carousel-home .owl-carousel .owl-nav').css('top', altoSliderNav + 'px');

				// hover menu disabled
				$('.nav-link.dropdown-toggle').attr('data-toggle', 'dropdown');
			}
			console.log(getWidth());
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
