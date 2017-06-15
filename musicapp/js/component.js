Vue.component("swiper",{
	template:`<div class="swiper-container" id="banner">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for='item of items'><a :href="item.url"><img :src='item.pic'/></a></div>
  </div>
  <div class="swiper-pagination"></div>
  
</div>`,
    props:['items'],

});
Vue.component("recommend",{
	template:`<ul id='recommend'><li v-for='songs of recommendSongs'><div class='pic'><img :src='songs.picUrl' /><i class='iconfont icon-bofang1'></i><span class='count'><i class='iconfont icon-erji'></i>{{songs.playCount | count}}万</span></div><div class='detail'>{{songs.name}}</div></li></ul>`,
    props:['recommendSongs'],
    filters:{
    	count:function(val){
    		return (val/10000).toFixed(1);
    	},
    },
})
Vue.component("recommendtwo",{
	template:`<ul id='recommend-newsongs'><li v-for='songs of newsongs'><img :src='songs.song.album.picUrl' /><div class='title'><p>{{songs.name}}</p><span>{{songs.song.artists[0].name}}</span></div><i class='iconfont icon-gengduo'></i></li></ul>`,
    props:['newsongs'],
    filters:{
    	count:function(val){
    		return (val/10000).toFixed(1);
    	},
    },
})
Vue.component("redj",{
	template:`<ul id='redj'><li v-for='dj of djs'><div class='pic'><img :src='dj.picUrl' /><i class='iconfont icon-bofang1'></i></div><div class='title'><p class='rcmdtext'>{{dj.rcmdtext}}</p><p class='name'>主播:{{dj.name}}</p><span><i class='iconfont icon-erji'></i>{{dj.subCount}}</span></div></li></ul>`,
    props:['djs'],
    
})
