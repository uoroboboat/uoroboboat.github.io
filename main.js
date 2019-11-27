$(document).ready(function () {

	// Get localStorage language value
	var langLS = localStorage.getItem("lang");

	if (!langLS) {
		// Get the browsers language
		if (navigator.language.indexOf('fr') !== -1) langLS = 'fr'
		else langLS = 'en';
	}

	if (langLS == 'fr') showFrench();
	else showEnglish();

	$.fancybox.defaults.animationEffect = "zoom";
	$.fancybox.defaults.transitionEffect = "slide";

	var body = $('body');
	var normalwidth = 0;
	var scrollwidth = 0;
	if (body.prop('scrollHeight') > body.height()) {
		normalwidth = window.innerWidth;
		scrollwidth = normalwidth - body.width();
		$('#main').css({ marginRight: '-' + scrollwidth + 'px' });
	}

	// Inserts the icons
	feather.replace()

	// Adds smooth scrolling to links (navbar)
	$("a").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				window.location.hash = hash;
			});

			if ($("header input[type='checkbox']").val()) {
				$("header input[type='checkbox']").prop('checked', false);
			}
		}
	});

	topofDiv = $("#home").offset().top; //gets offset of header
	height = $("#home").outerHeight(); //gets height of header
	updateNavBar();
	$(window).scroll(updateNavBar);

	doSlideshow();

	// Adds the headers background when in the home section in the mobile version when clicking on the menu
	$('#hamburger').change(function() {
		if (this.checked) {
			$("header").addClass("header-background");
		} else if ($(window).width() <= 820 && $(window).scrollTop() < $(window).height()) {
			$("header").removeClass("header-background");
		}
	});
});

var images = new Array('./img/back.jpg', './img/gallery/gallery4.jpg', './img/gallery/gallery2.jpg');
var nextimage = 0;

function doSlideshow() {
	if ($('.slideshowimage').length != 0) {
		$('.slideshowimage').fadeOut(500, function () {
			$(this).remove()
		});
		slideshowFadeIn();
	} else {
		slideshowFadeIn();
	}
}

function slideshowFadeIn() {
	$('#home').prepend($('<img class="slideshowimage" src="' + images[nextimage++] + '" style="display:none" alt="Background slideshow">').fadeIn(500, function () { setTimeout(doSlideshow, 3000); }));
	if (nextimage >= images.length)
		nextimage = 0;
}

function addPhotos() {
	var newPhotos = $("\
		<div class='pictures' id='bottom-pictures'>\
			<a data-src='img/gallery/gallery6.jpg' data-fancybox='roboboat-gallery' href='javascript:;'>\
				<div class='vid-thumbnail'>\
					<img src='img/gallery/thumbnail/gallery6.jpg'>\
					<div class='pic-overlay'></div>\
				</div>\
			</a>\
			<a data-src='img/gallery/gallery7.jpg' data-fancybox='roboboat-gallery' href='javascript:;'>\
				<div class='vid-thumbnail'>\
					<img src='img/gallery/thumbnail/gallery7.jpg'>\
					<div class='pic-overlay'></div>\
				</div>\
			</a>\
			<a data-src='img/gallery/gallery8.jpg' data-fancybox='roboboat-gallery' href='javascript:;'>\
				<div class='vid-thumbnail'>\
					<img src='img/gallery/thumbnail/gallery8.jpg'>\
					<div class='pic-overlay'></div>\
				</div>\
			</a>\
			<a data-src='img/gallery/gallery9.jpg' data-fancybox='roboboat-gallery' href='javascript:;'>\
				<div class='vid-thumbnail'>\
					<img src='img/gallery/thumbnail/gallery9.jpg'>\
					<div class='pic-overlay'></div>\
				</div>\
			</a>\
			<a data-src='img/gallery/gallery10.jpg' data-fancybox='roboboat-gallery' href='javascript:;'>\
				<div class='vid-thumbnail'>\
					<img src='img/gallery/thumbnail/gallery10.jpg'>\
					<div class='pic-overlay'></div>\
				</div>\
			</a>\
		</div>\
	");

	$("#gallery").append(newPhotos);

	$("#gallery .section-button").animate({
		height: 0,
		opacity: 0,
		margin: 0,
		padding: 0,
	}, 1000, function () {
		$("#gallery .section-button").attr("disabled", true);
	});

	$("#gallery").animate({
		paddingBottom: 0
	}, 1500);
}

var height = $("#home").outerHeight(); //gets height of header

function updateNavBar() {

	// Checks if its the width of a phone
	if ($(window).width() <= 820) {
		if ($(window).scrollTop() >= $(window).height())
			$("header").addClass("header-background");
		else
			$("header").removeClass("header-background");
	} else {
		// Adds the background to the header/navbar
		if ($(window).scrollTop() > 100) {
			$("header").addClass("header-background");
		} else {
			$("header").removeClass("header-background");
		}
	}

	if ($(window).scrollTop() >= $(window).height())
		$("#nav-logo").addClass("nav-img-show");
	else
		$("#nav-logo").removeClass("nav-img-show");

	// Animates navbar links when scrolling
	var windscroll = $(window).scrollTop();
	var navheight = $('header').height();
	if (windscroll >= navheight) {
		$('section').each(function (i) {
			if ($(this).position().top <= windscroll + 100) {
				// $('nav a.active').removeClass('active');
				$('nav ul li.active').removeClass('active');
				// $('nav a').eq(i).addClass('active');
				$('nav ul li').eq(i).addClass('active');
			}
		});
	} else {
		$('nav').removeClass('fixed');
		$('nav ul li.active').removeClass('active');
		$('nav ul li:first').addClass('active');
	}
}

function showEnglish() {
	$('.en').css('visibility', 'visible');
	$('.en').css('display', 'flex');

	$('.fr').css('visibility', 'hidden');
	$('.fr').css('display', 'none');
}

function showFrench() {
	$('.en').css('visibility', 'hidden');
	$('.en').css('display', 'none');

	$('.fr').css('visibility', 'visible');
	$('.fr').css('display', 'flex');
}