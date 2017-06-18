var mySwiper;
var app2;
var id=location.search.slice(1).split("=")[1];
var mylist=JSON.parse(sessionStorage.getItem("mylist"));
var index=0;
var arr2=[];
window.onload=function(){
    var timer;
    var flag=true;
    var Oaudio=document.getElementById("audio");
    app2=new Vue({
    	el:"#app2",
    	data:{
    		lycs:[],
    		mp3:'',
    		bg:'',
    		name:'',
    		artic:'',
    		zhuanji:'',
    		zhuanjiId:'',
    		singerId:'',
    	},
    	filters:{
    		f:function(val){
    			return val.slice(5);
    		}
    	},
    	methods:{
    		playNext:function(){
    			if(!mylist){
    				return
    			}
    			$("audio").trigger("ended")
    		},
    		playPre:function(){
    			if(!mylist){  //如果没有播放列表禁用上一首按钮
    				return
    			}
    			clearInterval(timer);
    			index--;
    	if(index>=0){
    	ajaxSong(mylist[index]);
    	$("#audio")[0].load();
    	} else{
    		ajaxSong(mylist[mylist.length-1]);
    		index= -1;
    	}
    	},
    	toList:function(){
    		location.href="playlist.html?zhuanjiId="+this.zhuanjiId
    	},
    	toSingerList:function(){
    		location.href="playlist.html?singerId="+this.singerId
    	}
    	}
    	
    })
    if(id){ //如果有单曲ID则播放单曲，否则判断是否有播放列表传入
    	console.log("a")
    	ajaxSong(id);
    } else if(mylist){
    	console.log("b")
    	ajaxSong(mylist[index]);
//  	showTime();
    }
    function ajaxSong(ids){
    	$.getJSON("http://119.29.111.179:3000/music/url?id="+ids,function(data){
    		console.log(data.data[0].url)
    	app2.mp3=data.data[0].url;
    	
    })
    $.getJSON("http://119.29.111.179:3000/song/detail?ids="+ids,function(data){
    	console.log(data)
    	app2.bg=data.songs[0].al.picUrl;
    	app2.zhuanji=data.songs[0].al.name;
    	app2.zhuanjiId=data.songs[0].al.id;
    	app2.name=data.songs[0].name;
    	app2.artic=data.songs[0].ar[0].name;
    	app2.singerId=data.songs[0].ar[0].id;
    	
    });
    $.getJSON("http://119.29.111.179:3000/lyric?id="+ids,function(data){
    	var arr=data.lrc.lyric.split("\n");
    	console.log(arr); //歌词AJAX
    	arr2=[];
    	for (var i=0;i<arr.length;i++) {
    		arr2.push(arr[i].replace(/\[(\d\d:\d\d).\d+\]/g,function(){
    			return arguments[1];
    		}))
    	}
    	console.log(arr2);
    	app2.lycs=arr2;
    	mySwiper = new Swiper ('.swiper-container', {
    pagination: '.swiper-pagination',
    initialSlide :1,
//  effect : 'flip',
  });
    });
    }
    
    
    $("#audio")[0].addEventListener("canplay",function(){  //音频加载完毕
    	flag=true;
    	$("#play").trigger("click");
    	showDuration();
    },false)
//  $("#audio").on("canplay",function(){
//  	console.log("ready")
//  	flag=true;
//  	$("#play").trigger("click");
//  	showDuration();
//  	
//  })
    function showDuration(){  //显示单曲时长
    	var countTime=parseInt($("#audio")[0].duration);
    var min;
    var sec;
    min=parseInt(countTime/60);
    
    sec=countTime-min*60
    if(sec<10){
    	sec="0"+(countTime-min*60)
    }
    if(min<10){
    	min="0"+min;
    }
    countTime=min+":"+sec;
    $("#count").html(countTime);
    }
    
    
    function showTime(){ //显示已播放时间
    	var countTime=parseInt($("#audio")[0].currentTime);
    			var cost=parseInt($("#audio")[0].currentTime)/parseInt($("#audio")[0].duration);
    			$("#ing").width($("#progress").width()*cost);
    var min;
    var sec;
    min=parseInt(countTime/60);
    
    sec=countTime-min*60
    if(sec<10){
    	sec="0"+(countTime-min*60);
    }
    if(min<10){
    	min="0"+min;
    }
    countTime=min+":"+sec;
    			$("#spent").html(countTime);
    }
    //点击播放按钮事件
    $("#play").on("click",function(){
    	clearInterval(timer);
    	if(flag){
    		$("#audio")[0].play();
    		showTime();
    		$(".bpic").css({
    			animation:"xuan 60s linear infinite"
    		});
    		timer=setInterval(function(){
    			for (var i=0;i<arr2.length;i++) {
    				var lyct=arr2[i].slice(0,5);
    				if($("#spent").text()==lyct){
    					$(".lyric").text(arr2[i].slice(5));
    					$(".right li").eq(i).addClass("active").siblings().removeClass("active");
    					if(i>5 && $(".lyric").text()!=""){
    						$(".right ul").animate({
    						scrollTop:($(".right li").innerHeight())*(i-5)
    					},300)
    					}
    				}
    			}
    			
    			showTime();
    		},1000);
    		
    	$(this).addClass("icon-zanting");
    	} else{
    		$("#audio")[0].pause();
    		$(".bpic").css({
    			animation:""
    		});
    		$(this).removeClass("icon-zanting");
    	}
    	flag=!flag;
    });
    var loop=true;
    //点击循环播放
    $("#loop").click(function(){
    	if(loop){
    		$("#audio")[0].loop=true;
    	$(this).css("color","white");
    	} else{
    		$("#audio")[0].loop=false;
    	$(this).css("color","#c3c3bd");
    	}
    	loop=!loop;
    });
    $("#progress").on("touchstart",function(e){
    	$("#play").trigger("click");
    	$("#ing").width(e.touches[0].pageX-$("#progress").offset().left)
    });
    $("#progress").on("touchmove",function(e){
    	var t=e.touches[0].pageX-$("#progress").offset().left;
    	if(t<=$("#progress").width()){
    		$("#ing").width(t);
    		$("#audio")[0].currentTime=parseInt($("#audio")[0].duration*($("#ing").width()/$("#progress").width()));
    		showTime();
    	} else{
    		$("#ing").width($("#progress").width());
    	}
    	
    });
    $("#progress").on("touchend",function(){
    	$("#audio")[0].currentTime=parseInt($("#audio")[0].duration*($("#ing").width()/$("#progress").width()));
    	$("#play").trigger("click");
    });
    //播放结束事件
    $("#audio")[0].onended=function(){
    	clearInterval(timer);
    	console.log("end")
    	index++;
    	if(mylist[index]){
    	ajaxSong(mylist[index]);
    	$("#audio")[0].load();
    	} else if(mylist[0]){
    		ajaxSong(mylist[0]);
    		index=0;
    	}
    	
    }
    
   
    
    
}
