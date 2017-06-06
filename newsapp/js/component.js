Vue.component("swiper",{
	template:`<div class="swiper-container" id="banner">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for='item of items'><a :href="item.surl"><img :src='item.thumb'/><div class="newsTitle">{{item.mtitle}}</div></a></div>
  </div>
  <div class="swiper-pagination"></div>
  
</div>`,
    props:['items'],

})
Vue.component('news',{
	template:`<ul id='newslist'><li v-for='datas of newsdata' class='clear'><div class='text floatLeft'><h4>{{datas.title}}</h4><p><span class='source'>{{datas.source}}</span>&nbsp&nbsp&nbsp<span class='ptime'>{{datas.ptime}}</span></p></div><img :src='datas.pic[0]' class='floatLeft' /><span class='del floatLeft' @click='del'>X</span></li></ul>`,
	props:['newsdata'],
	methods:{
		del:function(ev,el){
			ev.target.parentElement.parentElement.removeChild(ev.target.parentElement)
		}
	}
})
Vue.component('snews',{
	template:`<ul id='newslist'><li v-for='datas of newsdata' class='clear'><div class='text floatLeft'><h4>{{datas.origin_title
}}</h4><p><span class='source'>{{datas.media}}</span>&nbsp&nbsp&nbsp<span class='ptime'>{{datas.datetime}}</span></p></div><img :src='datas.imgurl' class='floatLeft' /></li></ul>`,
	props:['newsdata'],
	
})
Vue.component('search',{
	template:`<ul id='list'><li v-for='key of keyrs' class='result-list' @click='getResult'><img src='../img/SVG/search.svg' /><span class='highlight'>{{keywords}}</span>{{key | after}}</li></ul>`,
	props:['keywords','keyrs'],
	
	filters:{
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