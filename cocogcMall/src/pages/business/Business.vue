<template>
  <div class="index" id="index">
    <!-- 头部 -->
    <div class="index-head">
        <div class="ih-noticeW">
          <div class="ih-notice">
            <span class="ih-hormImg j1Png"></span>
            <span>椰子分公告：</span>
              <!-- <marquee  style="width: 65%;font-size:0.26rem;" loop="infinite">
                  <div style="display:flex;">
                    <a :href="item.url" class="link-url" v-for="(item,index) in newsList" :key="index.title" v-if="item.status == 0">
                       {{item.noticeTitle}}
                    </a>
                  </div>
              </marquee> -->
              <div id="marquee" style="width:65%;"></div>
          </div>
          <span class="ih-goImg j1Png"></span>
        </div>

      <div class="ih-balanceW">
        <div class="ih-balance" v-if="token">
          <p class="ih-money">{{loScore.score}}</p>
          <p class="ih-moneya">椰子分</p>
        </div>
        <div class="ih-balance" v-else>
          <router-link :to="{path:'/login'}" class="ih-nologin">登录查看</router-link>
        </div>
      </div>
    </div>

    <!-- 导航 -->
    <ul class="index-fastNav">
      <li class="ifa-fastNavLi" v-for="(item,index) in fastList" :key="index">
          <div :style="(item.path=='javascript:;'? 'color:#ccc':'color:#000')" @click="goLink(item)">
            <p class="navImg imgBg" :class="item.imgBg"></p>
            <p class="ifa-name">{{item.name}}</p>
          </div>
      </li>
    </ul>

    <!-- 图片 -->
    <div class="index-swipeW">
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
              <span class="ihot-money">{{item.currentPrice|toDecimal2Fp}}.</span>
              <span class="ihot-money">{{item.currentPrice|toDecimal2Ap}}</span>
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
import mixin from '@/util/mixin'
export default {
  name: 'index',
  mixins: [mixin],
  data() {
    return {
      fastList: [
        { id: 1, name: "黄金兑换", imgBg: 'ifa-imgBg01', path: infoURl + '#!/goldChange?token=' + getToken() },
        { id: 2, name: "话费充值", imgBg: 'ifa-imgBg02', path: infoURl + '#!/phoneBill?token=' + getToken() },
        { id: 3, name: "信用卡还款", imgBg: 'ifa-imgBg00', path: `${infoURl}#!/pay?token=${getToken()}` },
        { id: 4, name: "京东商城", imgBg: 'ifa-imgBg09', path: '/layout/shopMall'},
        { id: 5, name: "加油卡充值", imgBg: 'ifa-imgBg12', path: hostUrl + 'ticket/oil' },
        { id: 6, name: "会员卡券", imgBg: 'ifa-imgBg07', path: hostUrl + 'ticket/memberCard'},
        { id: 7, name: "海南旅游", imgBg: 'ifa-imgBg06', path: `${hostUrl}ticket/static/ticket.html` },
        { id: 8, name: "海南特产", imgBg: 'ifa-imgBg05', path: `${hostUrl}ticket/static/food.html` },
        { id: 9, name: "机票酒店", imgBg: 'ifa-imgBg04', path: 'javascript:;' },
        { id: 10, name: "周大福金饰", imgBg: 'ifa-imgBg08', path: 'javascript:;' },
        { id: 11, name: "小米有品", imgBg: 'ifa-imgBg10', path: 'javascript:;' },
        { id: 12, name: "网易严选", imgBg: 'ifa-imgBg11', path: 'javascript:;' },
      ],
      goodsList: [],
      loginFlag: false,
      token: getToken(),
      banner: [],
      newsList:[],
      autoplay: false
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
  methods: {
    goLink(item) {
      if (item.id === 4) {
        return this.$router.push(item.path)
      }
      if (item.path === 'javascript:;'){
        return
      }
      if (!getToken()) {
        return this.confirmBack()
      }
      window.location.href = item.path
    },
    async getBanner() {
      let banner = await this.axios(testUrl + api.goodsGroups, {
        "id": "a10a220f9aa94dc49c960c77cd783d11"
      }, 'post')
      this.banner = banner.data.data;
      if (this.banner.length >1) {
        this.autoplay = true
      } else {
        this.autoplay = false
      }
      this.$nextTick(() => {
        var swiperBan = new Swiper('.index-swipe .swiper-container', {
          loop: true,
          autoplay: this.autoplay,
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
            let marqueeHtml = document.createElement('div');
            let html = `<marquee  style="font-size:0.26rem;margin-top: 0.2rem;"  scrollamount=7   loop="infinite" >`
            this.newsList.forEach(res => {
              if(res.status == 0){
                 html += `<a href=${res.url} class="link-url" style="color:#fff;margin-right: 50px;">
                       ${res.noticeTitle}
                    </a>`
              }
            });
            html += `</marquee>`;
            marqueeHtml.innerHTML = html;
            document.getElementById("marquee").appendChild(marqueeHtml)
          } else {
            this.Toast(data.message);
          }
        })
    },

  }
}
</script>

<style lang="less" scoped>
.link-url{
  color:rgb(255,255,255);
  margin-right:100px;
  &:last-of-type{
    margin-right: 0;
  }
}
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
      color: #fff;
      font-size: 0.26rem;
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
        text-align: left;
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

    .ifa-imgBg00 {
      background: url(/static/images/banner_index.png);
      background-position: -3.51rem -0.1rem;
      background-repeat: no-repeat;
      background-size: 4.82rem 1.97rem;
    }

    .ifa-imgBg01 {
      background-position: -2.34rem -0.11rem;
    }
    .ifa-imgBg02 {
      // background-position: -3.44rem -0.1rem;
      background: url(/static/images/recharge.png);
      background-repeat: no-repeat;
      background-size: 0.56rem 0.56rem;
      // width: 0.6rem;
      // height: 0.6rem;
    }
    .ifa-imgBg03 {
      background-position: -2.92rem -0.11rem;
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
      background-position: -3.77rem -1.34rem;
    }
    .ifa-imgBg12 {
      background-position: -4.34rem -1.34rem;
    }
    .ifa-imgBg13 {
      background: url(/static/images/coin.png);
      background-repeat: no-repeat;
      background-size: 0.5rem 0.5rem;
    }
    .ifa-imgBg14 {
      background: url(/static/images/life.png);
      background-repeat: no-repeat;
      background-size: 0.5rem 0.5rem;
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
  margin-bottom: 0.2rem;
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
      text-align: left;
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
