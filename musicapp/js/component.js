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
	template:`<ul id='recommend'><li v-for='songs of recommendSongs' @click='toPlayList(songs.id)'><div class='pic'><img :src='songs.picUrl' /><i class='iconfont icon-bofang1'></i><span class='count'><i class='iconfont icon-erji'></i>{{songs.playCount | count}}万</span></div><div class='detail'>{{songs.name}}</div></li></ul>`,
    props:['recommendSongs'],
    filters:{
    	count:function(val){
    		return (val/10000).toFixed(1);
    	},
    },
    methods:{
    	toPlayList:function(id){
    		location.href="src/playlist.html?id="+id;
    	}
    }
})
Vue.component("recommendtwo",{
	template:`<ul id='recommend-newsongs'><li v-for='songs of newsongs' @click='toplay(songs.id)'><img :src='songs.song.album.picUrl' /><div class='title'><p>{{songs.name}}</p><span>{{songs.song.artists[0].name}}</span></div><i class='iconfont icon-gengduo'></i></li></ul>`,
    props:['newsongs','toplay'],
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
Vue.component("rank",{
	template:`<ul id='rank'><li v-for='(list,index) of lists' class='clear' @click='toPlayList(index)' ><div class='pic floatLeft'><img :src='list.coverImgUrl' /><i class='iconfont icon-bofang1'></i><span class='count'><i class='iconfont icon-erji'></i>{{list.playCount | count}}万</span></div><div class='detail floatLeft'><ul><li>1&nbsp{{list.tracks[0].name}}<span>&nbsp-&nbsp{{list.tracks[0].artists[0].name}}</span></li><li>2&nbsp{{list.tracks[1].name}}<span>&nbsp-&nbsp{{list.tracks[1].artists[0].name}}</span></li><li>3&nbsp{{list.tracks[2].name}}<span>&nbsp-&nbsp{{list.tracks[2].artists[0].name}}</span></li></ul><i class="iconfont icon-xiangyou"></i></div></li></ul>`,
    props:['lists'],
    filters:{
    	count:function(val){
    		return (val/10000).toFixed(1);
    	},
    },
    methods:{
    	toPlayList:function(id){
    		location.href="playlist.html?id="+id;
    	}
    }
})