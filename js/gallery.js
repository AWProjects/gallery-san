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

// var gridSquare = $image.width(); 
var imageWidth = $image.width();
var imageHeight = $image.width();


//----------------------------------------------------------------
//Gallery Init
galleryPlugin.init = function() {
	$imagePanel.hide();

	galleryPlugin.clickImage();
	galleryPlugin.toggleCaption();
	galleryPlugin.closeImage();
	galleryPlugin.previousImage();
	galleryPlugin.nextImage();
};


//----------------------------------------------------------------
//function to change the background image
galleryPlugin.changeBackgroundImage = function() {
	var backgroundImage = $currentImage.css('background-image');
	$imagePanel.css('background-image',backgroundImage);
};


//----------------------------------------------------------------
//retrieve/load the caption data for the current image
galleryPlugin.retrieveCaptionData = function(){
	var imageCapTitle = $currentImage.data('title');
	var imageCapBody = $currentImage.data('caption');
	// $caption.text(imageCapTitle).hide();
	$captionTitle.text(imageCapTitle);
	$captionBody.text(imageCapBody);
};


//----------------------------------------------------------------
//function to find position of the grid version of the image (when you close the fullsize version it needs to minimize back into the correct position in the grid)
galleryPlugin.assignImagePosition = function(findForThis) {
	var position = findForThis.position();
	var imageOffsetTop = findForThis.offset().top;
	var scrollTop = $(window).scrollTop();
	var imageTop = imageOffsetTop - scrollTop;
	
	//These are local variables named imageWidth and imageHeight (do not affect global variables with same name.)
	var imageWidth = findForThis.width();
	var imageHeight = findForThis.height();

	$imagePanel.css({
		position: 'fixed',
		top: imageTop,
		left: position.left,
		width: imageWidth,
		height: imageHeight
	});
};


//----------------------------------------------------------------
//IMAGE POSITIONING FOR CLOSE
//----------------------------------------------------------------

/*This needs to happen in two stages to return the imagePanel to its point of origin WHILE scrolling takes place
	(- Solving bugs with positioning while scrolling)
PART 1: reassigns the position from fixed to absolute (and changes top and left values to correspond to this new position, i.e. position absolute)
PART 2: reassigns position again to facilitate a smooth animation (snapping back to size of grid image)
*/

//ASSIGN IMAGE POSITION ON CLOSE, PART 1
galleryPlugin.assignImagePositionClose1 = function() {
	var positionCloseTop = $(window).scrollTop() + 'px';
	var positionCloseLeft = 0 + 'px'; 

	$imagePanel.css({
		position: 'absolute',
		top: positionCloseTop,
		left: positionCloseLeft,
		width: '100%',
		height: '100%'
	});
};

//ASSIGN IMAGE POSITION ON CLOSE, PART 2
galleryPlugin.assignImagePositionClose2 = function(findForThis) {
	var positionCloseTopT2 = findForThis.position().top;
	var positionCloseLeftT2 = findForThis.position().left;

	$imagePanel.css({
		top: positionCloseTopT2,
		left: positionCloseLeftT2,
		width: imageWidth,
		height: imageHeight
	});
};


//----------------------------------------------------------------
//IMAGE ON CLICK
//----------------------------------------------------------------

galleryPlugin.clickImage = function() {
	$image.on('click', function(){
		$currentImage = $(this);
		// $('figcaption').fadeTo(500,1);
		
		//set the background image to corresponding image clicked
		galleryPlugin.changeBackgroundImage();
		galleryPlugin.retrieveCaptionData();

		galleryPlugin.assignImagePosition($currentImage);

		//3. show imagePanel
		$imagePanel.fadeIn('slow').addClass('animated');

		//4. expand imagePanel to the full screen
		$(this).delay(10).queue(function(){
		        $imagePanel.addClass('full');
		        $(this).dequeue();
		      });

		//fade in buttons for image clicked
		if($currentImage.hasClass('image1')) {
			$firstImageButtons.addClass('delay');

		}
		else if($currentImage.is(':last-child')){
			$lastImageButtons.addClass('delay');

		}
		else {
			$button.addClass('delay');
		};
	}); 	
};	


//----------------------------------------------------------------
//TOGGLE CAPTION
//----------------------------------------------------------------

galleryPlugin.toggleCaption = function(){
	
	$toggleCaption.on('click', function(){
		$caption.slideToggle('easeInOut');
	});
};


//----------------------------------------------------------------
//HIDE CAPTION
//----------------------------------------------------------------

//Hide caption if caption is visible when a button is clicked
galleryPlugin.hideCaption = function() {
	if($caption.css('display') === 'block') {
		$caption.slideToggle('easeInOut');
	};
};


//----------------------------------------------------------------
//CLOSE FULLSIZE IMAGE
//----------------------------------------------------------------

galleryPlugin.closeImage = function(){
	$close.on('click', function(){

		//hide the caption if caption is visible
		galleryPlugin.hideCaption();
		//remove !important positioning that keeps the imagePanel at fullscreen size
		$imagePanel.removeClass('full');

		//Reassigns the position from fixed to absolute (and changes top and left values to correspond to this new position, i.e. position absolute)
		galleryPlugin.assignImagePositionClose1();
		
		//Refresh/debug
		$imagePanel.width();
		//remove transition so animation does not start while position is changing from fixed to absolute
		$imagePanel.removeClass('animated');
		//Refresh/debug
		$imagePanel.width();
		//Add class again to allow for css transition 
		$imagePanel.addClass('animated');
		//Position and change width/height to the origin size of the grid image so imagePanel will now start transition to scale down to the right place regardless of scroll position)
		galleryPlugin.assignImagePositionClose2($currentImage);

		//Once transition is over, hide the ImagePanel
		$imagePanel.delay(1000).queue(function(){
			$imagePanel.css('display','none');
			$(this).dequeue();
		});
		//Once transition if over, hide the buttons
		$button.removeClass('delay');
	});
};


//----------------------------------------------------------------
//BACK BUTTON
//----------------------------------------------------------------

//click on back button goes to the prev img
galleryPlugin.previousImage = function(){
	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		galleryPlugin.hideCaption();
		galleryPlugin.changeBackgroundImage();
		$(this).delay(500).queue(function(){
			galleryPlugin.retrieveCaptionData();
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
};


//----------------------------------------------------------------
//NEXT BUTTON
//----------------------------------------------------------------

//click on next button goes to the next img
galleryPlugin.nextImage = function(){
	$next.on('click',function(){
		$currentImage = $currentImage.next();
			galleryPlugin.hideCaption();
			galleryPlugin.changeBackgroundImage();
		$(this).delay(500).queue(function(){
			galleryPlugin.retrieveCaptionData();
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
};


//----------------------------------------------------------------
//RUN THE GALLERY
//----------------------------------------------------------------
$(function(){
	galleryPlugin.init();
});

