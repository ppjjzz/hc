var mySwiper;
var app2;
var id=location.search.slice(1).split("=")[1];
console.log(id);
window.onload=function(){

    app2=new Vue({
    	el:"#app2",
    	data:{
    		lycs:[],
    		mp3:'',
    		bg:'',
    		name:'',
    		artic:'',
    		zhuanji:'',
    	},
    	filters:{
    		f:function(val){
    			return val.slice(5);
    		}
    	}
    	
    })
    var audio=document.getElementById("audio");
    audio.oncanplay=function(){
    	showDuration();
    }
    function showDuration(){
    	var countTime=parseInt(audio.duration);
    audio.volume=1;
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
    
    var timer;
    var flag=true;
    function showTime(){
    	var countTime=parseInt(audio.currentTime);
    			var cost=parseInt(audio.currentTime)/parseInt(audio.duration);
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
    $("#play").on("click",function(){
    	clearInterval(timer);
    	if(flag){
    		audio.play();
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
    						scrollTop:"+="+$(".right li").innerHeight()
    					},300)
    					}
    				}
    			}
    			
    			showTime();
    		},1000);
    		
    	$(this).addClass("icon-zanting");
    	} else{
    		audio.pause();
    		$(".bpic").css({
    			animation:""
    		});
    		$(this).removeClass("icon-zanting");
    	}
    	flag=!flag;
    });
    var loop=true;
    $("#loop").click(function(){
    	if(loop){
    		audio.loop=true;
    	$(this).css("color","white");
    	} else{
    		audio.loop=false;
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
    		audio.currentTime=parseInt(audio.duration*($("#ing").width()/$("#progress").width()));
    		showTime();
    	} else{
    		$("#ing").width($("#progress").width());
    	}
    	
    });
    $("#progress").on("touchend",function(){
    	audio.currentTime=parseInt(audio.duration*($("#ing").width()/$("#progress").width()));
    	$("#play").trigger("click");
    });
    audio.onended=function(){
    	clearInterval(timer);
    }
    var arr2=[];
    //歌词AJAX
    $.getJSON("http://localhost:3000/lyric?id="+id,function(data){
    	var arr=data.lrc.lyric.split("\n");
    	console.log(arr);
    	
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
    $.getJSON("http://localhost:3000/music/url?id="+id,function(data){
    	app2.mp3=data.data[0].url;
    	
    })
    $.getJSON("http://localhost:3000/song/detail?ids="+id,function(data){
    	app2.bg=data.songs[0].al.picUrl;
    	app2.zhuanji=data.songs[0].al.name;
    	app2.name=data.songs[0].name;
    	app2.artic=data.songs[0].ar[0].name;
    })
}
