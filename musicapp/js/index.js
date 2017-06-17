var app;
var timer;
var t=true;
var playlist=[];
var mylist=JSON.parse(sessionStorage.getItem("mylist"));
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
				sessionStorage.setItem("mylist",JSON.stringify(mylist));
				location.href="src/play.html?id="+id
			},
			clear:function(){
				console.log(this.historys)
				this.historys=[];
			},
			add:function(id,ev){
//					playlist.push(id);
//					sessionStorage.setItem("mylist",JSON.stringify(playlist));
//					console.log(sessionStorage.getItem("mylist"))
//					$(ev.target).removeClass("icon-add2");
//					$(ev.target).addClass("icon-shanchu");
                    if(!$(ev.target).hasClass("icon-shanchu")){
					if(mylist){
					mylist.push(id);
				} else{
					mylist=[id];
					sessionStorage.setItem("mylist",JSON.stringify([id]))
				}
				$(ev.target).removeClass("icon-add2");
				$(ev.target).addClass("icon-shanchu");
				}
			},
		},
		watch:{
			keywords:function(val){
				clearTimeout(timer);
				t=true;
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
								$(".x").removeClass("icon-shanchu");
				$(".x").addClass("icon-add2");
							})
						} else{
							$.getJSON("http://119.29.111.179:3000/search?keywords="+val,function(res){
								app.inputing=false;
								app.aors=false;
								app.result=res.result.songs;
								$(".x").removeClass("icon-shanchu");
				$(".x").addClass("icon-add2");
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
	if(sessionStorage.getItem("banners")){
		app.items=JSON.parse(sessionStorage.getItem("banners"));
		app.recommendSongs=JSON.parse(sessionStorage.getItem("recommendSongs"));
		app.newsongs=JSON.parse(sessionStorage.getItem("newsongs"));
		app.djs=JSON.parse(sessionStorage.getItem("djs"));
	} else{
		$.getJSON("http://119.29.111.179:3000/banner",function(data){
		console.log(data);
		app.items=data.banners;
		sessionStorage.setItem("banners",JSON.stringify(data.banners))
		$.getJSON("http://119.29.111.179:3000/personalized",function(data){
		console.log(data);
		app.recommendSongs=data.result;
		sessionStorage.setItem("recommendSongs",JSON.stringify(data.result));
		$.getJSON("http://119.29.111.179:3000/personalized/newsong",function(datas){
		console.log(datas);
		datas.result.length=5;
		app.newsongs=datas.result;
		sessionStorage.setItem("newsongs",JSON.stringify(datas.result));
		$.getJSON("http://119.29.111.179:3000/dj/recommend",function(data){
		console.log(data);
		data.djRadios.length=3;
		app.djs=data.djRadios;
		sessionStorage.setItem("djs",JSON.stringify(data.djRadios));
	})
	})
	})
	});
	}
	
$(document).on("scroll",function(){
	if(t){
		$("#search").trigger("blur");
	}
	t=false;
})
	var banner = new Swiper('#banner', {
	autoplay: 5000,//可选选项，自动滑动
	pagination: '.swiper-pagination',
	autoplayDisableOnInteraction:false,
})
},false)