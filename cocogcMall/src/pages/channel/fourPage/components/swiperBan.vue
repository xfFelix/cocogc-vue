<template>
<div class="channel-banner" :class="keyName">
    <div class="swiper-container">
      <!-- 页面 -->
      <div class="swiper-wrapper">
        <div class="swiper-slide banner-slide" v-for="(item,index) in banList" :key="index">
          <a :href="item.url" class="banner-slidea">
            <img :src="item.src" alt="" class="">
          </a>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
</div>

</template>

<script>
import Swiper from 'swiper';
import api from '@/service/api'
import {mapGetters} from 'vuex';
  export default {
    props:{
      keyId:String,
      keyName:String
    },
    data:()=>({
      banList: [],
      swiperBan: '',
    }),
    watch:{
      channelName:{
        handler:function(newName, oldName){
          if(newName == this.keyName){
            this.banner()
          }
        },
        immediate:true,
      },
    },
    computed: {
      ...mapGetters({
          channelName: 'channel/getTypeName'
      })
    },
    methods:{
      banner: function() {
        let _this = this;
        this.axios(testUrl + api.goodsGroups, {
          "id": this.keyId
        }, 'post')
          .then((data) => {
            if (data.error_code == 0) {
              _this.banList = data.data.data;
              _this.$nextTick(function() {
                _this.swiperBan = new Swiper(`.channel-banner.${this.keyName}  .swiper-container`, {
                    loop: _this.banList.length>1?true:false,
                    autoplay: _this.banList.length>1?true:false,
                    allowTouchMove:_this.banList.length>1?true:false,
                    pagination: _this.banList.length>1?{el: '.swiper-pagination'}:'',
                });
              })
            } else {
              this.Toast(data.message)
            }
          })
          .catch((err) => {
          })
      },
    },
    mounted() {
      // this.banner()
    },
  }
</script>

<style lang="scss" scoped>
.channel-banner{
  margin-top: -3.7rem;
  .banner-slide {
    img {
      width: 100%;
    }
    .banner-slidea {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .swiper-container {
    width:6.9rem;
    height: 3.2rem;
    border-radius: 0.2rem;
  }
}
</style>
<style lang="scss">
.channel-banner{
  .swiper-pagination {
    .swiper-pagination-bullet {
      height: 0.07rem;
      border-radius: inherit;
      background: #605c61;
      transform:skew(-30deg); /*设置倾斜度为-30*/
      -webkit-transform: skew(-30deg);
      -moz-transform: skew(-30deg);
      -o-transform:skew(-30deg);
      -ms-transform:skew(-30deg);
      width: 0.15rem;
    }
    .swiper-pagination-bullet-active {
      background: #fff;
      width: 0.45rem;
    }
  }
}
</style>
