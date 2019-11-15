<template>
  <div class="shopMall" style="background:#fff;">
     <div class="home-head iconBg ">
      <div class="home-smWrap"  ref="headHeight" @click="jumpSearch()">
        <div class="home-content"><span class="iconBg searchIcon"></span>请输入要搜索的商品名称 </div>
      </div>
      <div class="home-smWrapA" v-if="homeSmWrap==true" @click="jumpSearch()">
        <div class="home-contenta"> <span class="iconBg searchIconb"></span>请输入要搜索的商品名称</div>
      </div>

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
    <!-- 快捷通道 -->
    <shop-classify></shop-classify>
    <!-- 快捷通道 -->
    <shop-hot></shop-hot>
    <!-- 好物精选 -->
    <shop-thing></shop-thing>
    <!-- 活动专区 -->
    <activity-area></activity-area>
    <!-- 为你推荐 -->
    <shop-foryou></shop-foryou>
    <!-- 回到顶部 -->
    <div class="fixOut" style="bottom:0px;">
        <div class="relOut">
            <div class="goTop" @click="goTop()" v-if="homeSmWrap"></div>
        </div>
    </div>

    <banner v-model="showDialog" ref="banner" :data="data"></banner>
  </div>
</template>

<script>
import Swiper from 'swiper';
import api from '../../service/api'
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      homeSmWrap: false,
      searchCont: '',
      banList: [],
      swiperBan: '',
      timeout: null,
      searchLogo: LOGO_PACKAGE_URL + 'logo.png',
      data: '',
      showDialog: false
    };
  },
  computed: {
    ...mapGetters({
      showBanner: 'shopMall/getShowBanner',
      showTime: 'shopMall/getShowTime'
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.banner()
    this.getBanner()
  },
  methods: {
    ...mapActions({
      setShowBanner :'shopMall/setShowBanner',
      setShowTime :'shopMall/setShowTime'
    }),
    // 回到顶部
    goTop() {
      document.body.scrollTop -= 500;
      document.documentElement.scrollTop -= 500;
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.goTop(), 16);
      } else {
        clearTimeout(c);
      }
    },
    jumpSearch(){
      this.$router.push({path:'/searchPage'})
    },
    // banner
    banner: function() {
      let _this = this;
      this.axios(testUrl + api.goodsGroups, {
        "id": "17fc24c6d6b14669bc48443b31c9a6fa"
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            _this.banList = data.data.data;
            _this.$nextTick(function() {
              _this.swiperBan = new Swiper('.home-head .swiper-container', {
                autoplay:_this.banList.length>1?true:false,
                loop: _this.banList.length>1?true:false,
                allowTouchMove:_this.banList.length>1?true:false,
                pagination: _this.banList.length>1?{el:'.swiper-pagination'}:'',
              });
            })
          } else {
            this.Toast(data.message)
          }
        })
        .catch((err) => {
        })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < this.$refs.headHeight.offsetHeight) {
        this.homeSmWrap = false;
      } else {
        this.homeSmWrap = true;
      }
    },
    async getBanner() {
      try {
        const { data, error_code, message } = await this.axios(testUrl + api.goodsGroups, {id: "e284f81c03a5421e9f923b553ae0ae2b"}, 'post')
        this.data = data
        let expireTime = Date.parse(new Date((data.title).trim().replace(/-/g, '/')))
        let time = expireTime - Date.parse(new Date())
        if (expireTime !== this.showTime && time > 0) {
          this.setShowTime(expireTime)
          this.setShowBanner(true)
        }
        this.showDialog = (time > 0 && this.showBanner)
      } catch(e) {
        this.Toast(e)
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    ShopClassify:()=>import('./components/ShopClassify'),
    ShopHot:()=>import('./components/ShopHot'),
    ShopThing:()=>import('./components/ShopThing'),
    Banner:()=>import('./components/Banner'),
    ShopForyou:()=>import('./components/ShopForyou'),
    ActivityArea:()=>import('./components/activityArea'),
  }
};
</script>


<style lang="scss">
.link-url {
  margin-right: 100px;
  &:last-of-type {
    margin-right: 0;
  }
}

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

.home-head {
  position: relative;
  width: 100%;
  height: 4.12rem;
  background-image: url('/static/images/superMark/bg.png');
  margin-bottom: 1.05rem;
  background-color: #fff;
  .home-smWrap{
    color: #999999;
    margin: 0.98rem auto 0.3rem auto;
    .home-content{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.7rem;
       width:6.9rem;
           border-radius: 50px;
           background: #fff;
               margin: 0 auto;
    }
  }
  .home-smWrapA {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    height: 1.16rem;
    background: #30CE84;
    padding: 0.24rem 0.3rem;
    color: #FFFFFF;
    width: 100%;
    box-sizing: border-box;
    .home-contenta{
      background: #26A56A;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.home-head {
  .swiper-container {
    width: 92%;
    height: 160px;
    border-radius: 10px;
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
}

.focusFixed {
  position: fixed;
}
.goTop {
    position: absolute;
    bottom: 1.6rem;
    z-index: 11;
    background: rgba(0, 0, 0, 0.5);
    width: 0.8rem;
    height: 0.8rem;
    right: 0.2rem;
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(/static/images/goTop.png);
        background-size: 25px
    }
}
.searchIcon{
   background-image: url('/static/images/superMark/searchg.png');
   width: 0.34rem;
   height: 0.34rem;
   margin-right: 0.2rem;
}
.searchIconb{
   background-image: url('/static/images/superMark/searchb.png');
   width: 0.34rem;
   height: 0.34rem;
    margin-right: 0.2rem;
}
</style>
<style>
@media screen and (min-width: 600px){
  .home-smWrapA{
    left: 50% !important;
    transform: translateX(-50%);
    max-width: 450px;
  }
}
</style>

