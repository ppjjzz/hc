
$(function(){
//$.ajax({
//			type:"get",
//			url:"http://temp.163.com/special/00804KV1/post1603_api_all.js?callback=callback",
//			dataType:"jsonp",
//			jsonpCallback:"callback",
//			success:function (data){
//				console.log(data);
//				app.items=data.data.slice(0,5);
//			}
//		});  //网易新闻稳定API
$.ajax({
			type:"get",
			url:"http://cre.mix.sina.com.cn/api/v3/get?callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				app.items=data.data.slice(0,5);
			}
		});  //新浪新闻稳定API
//$.ajax({
//			type:"get",
//			url:"https://www.toutiao.com/api/pc/feed/?category=news_entertainment&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A165A9F3D28DBE6&cp",
//			dataType:"jsonp",
//			jsonpCallback:"cp",
//			success:function (data){
//				console.log(data);
//			}
//		});  //今日头条新闻稳定API
//$.ajax({
//			type:"get",
//			url:"http://data.v.qq.com/videocms/getNewsvideoList.php?ref=pclient&appkey=6UkwV9DeHr9_PC&vsite=new_vshou&ename=new_vs_tv&callback",
//			dataType:"jsonp",
//			jsonpCallback:"callback",
//			success:function (data){
//				console.log(data);
//			}
//		});  //腾讯视频资讯稳定API		
//$.ajax({
//			type:"get",
//			url:"http://data.v.qq.com/videocms/getNewsvideoList.php?ref=pclient&appkey=6UkwV9DeHr9_PC&vsite=mv&ename=y_hot_start&callback",
//			dataType:"jsonp",
//			jsonpCallback:"callback",
//			success:function (data){
//				console.log(data);
//			}
//		});  //腾讯音乐资讯稳定API		
Vue.component("swiper",{
	template:`<div class="swiper-container" id="banner">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for='item of items'><img :src='item.thumb'/><div class="newsTitle">{{item.mtitle}}</div></div>
  </div>
  <div class="swiper-pagination"></div>
  
</div>`,
    props:['items'],

})
var app=new Vue({
	el:'#app',
	data:{
		items:5,
	},
})

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

mySwiper.on('tap', function(swiper, e) {

	e.preventDefault()

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

	$("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')

})

})

