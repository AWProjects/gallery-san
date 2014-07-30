$(function(){
	$('article div').on('click', function(){
		$('.imagePanel').css('display','block');
	});
	$('.imagePanel').on('click', function(){
		$(this).css('display','none');
	});
});