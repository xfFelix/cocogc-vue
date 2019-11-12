<template>
  <div class="activityArea">
    <div class="active-title flexB">
      <span class="title">活动专区</span>
      <span class="name" @click="goSee()">去看看></span>
    </div>
    <div class="active-content">
      <div class="swiper-container banSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide banner-slide" v-for="(item,index) in banList" :key="index"  @click="banPath(item)">
            <img :src="item.src" :alt="item.title"/>
          </div>
        </div>
      </div>

      <div class="swiper-container goodSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in goodsList" :key="index">
            <div class="home-hGoodsW" @click="goodsPath(item)">
              <img :src="item.picUrl" :alt="item.name" />
              <p class="name">
                {{item.name}}
              </p>
              <p class="money flexC">
                <span class="iconBg iconLogo"></span>
                {{item.currentPrice|toDecimal2}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Swiper from 'swiper';
import api from '@/service/api'
export default {
  data: () => ({
    banList: [],
    goodsList: []
  }),
  methods: {
    banSwiper: function() {
      this.axios(testUrl + api.goodsGroups,{id: "824af88ea0104f5397987f24d43f9c47"},"post")
        .then(data => {
          if (data.error_code == 0) {
            this.banList = data.data.data;
            this.$nextTick(function() {
              this.swiperRank = new Swiper(".banSwiper.swiper-container", {
                loop: this.banList.length>1?true:false,
                freeMode: false,
                allowTouchMove:this.banList.length>1?true:false,
              });
            });
          } else {
            this.Toast(data.message);
          }
        })
        .catch(err => {
          this.Toast(err.message);
        });
    },
    goodSwiper: function() {
      this.axios(testUrl + api.goodsGroups,{id: "f92b7b5193b6418c8cc4ed4a03bb4678"},"post")
        .then(data => {
          if (data.error_code == 0) {
            this.goodsList = data.data.goodsList;
            this.$nextTick(function() {
              this.swiperRank = new Swiper(".goodSwiper.swiper-container", {
                loop: this.goodsList.length>3?true:false,
                slidesPerView: 3,
                freeMode: true
              });
            });
          } else {
            this.Toast(data.message);
          }
        })
        .catch(err => {
          this.Toast(err.message);
        });
    },
    banPath(item){
      window.location.href=item.url;
    },
    goSee(){
       window.location.href=this.banList[0].url;
    },
    goodsPath(item){
      this.$router.push({path:`/goodsDetail/${item.id}`})
    }
  },
  mounted() {
    this.banSwiper();
    this.goodSwiper()
  }
};
</script>
<style lang="scss" scoped>
.activityArea{
  width: 92%;
  margin: 0.46rem auto 0.6rem auto;

  .active-content{
    box-shadow: 0px 0px 0.28rem 0px rgba(180, 180, 180, 0.24);
    border-radius: 0.1rem;
    padding-bottom: 0.4rem;
  }
  .flexB{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flexC{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active-title{
    .title{
      color: #333333;
      font-size: 0.32rem;
      font-weight: bold;
    }
    .name{
      color: #fe6701;
      font-size: 0.24rem;
    }
  }
  .banSwiper{
    height: 3.42rem;
    margin: 0.26rem 0 0.4rem 0;
    img{
      border-radius: 0.1rem;
    }
  }
  .goodSwiper{
    .home-hGoodsW{
      width: 66%;
      margin: 0 auto;
    }
    img{
      border-radius: 0.04rem;
    }
    .name{
      height:3em;
      line-height:1.5;
      word-break:break-all;
      word-wrap:break-word;
      overflow:hidden;
      font-size: 0.24rem;
      color: #333333;
      margin:0.24rem 0 0.14rem 0;
      text-align:center;
    }
    .money{
      .iconLogo{
        width: 0.26rem;
        height: 0.26rem;
        background-image: url("/static/images/logo/jd.png");
        margin-right:2px;
      }
    }
  }
}
</style>
