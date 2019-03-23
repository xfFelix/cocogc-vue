<template>
  <div class="index" id="index">
    <!-- 头部 -->
    <div class="index-head">
      <a href="https://mp.weixin.qq.com/s?__biz=MzU0NDkzNTM3NQ==&mid=100000020&idx=1&sn=127b63d967b7f6a7ca3a5c279143b1ea&chksm=7b75ddb44c0254a2df472ccc626784b2fe09f2b9cf77c1b910b91b8e83a12dae6b801a76e247&xtrack=1&scene=0&subscene=93&clicktime=1552877700&ascene=7&devicetype=android-26&version=2700033b&nettype=WIFI&abtest_cookie=BQABAAgACgALABIAEwAGAJ2GHgAjlx4AVpkeAMOZHgDZmR4A3JkeAAAA&lang=zh_CN&pass_ticket=oDj080h7pGe7HlMtp4xb3XrV7xaXUp9jeLO2aUdHmznoVOKjpo0L6C5vME3ddskV&wx_header=1">
        <div class="ih-noticeW">
          <div class="ih-notice">
            <span class="ih-hormImg j1Png"></span>
              <marquee  style="width: 100%;font-size:0.26rem;" loop="infinite" v-for="(item,index) in newsList" :key="index.title">
                <a :href="item.url" style="color:rgb(255,255,255);">{{item.noticeTitle}}</a>
              </marquee>
          </div>
          <span class="ih-goImg j1Png"></span>
        </div>
      </a>

      <div class="ih-balanceW">
        <div class="ih-balance" v-if="!token">
          <router-link :to="{path:'/login'}" class="ih-nologin">登录查看</router-link>
        </div>

        <div class="ih-balance" v-else-if="token">
          <p class="ih-money">{{loScore.score}}</p>
          <p class="ih-moneya">椰子分</p>
        </div>

        <!-- <div class="ih-recharge" @click="recharge()">
                去充值
              </div> -->

      </div>
    </div>

    <!-- 导航 -->
    <ul class="index-fastNav">
      <li class="ifa-fastNavLi" v-for="(item,index) in fastList" :key="index">
        <router-link :to="item.path" v-if="item.id==4">
          <p class="navImg imgBg" :class="item.imgBg"></p>
          <p class="ifa-name">{{item.name}}</p>
        </router-link>
        <a :href='item.path' :style="(item.path=='javascript:;'? 'color:#ccc':'color:#000')" v-else>
          <p class="navImg imgBg" :class="item.imgBg"></p>
          <p class="ifa-name">{{item.name}}</p>
        </a>

      </li>
    </ul>

    <!-- 图片 -->
    <div class="index-swipeW" style="height: 116px;">
      <div class="index-swipe">
        <div class="swiper-container">
          <!-- 页面 -->
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item of banner" :key="item.title">
              <img :src="item.src" alt="">
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>

    <!-- 热门爆款 -->
    <div class="index-hotGoods">
      <div class="ihot-title">
        <h3>热门爆款</h3>
        <!-- <router-link :to="{path:'/goodsList',query:{salesVolume:'y'}}">查看更多</router-link> -->
      </div>
      <div class="ihot-goodsW">
        <div class="ihot-goods" v-for="(item,index) in goodsList.slice(0, 6)" :key="index">
          <router-link :to="{path:'/goodsDetail/'+item.id}">
            <div class="ihot-goodsImg">
              <img :src="item.picUrl" alt="" />
            </div>
            <p class="ihot-name">{{item.name}}</p>
            <p class="ihot-moneyW">
              <span class="ihot-logo"></span>
              <span class="ihot-money">{{item.currentPrice}}</span>
            </p>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import api from '../../service/api';
import { mapGetters } from 'vuex';
import { getToken } from '@/util/common'

