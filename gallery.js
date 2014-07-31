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
	var $back = $('.backButton');
	var $next = $('.nextButton');
	var $currentImage;


	//
	var changeBackgroundImage = function() {
		var backgroundImage = $currentImage.css('background-image');
		$imagePanel.css('background-image',backgroundImage);

		//retrieve caption from data-caption and set it
		//to #caption
		var imageCap = $currentImage.data('caption');
		$caption.text(imageCap).hide();
		// if ($currentImage.hasClass('image1')){
		// 	$back.hide();
		// } else {
		// 	$next.show();
		// };
		// if ($currentImage.is(':last-child')){
		// 	$next.hide();
		// } else {
		// 	$back.show();
		// };

	};

	$image.on('click', function(){
		$currentImage = $(this);
		//set the background image to corresponding image clicked

		changeBackgroundImage();
		//imagePanel appears when image clicked
		$imagePanel.fadeIn('slow'); 
	});


	$toggleCaption.on('click', function(){
		$caption.toggle('slow');
	});

	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		changeBackgroundImage();
	});

	$next.on('click',function(){
		$currentImage = $currentImage.next();
		changeBackgroundImage();
	});
});
