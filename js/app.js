// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

jQuery(function ($) {

	$(document).foundation();


	var viewportHeight = $(window).height();
	console.log("viewportHeight: " + viewportHeight);
	$("#hero").css("height", viewportHeight);

	var menuButton = $('#menu-button');
	var menuExposed = false;
	var menuItself = $('.nav');
	var navLink = $('.nav a');
	menuButton.on("click", function(){
		if (menuExposed == false) {
			menuItself.slideDown('fast');
			menuExposed = true;
		} else {
			closeMenu();
		}
	});

	navLink.on("click", function(){
		if (menuExposed == true) {
			closeMenu();
		}
	});

	function closeMenu() {
		menuItself.slideUp('fast');
		menuExposed = false;
	}

	$('a').smoothScroll();
	var backToTopButton = $('#back-up-button');

	console.log( "scroll top: " + $(window).scrollTop() );
	$(window).on( "scroll", function(){
		if ($(window).scrollTop() == 0) {
			console.log("at the top");
			backToTopButton.addClass("back-to-top-hidden");
		} else if ($(window).scrollTop() > 250) {
			backToTopButton.removeClass("back-to-top-hidden");
		}
	} );

	var faqList = $('.faq-list');
	var faqs = faqList.children('li');
	var answers = faqs.children('.answer');
	var faqActive = $('.faq-list .active');
	var answerActive = $('.faq-list .active .answer');
	answers.hide();
	faqs.on("click", function(){
		if ( !($(this).hasClass("active")) ) {
			console.log("this faq was not already active");
			answerActive.slideUp( "fast");
			faqActive.removeClass("active");
			
			$(this).addClass("active");
			$(this).children(".answer").slideDown( "fast");
			faqActive = $('.faq-list .active');
			answerActive = $('.faq-list .active .answer');
		} else {
			console.log("this faq was already active");
			answerActive.slideUp( "fast");
			faqActive.removeClass("active");
		}
	});

	var memeHolder = $('#meme-holder');
	var memeRows = memeHolder.children('.row');
	var memeRowsLength = memeRows.length;
	var addButton = $('#add-meme-row-button');
	var numRowsVisible = 1;
	for (i = 0; i < memeRowsLength; i++) {
		if (i > 0) {
			$(memeRows[i]).hide();
		}
	}
	addButton.on("click", function(){
		if (numRowsVisible < memeRowsLength) {
			$(memeRows[numRowsVisible]).slideDown('fast');
			numRowsVisible++;
		}
		if (numRowsVisible >= memeRowsLength) {
			addButton.animate({
				opacity: 0,
			}, 200);
		}
	});

	var memeSingle = $('.single-meme-holder img');
	$(memeSingle).on('click', function() {
		var imageHolder = $('#memeToDisplay').attr("src", $(this).attr("src"));
		$('#memeModal').foundation('reveal','open');
	});


	var serviceItem = $('.service-list li');
	$(serviceItem).on('click', function() {
		$('#serviceModal').foundation('reveal','open');
	});


	var serviceScreenshotsList = $('#screenshot-slider');
	var serviceScreenshots = $('#screenshot-slider li');
	var serviceScreenshotsTrackWidth = serviceScreenshots.length * (serviceScreenshots.width() + parseInt(serviceScreenshots.css("margin-right")));
	var servicesScreenshotUnitWidth = serviceScreenshots.width() + parseInt(serviceScreenshots.css("margin-right"));
	var serviceStepButtons = $('#screenshot-steps li');
	var serviceStepButtonsArr = $.makeArray(serviceStepButtons);
	var serviceStepArrowRight = $('#slider-arrow-right');
	var serviceStepArrowLeft = $('#slider-arrow-left');
	var previousIndex;
	var activeIndex = 0;
	var currentPosX = 0;

	console.log("buttons array" + serviceStepButtons);
	console.log("width of services track: " + serviceScreenshotsTrackWidth);
	console.log("unit width: " + servicesScreenshotUnitWidth);

	serviceScreenshotsList.width(serviceScreenshotsTrackWidth);

	serviceStepButtons.on("click", function(){
		var index = serviceStepButtonsArr.indexOf(this);
		previousIndex = activeIndex;
		activeIndex = index;
		translateScreenshots(activeIndex, currentPosX, previousIndex);
		serviceStepButtons.removeClass("active");
		$(this).addClass("active");
	});

	serviceStepArrowRight.on("click", function(){
		translateScreenshots(activeIndex, currentPosX, previousIndex);
	});

	function translateScreenshots(index, currentPosX, previousIndex) {
		console.log("previousIndex was: " + previousIndex);
		console.log("activeIndex is now: " + activeIndex);
		serviceScreenshotsList.css("transform", "translateX(" + (servicesScreenshotUnitWidth * (-1 * index)) + "px)");
	}

	// serviceStepArrowRight.on("click", function(){
	// 	console.log("activeIndex: " + activeIndex);
	// 	if (!(activeIndex < -2)) {
	// 		arrowClickRight(activeIndex);
	// 		activeIndex = activeIndex - 1;
	// 	}
	// });
	// function arrowClickRight(activeIndex) {
	// 	console.log("right clicked, active index: " + activeIndex);
	// 	serviceScreenshotsList.css("transform", "translateX(" + (servicesScreenshotUnitWidth * (activeIndex - 1)) + "px)");
		
	// }

	// serviceStepArrowLeft.on("click", function(){
	// 	console.log("activeIndex: " + activeIndex);
	// 	if (!(activeIndex > -1)) {
	// 		arrowClickLeft(activeIndex);
	// 		activeIndex = activeIndex + 1;
	// 	}
	// });
	// function arrowClickLeft(activeIndex) {
	// 	console.log("left clicked, active index: " + activeIndex);
	// 	serviceScreenshotsList.css("transform", "translateX(" + (servicesScreenshotUnitWidth * (activeIndex + 1)) + "px)");	
	// }

});





















