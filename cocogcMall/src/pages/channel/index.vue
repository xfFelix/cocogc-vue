<template>
  <div class="channel">
    <div class="nav-fixed" :class="tabBg">
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab-container1">京东商城</mt-tab-item>
        <mt-tab-item id="tab-container2">小椰超市</mt-tab-item>
        <mt-tab-item id="tab-container3">网易严选</mt-tab-item>
        <mt-tab-item id="tab-container4">天涯严选</mt-tab-item>
      </mt-navbar>
        <div class="channel-name-wrap flex" >
          <span class="channel-name">{{tabName}}</span>
          <p class="channel-search flex" @click="goSearch()"><span class="iconBg searchIcon"></span>请输入要搜索的商品名称</p>
        </div>
    </div>


    <div class="page-navbar">
      <div  v-show="selected=='tab-container1'">
        <div class="head-ban jd"></div>
        <swiper-Ban :keyId="`1e0615c5b4b54caf97a366059249017d`" :keyName="`jingDong`"></swiper-Ban>
        <jingDong></jingDong>
      </div>

      <div  v-show="selected=='tab-container2'">
        <div class="head-ban yy"></div>
        <swiper-Ban :keyId="`683802f5671b4596b596d58402d92c4d`" :keyName="`yeyun`"></swiper-Ban>
        <yeYun></yeYun>
      </div>

      <div  v-show="selected=='tab-container3'">
        <div class="head-ban wy"></div>
        <swiper-Ban :keyId="`592a7c52f58344ba8c9acc42258d02d4`" :keyName="`WangYiYanXuan`"></swiper-Ban>
        <wangYi></wangYi>
      </div>

      <div  v-show="selected=='tab-container4'">
        <div class="head-ban ty"></div>
        <swiper-Ban :keyId="`ee3d9939c33b482fa866fc0767fb10d6`" :keyName="`TianYaYanXuan`"></swiper-Ban>
        <tianYa></tianYa>
      </div>
    </div>

    <integral :keyName="keyName"></integral>

  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
export default {
  data:()=>({
       selected: '',
       tabBg:'jd',
       tabName:'京东商城',
       keyName:'',
       tabList:[
         {name:'京东商城'},
         {name:'小椰超市'},
         {name:'网易严选'},
         {name:'天涯严选'},
       ],
       keyId:'',
  }),
  computed: {
    ...mapGetters({
        getChannelId: 'channel/getTypeId'
    })
  },
  watch:{
    selected (val) {
      switch (val){
        case 'tab-container1':
          this.tabBg='jd';
          this.tabName = '京东商城';
          this.keyName='jingDong';
          this.setTypeId(1);
          break;
        case 'tab-container2':
          this.tabBg='yy';
          this.tabName = '小椰超市';
          this.keyName='yeyun';
          this.setTypeId(2);
          break;
        case 'tab-container3':
          this.tabBg='wy';
          this.tabName = '网易严选';
          this.keyName='WangYiYanXuan';
          this.setTypeId(3);
          break;
        case 'tab-container4':
          this.tabBg='ty';
          this.tabName = '天涯严选';
          this.keyName='TianYaYanXuan';
          this.setTypeId(4);
          break;
      }
      window.scrollTo(0, 0);
    }
  },
  methods:{
    ...mapActions({
        setTypeId: 'channel/setTypeId',
        setVendorFlag:'channel/setVendorFlag'
    }),
    goSearch(){
      this.$router.push({path:'/searchPage'});
      this.setVendorFlag(true)
    }
  },
  components:{
    wangYi:()=>import ('./fourPage/wangyi'),
    tianYa:()=>import ('./fourPage/tianya'),
    jingDong:()=>import ('./fourPage/jingdong'),
    yeYun:()=>import ('./fourPage/yeyun'),
    integral:()=>import ('./fourPage/components/integral'),
    'swiper-Ban':()=>import ('./fourPage/components/swiperBan'),
  },
  mounted() {
    this.setVendorFlag(false)
    this.selected = `tab-container${this.getChannelId}`;
  },
}
</script>


<style lang="scss" scoped>
.channel{
  // touch-action: none;
  height: 100%;
  line-height: 100%;
  background: #FFFDFB;
  .head-ban{
    height: 3.53rem;
    border-radius:0 0 0.5rem 0.5rem;
    margin-bottom: 2.39rem;
  }
  .nav-fixed{
      position:fixed;
      z-index: 1000;
      width: 100%;
  }
  .jd{
      background: #F30212!important;
    }
  .yy{
      background: #32CE84!important;
    }
  .ty{
      background: #9ED45A!important;
    }
  .wy{
      background: #F74C3F!important;
    }
    .mint-navbar{
      background: transparent;
      .mint-tab-item{
        color: #fff;
        margin: 0 4%;
      }
      .mint-tab-item.is-selected{
        border-bottom:3px solid #fff;
      }
    }
  .flex{
    display: flex;
    align-items: center;
  }
  .channel-name-wrap{
    margin: 0.28rem 0 0.1rem 0;
    .channel-name{
      color: #ffffff;
      font-size: 0.43rem;
      margin: 0 0.28rem;
    }
    .channel-search{
      color: #999999;
      font-size: 0.26rem;
      height: 0.61rem;
      border-radius: 0.31rem;
      background: #fff;
      width: 100%;
      margin-right:0.28rem;
      justify-content:center;
      flex:1;
      .searchIcon{
        background-image:url(/static/images/superMark/searchg.png);
        width:0.33rem;
        height:0.33rem;
        margin-right: 0.09rem;
      }
    }
  }
}

</style>
<style lang="scss">
.mt-tab-container{
  min-height: 100%;
}
.channel{
    .mint-tab-item-label {
      font-size: 0.3rem;
      line-height:1;
      font-weight: bold;
    }
    .mint-navbar{
      .mint-tab-item{
        padding:0.34rem 0 0.14rem 0;
      }
    }
}
@media screen and (min-width: 600px) {
  .channel,.nav-fixed{
    max-width: 450px;
  }
}

</style>
