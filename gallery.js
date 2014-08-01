$(function(){
	// $('article div').on('click', function(){
	// 	$('.imagePanel').css('display','block');
	// });
	// $('.imagePanel').on('click', function(){
	// 	$(this).css('display','none');
	// });
	var $imagePanel = $('.imagePanel');
	var $image = $('article div');
	var $caption = $('#caption');
	var $toggleCaption = $('.toggleCaption');
	var $button = $('.button');
	var $back = $('.backButton');
	var $next = $('.nextButton');
	var $close = $('.closeButton');
	var $currentImage;


	//
	var changeBackgroundImage = function() {
		var backgroundImage = $currentImage.css('background-image');
		$imagePanel.css('background-image',backgroundImage);

		//retrieve caption from data-caption and set it
		//to #caption
		var imageCap = $currentImage.data('caption');
		$caption.text(imageCap).hide();

	};

	$image.on('click', function(){
		$currentImage = $(this);
		//set the background image to corresponding image clicked

		changeBackgroundImage();
		//imagePanel appears when image clicked

		//Show Buttons with delay


		//1. get the position of the grid image
		var position = $(this).position();
		var imageOffsetTop = $(this).offset().top;
		var scrollTop = $(window).scrollTop();
		// var offsetPosition = $(this).offset();
		var imageWidth = $(this).width();
		var imageHeight = $(this).height();
		var imageTop = imageOffsetTop - scrollTop;


		//2. transfer it to imagePanel
		$imagePanel.css({
			top: imageTop,
			left: position.left,
			width: imageWidth,
			height: imageHeight
		});

		//3. show imagePanel
		$imagePanel.fadeIn('slow');
		// $button.css({
		// 	transition: opacity 2s ease-in;
		// 	transition-delay: 2s;
		// });
		//4. expand imagePanel to the full screen





		// $('article').hide();

	});


	$toggleCaption.on('click', function(){
		$caption.toggle('slow');
	});

	$close.on('click', function(){
		// $('article').show();
		$imagePanel.fadeOut('slow'); 
	});

	//click on back button goes to the prev img
	//back button doesn't show on img1
	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		changeBackgroundImage();
		if ($currentImage.hasClass('image1')){
			$back.hide();
		} else {
			$next.show();
		};
	});

	//click on next button goes to the next img
	//next button doesn't show on image:last-child
	$next.on('click',function(){
		$currentImage = $currentImage.next();
		changeBackgroundImage();
		if ($currentImage.is(':last-child')){
			$next.hide();
		} else {
			$back.show();
		};
	});
});
