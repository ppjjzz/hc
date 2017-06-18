var rankArr=[];
var app=new Vue({
	el:"#app",
	data:{
		lists:[],
	}
})
if(sessionStorage.getItem("ranklist")){
	app.lists=JSON.parse(sessionStorage.getItem("ranklist"))
} else{
	for (var i=0;i<22;i++) {
	$.getJSON("http://119.29.111.179:3000/top/list?idx="+i,function(data){
		rankArr.push(data.result);
		app.lists=rankArr;
		sessionStorage.setItem("ranklist",JSON.stringify(rankArr));
		if(rankArr.length==22){
			console.log(rankArr);
			app.lists=rankArr;
			sessionStorage.setItem("ranklist",JSON.stringify(rankArr));
			
		}
	})
}
}

