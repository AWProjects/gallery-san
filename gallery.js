
$(function(){

	//define variables
	var $imagePanel = $('.imagePanel');
	var $image = $('article div');
	var $caption = $('#caption');
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
		var imageCap = $currentImage.data('caption');
		$caption.text(imageCap).hide();

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


	//WHEN AN IMAGE IN THE GRID IS CLICKED
	$image.on('click', function(){
		$currentImage = $(this);
		
		//set the background image to corresponding image clicked
		changeBackgroundImage();

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
			$firstImageButtons.fadeIn().addClass('delay');
			$delay.css('transition','opacity 0.1s ease-in-out');

		}
		else if($currentImage.is(':last-child')){
			$lastImageButtons.fadeIn().addClass('delay');
			$delay.css('transition','opacity 0.1s ease-in-out');
		}
		else {
			$button.fadeIn().addClass('delay');
			$delay.css('transition','opacity 0.1s ease-in-out');
		};
	


	}); //END OF $IMAGE CLICK 


//----------------------------------------------------------------
//TOGGLE CAPTION
//----------------------------------------------------------------

	//TOGGLE CAPTION INFO
	$toggleCaption.on('click', function(){
		$caption.slideToggle('jsswing');
	});

//----------------------------------------------------------------
//CLOSE FULLSIZE IMAGE
//----------------------------------------------------------------

	$close.on('click', function(){

		assignImagePosition($currentImage);

		// $button.removeClass('delay');

		$imagePanel.delay(10).queue(function(){
		        $imagePanel.removeClass('full');
		        $(this).dequeue();
		      });
		$button.fadeOut().removeClass('delay');
		$imagePanel.fadeOut(900); 

	});

//----------------------------------------------------------------
//BACK BUTTON
//----------------------------------------------------------------

	//click on back button goes to the prev img
	//back button doesn't show on img1
	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		changeBackgroundImage();

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
		changeBackgroundImage();

		
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
});
