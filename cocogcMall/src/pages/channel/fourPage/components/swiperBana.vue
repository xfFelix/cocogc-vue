<template>
<div class="channel-bannera">
      <!-- 图片 -->
      <div class="index-swipeW" :class="keyName">
        <div class="index-swipe">
          <div class="swiper-container" style="height:2rem">
            <!-- 页面 -->
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) of banner" :key="index">
                <a :href="item.url">
                  <img :src="item.src" alt="">
                </a>
              </div>
            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import api from '@/service/api';
import {mapGetters} from 'vuex';
  export default {
    props:{
      keyBana:String,
      keyName:String
    },
    data:()=>({
       banner: [],
    }),
    computed: {
      ...mapGetters({
          channelName: 'channel/getTypeName'
      })
    },
    watch:{
      channelName:{
        handler:function(newName, oldName){
          if(newName == this.keyName){
            this.getBanner()
          }
        },
        immediate:true,
      },
    },
    methods:{
      async getBanner() {
        let _this = this;
        let banner = await this.axios(testUrl + api.goodsGroups, {
          "id": this.keyBana
        }, 'post')
        _this.banner = banner.data.data;
        this.$nextTick(() => {
          var swiperBan = new Swiper(`.channel-bannera .${this.keyName} .swiper-container`, {
            loop: _this.banner.length>1?true:false,
            autoplay: _this.banner.length>1?true:false,
            allowTouchMove:_this.banner.length>1?true:false,
            pagination: {
              el: '.swiper-pagination',
              bulletClass : 'my-bullet',
              bulletActiveClass: 'my-bullet-active'
            },
          })
        })
      },
    },
     mounted() {
      // this.getBanner()
    },
  }
</script>
<style lang="scss">
@import '../../../../scss/mixin.scss';
.channel-bannera{
  .index-swipeW {
    margin: px2rem(10) px2rem(10) px2rem(10) px2rem(10);
    img {
      width: 100%;
      border-radius:10px;
    }
  }
}
</style>
