var app;
var arr2=[];
var length=31;
var res;
function loadnews(){
		var arr=[];
		
				for (let i = length; i < res.data.length; i++) {
					if(res.data[i].pic.length==0){
						continue;
					} else{
						arr.push(res.data[i])
					}
					if(arr.length==10){
						length=i+1;
						app.newsdata=app.newsdata.concat(arr);
						break
					}
				}
	}
window.addEventListener('load',function(){
	app=new Vue({
	el:'#app',
	data:{
		items:5,
		newsdata:[],
		newscdata:[],
		show:true,
	},
})
	
		$.ajax({
			type:"get",
			url:"http://temp.163.com/special/00804KV1/post1603_api_all.js?callback=callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				res=data;
				var arr=[];
				for (let i = 0; i < data.data.length; i++) {
					if(data.data[i].pic.length==0){
						continue;
					} else{
						arr.push(data.data[i])
					}
					if(arr.length==30){
						app.newsdata=app.newsdata.concat(arr);
						break
					}
				}
				
			}
		});  //网易新闻稳定API
	
		
$.ajax({
			type:"get",
			url:"http://cre.mix.sina.com.cn/api/v3/get?callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				var arr=[]
				for (let i = 0; i < data.data.length; i++) {
					if(data.data[i].thumb==""){
						continue;
					} else{
						arr.push(data.data[i])
					}
					if(arr.length==5){
						app.items=arr;
						break
					}
				}
				
			}
		});  //新浪新闻稳定API
		

//$.getJSON('http://cre.mix.sina.com.cn/api/v3/get?callback=cateid=10Q&cre=tianyi&mod=went&merge=3&statics=1&length=5&up=0&down=0&fields=media',function(data){
//	console.log(data)
//})
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
function getNews(type,page){
			
			$.ajax({
			type:"get",
			url:`http://cre.mix.sina.com.cn/api/v3/get?callback&cateid=1&cre=tianyi&mod=${type}&merge=3&statics=1&length=20&up=${page}&down=0&fields=media`,
			dataType:"jsonp",
//			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				
				for (let i = 2; i < data.data.length; i++) {
					if(data.data[i].thumb==null || data.data[i].mintro==null){
						continue;
					} else{
						arr2.push(data.data[i])
					}
					
				}
				if(arr2.length<20){
					getNews(type,page+1)
				} else{
					app.newscdata=arr2;
				}
				
			}
		});  //新浪娱乐稳定API	
		}