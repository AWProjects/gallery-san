galleryPlugin = {};

//define variables
var $imagePanel = $('.imagePanel');
var $image = $('article div');
var $caption = $('#caption');
var $captionTitle = $('#captionTitle');
var $captionBody = $('#captionBody');
var $toggleCaption = $('.toggleCaption');
var $button = $('.button');
var $back = $('.backButton');
var $next = $('.nextButton');
var $close = $('.closeButton');
var $delay = $('.delay');
var $currentImage;

var $firstImageButtons = $('.closeButton,.nextButton,.bottomContainer');
var $lastImageButtons = $('.closeButton,.backButton,.bottomContainer');


	//function to change the background image
	var changeBackgroundImage = function() {
		var backgroundImage = $currentImage.css('background-image');
		$imagePanel.css('background-image',backgroundImage);

		//retrieve caption from data-caption and set it
		//to #caption
		// var imageCapTitle = $currentImage.data('title');

	};
	var retrieveCaptionData = function(){
		var imageCapTitle = $currentImage.data('title');
		var imageCapBody = $currentImage.data('caption');
		// $caption.text(imageCapTitle).hide();
		$captionTitle.text(imageCapTitle);
		$captionBody.text(imageCapBody);
	};



	//function to find position of the grid version of the image (when you close the fullsize version it needs to minimize back into the correct position in the grid)
	var assignImagePosition = function(findForThis) {
		var position = findForThis.position();
		var imageOffsetTop = findForThis.offset().top;
		var scrollTop = $(window).scrollTop();
		var imageWidth = findForThis.width();
		var imageHeight = findForThis.height();
		var imageTop = imageOffsetTop - scrollTop;

		$imagePanel.css({
			top: imageTop,
			left: position.left,
			width: imageWidth,
			height: imageHeight
		});
	};


	//a function that hide captions if it's visible when a button is clicked
	var hideCaption = function() {
		if($caption.css('display') === 'block') {
			$caption.slideToggle('easeInOut');
		};
	};

	//WHEN AN IMAGE IN THE GRID IS CLICKED
	$image.on('click', function(){
		$currentImage = $(this);
		// $('figcaption').fadeTo(500,1);
		
		//set the background image to corresponding image clicked
		changeBackgroundImage();
		retrieveCaptionData();

		assignImagePosition($currentImage);

		//3. show imagePanel
		$imagePanel.fadeIn('slow');

		//4. expand imagePanel to the full screen
		$(this).delay(10).queue(function(){
		        $imagePanel.addClass('full');
		        $(this).dequeue();
		      });

		//fade in buttons for image clicked
		if($currentImage.hasClass('image1')) {
			$firstImageButtons.addClass('delay');
			// $delay.css('transition','opacity 0.1s ease-in-out');

		}
		else if($currentImage.is(':last-child')){
			$lastImageButtons.addClass('delay');
			// $delay.css('transition','opacity 0.1s ease-in-out');
		}
		else {
			$button.fadeIn().addClass('delay');
			// $delay.css('transition','opacity 0.1s ease-in-out');
		};
	


	}); //END OF $IMAGE CLICK 


//----------------------------------------------------------------
//TOGGLE CAPTION
//----------------------------------------------------------------

	//TOGGLE CAPTION INFO
	$toggleCaption.on('click', function(){
		$caption.slideToggle('easeInOut');
	});

//----------------------------------------------------------------
//CLOSE FULLSIZE IMAGE
//----------------------------------------------------------------

	$close.on('click', function(){

		assignImagePosition($currentImage);

		hideCaption();
		// $('figcaption').fadeTo(500,0);
		$imagePanel.delay(10).queue(function(){
		        $imagePanel.removeClass('full');
		        $(this).dequeue();
		      });

		$imagePanel.delay(1000).queue(function(){
			$imagePanel.fadeOut();
			$(this).dequeue();
		});




		$button.removeClass('delay');

	});

//----------------------------------------------------------------
//BACK BUTTON
//----------------------------------------------------------------

	//click on back button goes to the prev img
	//back button doesn't show on img1
	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		hideCaption();
		changeBackgroundImage();
		$(this).delay(500).queue(function(){
			retrieveCaptionData();
			$(this).dequeue();
		});

		//Hide the back button if the current image is the first image
		if($currentImage.hasClass('image1')) {
			$back.hide().removeClass('delay');
			$firstImageButtons.fadeIn().addClass('delay');			
		}
		else if($currentImage.is(':last-child')){
			$next.hide().removeClass('delay');
			$lastImageButtons.fadeIn().addClass('delay');
		}
		else {
			$button.fadeIn().addClass('delay');
		};

	});



//----------------------------------------------------------------
//NEXT BUTTON
//----------------------------------------------------------------

	//click on next button goes to the next img
	//next button doesn't show on image:last-child
	$next.on('click',function(){
		$currentImage = $currentImage.next();
			hideCaption();
			changeBackgroundImage();
		$(this).delay(500).queue(function(){
			retrieveCaptionData();
			$(this).dequeue();
		});

		//Hide the next button if the current image is the last image
		if($currentImage.hasClass('image1')) {
			$back.hide().removeClass('delay');
			$firstImageButtons.fadeIn().addClass('delay');
		}
		else if($currentImage.is(':last-child')){
			$next.hide().removeClass('delay');
			$lastImageButtons.fadeIn().addClass('delay');
		}
		else {
			$button.fadeIn().addClass('delay');
		};


	});

$(function(){


});
