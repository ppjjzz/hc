var app;
var timer;
window.addEventListener("load",function(){
	app=new Vue({
		el:"#app",
		data:{
			items:6,
			recommendSongs:[],
			newsongs:[],
			djs:[],
			result:[],
			toggle:true,
			searchtoggle:true,
			keywords:'',
			inputing:true,
			aors:false,
			historys:[],
		},
		methods:{
			search:function(){
				this.searchtoggle=false;
				this.toggle=false;
				this.$nextTick(function(){
					this.$refs.inputs.focus();
				})
			},
			cancels:function(){
				this.toggle=true;
				this.searchtoggle=true;
				this.keywords="";
			},
			recoder:function(){
				if(this.keywords!=""){
					this.historys.push(this.keywords)
				}
				
			},
			toplay:function(id){
				location.href="src/play.html?id="+id
			}
		},
		watch:{
			keywords:function(val){
				clearTimeout(timer)
				if(val!=""){
					timer=setTimeout(function(){
						$.getJSON("http://119.29.111.179:3000/search/suggest?keywords="+val,function(data){
						if(data.result.artists){
							if(data.result.artists[0].name==val){
							var artistsId=data.result.artists[0].id;
							$.getJSON("http://119.29.111.179:3000/artists?id="+artistsId,function(res){
								app.inputing=false;
								app.aors=true;
								app.result=res.hotSongs;
							})
						} else{
							$.getJSON("http://119.29.111.179:3000/search?keywords="+val,function(res){
								app.inputing=false;
								app.aors=false;
								app.result=res.result.songs
							})
						}
						} 
						
					})
					},500)
					
				
				} else{
					app.inputing=true;
				}
			}
		},
		
	})
	$.getJSON("http://119.29.111.179:3000/banner",function(data){
		console.log(data);
		app.items=data.banners;
		$.getJSON("http://119.29.111.179:3000/personalized",function(data){
		console.log(data);
		app.recommendSongs=data.result;
		$.getJSON("http://119.29.111.179:3000/personalized/newsong",function(data){
		console.log(data);
		data.result.length=5;
		app.newsongs=data.result;
		$.getJSON("http://119.29.111.179:3000/dj/recommend",function(data){
		console.log(data);
		data.djRadios.length=3;
		app.djs=data.djRadios;
	})
	})
	})
	});
//$(".searchbg").on("scroll",function(){
//	console.log("aa")
//	$("#search").trigger("blur")
//})
	var banner = new Swiper('#banner', {
	autoplay: 5000,//可选选项，自动滑动
	pagination: '.swiper-pagination',
	autoplayDisableOnInteraction:false,
})
},false)