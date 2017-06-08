var y,flag=false,sy,st;
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
	$(window).scrollTop(0)
//  if($(e.target).parent().hasClass("active")){
////  	location.href=e.target.href
     if(e.target.title=="index"){
       app.show=true;
     } else{
     	app.newscdata.length=0;
       arr2.length=0;
       app.show=false;
       getNews(e.target.title,0);
     }
//   $(window).scrollTop(0)
//     
//  }
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
    $(document).on("scroll",function(){
    	st=$(document).scrollTop()+2;
    	var yy=$("#app").outerHeight()-$("body").height()
    	if(st>yy && !flag){
    		$("<li id='loading'><img src='img/LOGO4.png' /></li>").appendTo($("#newslist"));
    		flag=true;
    		setTimeout(function(){
    			flag=false;
    			$("#loading").remove()
    			loadnews()
    		},3000)
    	}
    })
//  $("#app").on("touchstart",function(ev){
//  	y=ev.touches[0].pageY;
//
//  	console.log(($("#app").outerHeight()-$("body").height()),st)
//  })
//  $("#app").on("touchmove",function(ev){
//  	sy=ev.touches[0].pageY-y;
//  	st=$(document).scrollTop()+1
//  	
//  })
//  $("#app").on("touchend",function(ev){
//  	var yy=$("#app").outerHeight()-$("body").height()
//  	if(sy<0 && st>yy && !flag){
//  		$("<li id='loading'><img src='img/LOGO4.png' /></li>").appendTo($("#newslist"));
//  		flag=true;
//  		setTimeout(function(){
//  			flag=false;
//  			$("#loading").remove()
//  			loadnews()
//  		},3000)
//  	}
//  })
},false)



