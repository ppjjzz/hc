
var app2;
$(function(){
	
	
	app2=new Vue({
		el:'#app2',
		data:{
			keyword:'',
			keyrs:[],
			show:true,
			result:[],
			showrs:false,
		},
		watch:{
			keyword:function(val){
				if(txt.value!=" "){
					request(val);
				}
				if(txt.value==""){
					this.keyrs=[];
				}
			}
		}
	})
	

    function request(key){
    	$.ajax({
			type:"get",
			url:"https://www.toutiao.com/search/sug/?keyword="+key,
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
//				console.log(data);
				
				app2.keyrs=data.data;
			}
		});  //新浪搜索稳定API
    }
    function searchResult(key){
    	$.ajax({
			type:"get",
			url:"http://api.search.sina.com.cn/?c=news&q="+key+"&stime=2016-06-05&etime=2017-06-07&sort=rel&highlight=1&num=10&ie=utf-8&callback",
			dataType:"jsonp",
			jsonpCallback:"callback",
			success:function (data){
				console.log(data);
				app2.result=data.result.list
			}
		});  //新浪搜索稳定API
    }
    
    $("#list").on('click',"li",function(){
    	searchResult($(this).text());
    	app2.show=false;
    	app2.showrs=true;
    })
    $("#list").on('touchstart',function(){
    	$("#txt").trigger('blur')
    })
	$("#txt").on("focus",function(){
		$(this).removeClass("blur");
		$(this).attr("placeholder","");
		app2.show=true;
		app2.showrs=false;
	})
	$("#txt").on("blur",function(){
		if($(this).val()==""){
			$(this).addClass("blur");
			$(this).attr("placeholder","搜索文章、视频、订阅号")
		}
		
	})
	
})
