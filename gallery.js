$(function(){
	// $('article div').on('click', function(){
	// 	$('.imagePanel').css('display','block');
	// });
	// $('.imagePanel').on('click', function(){
	// 	$(this).css('display','none');
	// });
	var $imagePanel = $('.imagePanel');
	var $image = $('.image');

	$image.on('click', function(){
		var backgroundImage = $(this).css('background-image');
		$imagePanel.css('background-image',backgroundImage);
		$(this).data('caption')
		$imagePanel.fadeIn('slow'); 
	});
});
