window.addEventListener('load',function(){
	var app=new Vue({
	el:'#app',
	data:{
		items:5,
		newsdata:[],
	},
})
	$.ajax({
			type:"get",
			url:"http://temp.163.com/special/00804KV1/post1603_api_all.js?callback=callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				app.newsdata=data.data.slice(0,20);
				
			}
		});  //网易新闻稳定API
		
$.ajax({
			type:"get",
			url:"http://cre.mix.sina.com.cn/api/v3/get?callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
//				console.log(data);
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
  
},false)
