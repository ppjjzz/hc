var id=location.search.slice(1).split("=")[1];
var mylist=JSON.parse(sessionStorage.getItem("mylist"));
var ranklist=JSON.parse(sessionStorage.getItem("ranklist"));
var listAll=[];
console.log(ranklist,id)
window.onload=function(){
	var app=new Vue({
		el:"#app",
		data:{
			listName:'',
			bgpic:'',
			list:[],
			which:true,
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
			}
		}
	})
	if(id.length<=2){
		app.which=false;
		app.listName=ranklist[id].name;
		app.bgpic=ranklist[id].coverImgUrl;
		app.list=ranklist[id].tracks;
		for (var i=0;i<ranklist[id].tracks.length;i++) {
			listAll.push(ranklist[id].tracks[i].id);
		}
	} else{
		$.getJSON("http://119.29.111.179:3000/playlist/detail?id="+id,function(data){
		app.listName=data.playlist.name;
		app.bgpic=data.playlist.coverImgUrl;
		app.list=data.playlist.tracks;
		for (var i=0;i<data.playlist.tracks.length;i++) {
			listAll.push(data.playlist.tracks[i].id);
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
