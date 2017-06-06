
window.addEventListener('load',function(){

	var banner = new Swiper('#banner', {
	autoplay: 5000,//可选选项，自动滑动
	pagination: '.swiper-pagination',
})
	var mySwiper = new Swiper('#topNav', {
	freeMode: true,
	freeModeMomentumRatio: 0.5,
	slidesPerView: 'auto',

});

swiperWidth = mySwiper.container[0].clientWidth
maxTranslate = mySwiper.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2

$(".swiper-container").on('touchstart', function(e) {
	
		e.preventDefault()
	
})
banner.on('tap',function(swiper, e){
    window.location.href=swiper.slides[swiper.clickedIndex].lastElementChild.href;//banner图链接跳转
})
mySwiper.on('tap', function(swiper, e) {
    if($(e.target).parent().hasClass("active")){
    	location.href=e.target.href
    }
	slide = swiper.slides[swiper.clickedIndex]
	slideLeft = slide.offsetLeft
	slideWidth = slide.clientWidth
	slideCenter = slideLeft + slideWidth / 2
	// 被点击slide的中心点

	mySwiper.setWrapperTransition(300)

	if (slideCenter < swiperWidth / 2) {
		
		mySwiper.setWrapperTranslate(0)

	} else if (slideCenter > maxWidth) {
		
		mySwiper.setWrapperTranslate(maxTranslate)

	} else {

		nowTlanslate = slideCenter - swiperWidth / 2

		mySwiper.setWrapperTranslate(-nowTlanslate)

	}

	$("#topNav  .active").removeClass('active')

	$("#topNav .swiper-slide").eq(mySwiper.clickedIndex).addClass('active')

})
},false)



