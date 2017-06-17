Vue.component("swiper",{
	template:'<div class="swiper-container" id="banner"><div class="swiper-wrapper"><div class="swiper-slide" v-for="item of items"><a :href="item.surl"><img :src="item.thumb"/><div class="newsTitle">{{item.mtitle}}</div></a></div></div><div class="swiper-pagination"></div></div>',
    props:['items'],

})
Vue.component('news',{
	template:"<ul id='newslist'><li v-for='datas of newsdata' class='clear' @click='links(datas.url)'><div class='text floatLeft'><h4>{{datas.title}}</h4><p><span class='source'>{{datas.source}}</span>&nbsp&nbsp&nbsp<span class='ptime'>{{datas.ptime}}</span></p></div><img :src='datas.pic[0]' class='floatLeft' /><span class='del floatLeft' @click.stop='del'>X</span></li></ul>",
	props:['newsdata'],
	methods:{
		del:function(ev){
			ev.target.parentElement.parentElement.removeChild(ev.target.parentElement)
		},
		links:function(url){
				window.location.href=url
		}
	}
})
Vue.component('newsc',{
	template:"<ul id='newslist'><li v-for='datas of newscdata' class='clear' @click='links(datas.surl)'><div class='text floatLeft'><h4>{{datas.mintro}}</h4><p><span class='source'>{{datas.media}}</span>&nbsp&nbsp&nbsp<span class='ptime'>{{today}}</span></p></div><img :src='datas.thumb' class='floatLeft' /><span class='del floatLeft' @click.stop='del'>X</span></li></ul>",
	props:['newscdata'],
	methods:{
		del:function(ev){
			ev.target.parentElement.parentElement.removeChild(ev.target.parentElement)
		},
		links:function(url){
			window.location.href=url
		}
	},
	computed:{
		today:function(){
			var time=new Date()
			return (time.getMonth()+1)+"月"+time.getDate()+"日";
		}
	}
})
Vue.component('snews',{
	template:"<ul id='newslist'><li v-for='datas of newsdata' class='clear' @click='open(datas.url)'><div class='text floatLeft'><h4>{{datas.origin_title}}</h4><p><span class='source'>{{datas.media}}</span>&nbsp&nbsp&nbsp<span class='ptime'>{{datas.datetime}}</span></p></div><img :src='datas.imgurl' class='floatLeft' /></li></ul>",
	props:['newsdata'],
	methods:{
		open:function(url){
			location.href=url;
		}
	}
})
Vue.component('search',{
	template:"<ul id='list'><li v-for='key of keyrs' class='result-list' @click='getResult'><img src='../img/SVG/search.svg' /><span class='highlight'>{{keywords}}</span>{{key | after}}</li></ul>",
	props:['keywords','keyrs'],
	
	filters:{  //关键字高亮
		after:function(val){
			var len=txt.value.length;
			return val.substr(len)
		}
	},
	methods:{
		getResult:function(ev){
			console.log(ev.target.innerText);
			
		}
	}
})
