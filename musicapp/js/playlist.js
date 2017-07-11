var id,
    zhuanji,
    singerId,
    app;
    
var pram=location.search.slice(1).split("=");
if(pram[0]=="zhuanjiId"){
	zhuanji=pram[1];
} else if(pram[0]=="id"){
	id=pram[1];
} else{
	singerId=pram[1];
}
var mylist=JSON.parse(sessionStorage.getItem("mylist"));
var ranklist=JSON.parse(sessionStorage.getItem("ranklist"));
var listAll=[];
console.log(ranklist,id,singerId)
window.onload=function(){
	 app=new Vue({
		el:"#app",
		data:{
			listName:'',
			bgpic:'',
			list:[],
			which:true,
			type:"单曲",
			singer:false,
			als:[],
		},
		methods:{
			add:function(id,ev){
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
			toPlay:function(){
				sessionStorage.setItem("mylist",JSON.stringify(mylist))
				location.href="play.html";
			},
			toPlayAll:function(){
				sessionStorage.setItem("mylist",JSON.stringify(listAll))
				location.href="play.html";
			},
			toPlayId:function(id){
				location.href="play.html?id="+id;
			},
			toList:function(id){
				getzj(id);
				$(window).scrollTop(0);
				$(".ttop").removeClass("totop");
				app.singer=false;
				app.which=true;
				$("#list").addClass("list");
				$("header").removeClass("htop")
				document.onscroll=function(){
		var mt=$("section").outerHeight(true)-$("section").outerHeight()
		if(($(window).scrollTop()+$("header").outerHeight(true))>mt){
			$(".ttop").addClass("totop");
			$(".ttop").css({
				"top":$("header").outerHeight(true),
			})
			$("section").css({
				"marginTop":($("header").outerHeight(true)+$(".ttop").outerHeight()+$(document).scrollTop())
			})
			$("header").addClass("htop")

			document.onscroll=null;
		} else{
			$(".bgpic>img").css({
				filter:"blur("+($(window).scrollTop()/25)+"px)"
			})
		}
		
	}
			}
		}
	})
	if(id){
		if(id.length<=2){
		app.which=false;
		app.listName=ranklist[id].name;
		app.bgpic=ranklist[id].coverImgUrl;
		app.list=ranklist[id].tracks;
		for (var i=0;i<ranklist[id].tracks.length;i++) {
			listAll.push(ranklist[id].tracks[i].id);
		}
	} else{
		$.getJSON("http://139.199.204.216:3000/playlist/detail?id="+id,function(data){
		app.listName=data.playlist.name;
		app.bgpic=data.playlist.coverImgUrl;
		app.list=data.playlist.tracks;
		for (var i=0;i<data.playlist.tracks.length;i++) {
			listAll.push(data.playlist.tracks[i].id);
		}
		
	})
	}
	} else if(zhuanji){
		getzj(zhuanji);
	} else{
		$.getJSON("http://139.199.204.216:3000/artist/album?id="+singerId+"&limit=30",function(data){
			console.log(data)
			$(".list").removeClass("list");
			app.bgpic=data.artist.picUrl;
			app.als=data.hotAlbums;
			app.listName=data.artist.name;
			app.which=false;
			app.singer=true;
			app.type="专辑";
		})
	}
	function getzj(id){
		$.getJSON("http://139.199.204.216:3000/album?id="+id,function(data){ //获取专辑详情
			console.log(data)
			app.bgpic=data.album.picUrl;
			app.listName=data.album.name;
			app.list=data.songs;
			for (var i=0;i<data.songs.length;i++) {
			listAll.push(data.songs[i].id);
		}
		})
	}
	
	document.onscroll=function(){
		var mt=$("section").outerHeight(true)-$("section").outerHeight()
		if(($(window).scrollTop()+$("header").outerHeight(true))>mt){
			$(".ttop").addClass("totop");
			$(".ttop").css({
				"top":$("header").outerHeight(true),
			})
			$("section").css({
				"marginTop":($("header").outerHeight(true)+$(".ttop").outerHeight()+$(document).scrollTop())
			})
			$("header").addClass("htop")

			document.onscroll=null;
		} else{
			$(".bgpic>img").css({
				filter:"blur("+($(window).scrollTop()/25)+"px)"
			})
		}
		
	}
	
}