export default {
  name: 'index',
  data() {
    return {
      fastList: [
        { id: 1, name: "黄金兑换", imgBg: 'ifa-imgBg01', path: infoURl + '#!/goldChange?token=' + this.$cookies.get("yeyun_token") },
        { id: 2, name: "话费兑换", imgBg: 'ifa-imgBg02', path: infoURl + '#!/phoneBill?token=' + this.$cookies.get("yeyun_token") },
        { id: 3, name: "信用卡还款", imgBg: 'ifa-imgBg03', path: infoURl + '#!/pay?back=pay&token=' + this.$cookies.get("yeyun_token") },
        { id: 4, name: "兑换商城", imgBg: 'ifa-imgBg09', path: '/layout/shopMall' },
        { id: 5, name: "卡密充值", imgBg: 'ifa-imgBg05', path: infoURl + '#!/charge?token=' + this.$cookies.get("yeyun_token") },
        { id: 6, name: "加油卡兑换", imgBg: 'ifa-imgBg12', path: 'javascript:;' },
        { id: 7, name: "会员卡券", imgBg: 'ifa-imgBg07', path: 'javascript:;' },

      ],
      goodsList: [],
      loginFlag: false,
      token: getToken(),
      banner: [],
      newsList:[]
    }
  },
  created() {
  },
  computed: {
    ...mapGetters({
      loScore: 'userinfo/getUserInfo'
    })
  },
  mounted() {
    this.getBanner()
    this.rank();
    this.getNews();
  },
  components: {
  },
  methods: {
    async getBanner() {
      let banner = await this.axios(testUrl + api.goodsGroups, {
        "id": "a10a220f9aa94dc49c960c77cd783d11"
      }, 'post')
      this.banner = banner.data.data;
      this.$nextTick(() => {
        var swiperBan = new Swiper('.index-swipe .swiper-container', {
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    },
    rank: function() {
      let _this = this;
      this.axios(testUrl + api.goodsGroups, {
        "id": "e2a913cee8b84c97a9a9801375a6a1f7"
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            _this.goodsList = data.data.goodsList;

          } else {
            _this.Toast(data.message);
          }
        })
        .catch((err) => {
          _this.Toast(data.message);
        })
    },
    async getNews() {

      let newsList = await this.axios(infoURl + api.newsList, {
        "catId": 206,
        "startNum": 0,
        "num": 3
      }, 'post')
        .then((data) => {
          if (data.resultCode == 0) {
            this.newsList = data.data;
          } else {
            this.Toast(data.message);
          }
        })
        .catch((err) => {
          this.Toast(data.message);
        })
    },

  }
}
</script>

<style lang="less" scoped>
.index-head {
  background: url("/static/images/indexBg.jpg") no-repeat;
  background-size: 100% 100%;
  height: 1.82rem;
  padding: 0.55rem 0;
  .ih-noticeW {
    width: 88%;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.6rem;
    margin: 0 auto;
    line-height: 0.6rem;
    .ih-notice {
       width: 100%;
      display: flex;
      align-items: center;
      .ih-hormImg {
        width: 0.24rem;
        height: 0.24rem;
        background-position: -4.31rem -1.64rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        display: inline-block;
      }
      p {
        font-size: 0.26rem;
        color: #ffffff;
      }
    }
    .ih-goImg {
      width: 0.24rem;
      height: 0.24rem;
      background-position: -5.6rem -0.8rem;
      margin-right: 0.13rem;
    }
  }
  .ih-balanceW {
    display: flex;
    width: 80%;
    margin-left: 1.23rem;
    justify-content: space-between;
    margin-top: 0.45rem;
    .ih-balance {
      p {
        // margin-top: -0.1rem;
        color: #fff;

        text-align: center;
      }
      .ih-money {
        font-size: 0.48rem;
        font-weight: bold;
        margin-top: -0.1rem;
      }
      .ih-moneya {
        font-size: 0.24rem;
        font-weight: bold;
        margin-top: -0.05rem;
        text-align: center;
      }

      .ih-nologin {
        margin: 0.1rem;
        color: #fff;
        display: block;
        letter-spacing: 1px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.index-fastNav {
  font-size: 0.24rem;
  color: #000;
  padding: 0 0.3rem 0.2rem 0.3rem;
  margin-bottom: 0.2rem;
  background: #fff;
  .ifa-fastNavLi {
    width: 25%;
    text-align: center;
    margin: 0.34rem 0 0.1rem 0;
    display: inline-block;
    .imgBg {
      width: 0.5rem;
      height: 0.5rem;
    }

    .ifa-imgBg01 {
      background-position: -2.34rem -0.11rem;
    }
    .ifa-imgBg02 {
      background-position: -2.92rem -0.11rem;
    }
    .ifa-imgBg03 {
      background-position: -3.49rem -0.04rem;
    }
    .ifa-imgBg04 {
      background-position: -4.12rem -0.08rem;
    }
    .ifa-imgBg05 {
      background-position: -2.69rem -0.7rem;
    }
    .ifa-imgBg06 {
      background-position: -3.23rem -0.7rem;
    }
    .ifa-imgBg07 {
      background-position: -3.79rem -0.7rem;
    }
    .ifa-imgBg08 {
      background-position: -4.34rem -0.7rem;
    }
    .ifa-imgBg09 {
      background-position: -2.69rem -1.34rem;
    }
    .ifa-imgBg10 {
      background-position: -3.23rem -1.34rem;
    }
    .ifa-imgBg11 {
      background-position: -3.79rem -1.34rem;
    }
    .ifa-imgBg12 {
      background-position: -4.34rem -1.34rem;
    }


    .ifa-ImgW {
      width: 0.5rem;
      height: 0.5rem;
      background-position: -0.09rem -0.09rem;
      position: relative;
    }
    .ifa-name {
      padding: 0.15rem 0 0.05rem 0;
    }
  }
}

.index-swipeW {
  margin-bottom: 0.1rem;
  img {
    width: 100%;
  }
}

.index-hotGoods {
  background: #fff;
  padding-bottom: 30px;
  .ihot-title {
    padding: 0 0.4rem 0.2rem 0.33rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.2rem;
    h3 {
      font-size: 0.3rem;
      font-weight: bold;
    }
    a {
      font-size: 0.24rem;
      color: #333333;
    }
  }
  .ihot-goodsW {
    .ihot-goods {
      width: 24%;
      margin: 0 4.66%;
      display: inline-block;
      text-align: center;
      margin-top: 0.11rem;
      .ihot-goodsImg {
        height: 2rem;
        width: 2rem;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }



    .ihot-name {
      font-size: 0.22rem;
      font-weight: bold;
      margin-top: 0.12rem;
      position:relative;
      line-height:1.5em;
      height:3em;
      overflow:hidden;
      word-break: break-all;
      word-wrap: break-word;
      &::after{
        content:"";
				position:absolute;
				bottom:0;
				right:0;
				padding: 0 5px;
				background-color: #fff;
      }
    }
    .ihot-moneyW {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.12rem;
      margin-bottom: 0.4rem;
      .ihot-logo {
        width: 0.28rem;
        height: 0.28rem;
        background-position: -2.57rem -0.78rem;
        background-size: 5.8rem 1.86rem;
        background-repeat: no-repeat;
        background-image: url(/static/images/jl.png);
      }
      .ihot-money {
        font-size: 0.24rem;
        color: #333;
      }
    }
  }
}
</style>
