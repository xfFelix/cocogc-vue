<template>
  <div class="index" id="index">
    <!-- 头部 -->
    <div style="background: #fff;">
      <div class="index-head">
        <img :src="bannerImg" alt="" srcset="">
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
            <p class="ih-moneya">椰子分余额</p>
          </div>
          <div class="ih-balance" v-else>
            <router-link :to="{path:'/login'}" class="ih-nologin">登录</router-link>
          </div>
        </div>
      </div>

    <!-- 导航 -->
    <ul class="index-fastNav">
      <li class="ifa-fastNavLi" v-for="(item,index) in fastList" :key="index">
          <div :style="(item.path=='javascript:;'? 'color:#ccc':'color:#000')" @click="goLink(item)" style="position:relative;">
            <img src="/static/images/home/hot.png" alt=" " v-if="item.id == 1 || item.id == 0" class="badge-img hot">
            <img src="/static/images/home/new.png" alt=" " v-if="item.id == 13" class="badge-img">
            <img :src="item.id == 4 ? logoImg : `/static/images/home/${item.img}${!item.active ? '-disabled': ''}.png`" alt="" class="iconImg">
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
  </div>

    <!-- 热门爆款 -->
    <!-- <div class="index-hotGoods">
      <div class="ihot-title">
        <h3>热门爆款</h3>
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

    </div> -->
    <!-- 积分区间 -->
    <v-integral></v-integral>
  </div>
</template>

<script>

import Swiper from 'swiper';
import api from '../../service/api';
import { mapGetters } from 'vuex';
import { getToken } from '@/util/common'
import mixin from '@/util/mixin'
import Integral from '../../components/home/integral.vue'
export default {
  name: 'index',
  mixins: [mixin],
  components: {
    "v-integral": Integral
  },
  data() {
    return {
      fastList: [
        { id: 0, name: "抗击疫情", img: 'sy_kjyq', active: true, path: '/goodsList?classfyId=1000007' },
        { id: 2, name: "话费充值", img: 'gold', active: true,  path: `${hostUrl}ticket/phone`},
        { id: 4, name: "小椰超市", img: 'jd', active: true,  path: '/layout/shopMall'},
        { id: 6, name: "会员卡券", img: 'vip', active: true,  path: hostUrl + 'ticket/memberCard'},
        // { id: 7, name: "海南旅游", img: 'travel', active: true,  path: `${hostUrl}ticket/static/ticket.html` },
        { id: 5, name: "加油卡充值", img: 'oil', active: true,  path: hostUrl + 'ticket/oil' },
        // { id: 8, name: "海南特产", img: 'food', active: true,  path: `${hostUrl}ticket/static/food.html` },
        { id: 13, name: "生活缴费", img: 'life', active: true,  path: `${hostUrl}ticket/life` },
        { id: 9, name: "机票酒店", img: 'air', active: false,  path: 'javascript:;' },
        { id: 11, name: "游戏周边", img: 'game', active: false, path: 'javascript:;' },
        { id: 12, name: "网易严选", img: 'wangyi', active: false,  path: 'javascript:;' },
      ],
      goodsList: [],
      loginFlag: false,
      token: getToken(),
      banner: [],
      newsList:[],
      autoplay: false,
      bannerImg: LOGO_PACKAGE_URL + 'home-banner-bg.png',
      logoImg: LOGO_PACKAGE_URL + 'jd.png'
    }
  },
  created() {
  },
  computed: {
    ...mapGetters({
      loScore: 'userinfo/getUserInfo',
    })
  },
  mounted() {
    this.getBanner()
    this.rank();
    this.getNews();
  },
  methods: {
    goLink(item) {
      if (item.id === 3) {
        return this.MessageBox({message: "非常抱歉，因系统升级，本服务暂停。"})
      }
      if (item.id === 4 || item.id == 0) {
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
            bulletClass : 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
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

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
.link-url{
  color:rgb(255,255,255);
  margin-right:100px;
  &:last-of-type{
    margin-right: 0;
  }
}
.index-head {
  position: relative;
  overflow: hidden;
  .ih-noticeW {
    width: 88%;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.6rem;
    margin: px2rem(30) auto 0;
    line-height: 0.6rem;
    position: absolute;
    top: 0;
    left: 6%;
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
    margin-left: 1.4rem;
    justify-content: space-between;
    margin-top: 0.45rem;
    position: absolute;
    top: px2rem(60);
    .ih-balance {
      p {
        // margin-top: -0.1rem;
        color: #fff;

        text-align: center;
      }
      .ih-money {
        font-size: px2rem(24);
        font-weight: bold;
        margin-top: -0.1rem;
      }
      .ih-moneya {
        font-size: px2rem(12);
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
  margin: 0 px2rem(10) 0.2rem px2rem(10);
  background: #fff;
  border-radius:25px 25px 0px 0px;
  padding-top: px2rem(6);
  position: absolute;
  top: px2rem(148);
  .ifa-fastNavLi {
    width: 25%;
    text-align: center;
    margin: px2rem(14) 0 0.1rem 0;
    display: inline-block;
    .iconImg{
      width: px2rem(44);
      height: px2rem(44);
      margin: auto;
    }
    .badge-img{
      position: absolute;
      right: px2rem(16);
      top: px2rem(6);
      width: px2rem(21);
      height: px2rem(10);
    }
    .hot{
      top: px2rem(2);
    }

    .ifa-ImgW {
      width: 0.5rem;
      height: 0.5rem;
      background-position: -0.09rem -0.09rem;
      position: relative;
    }
    .ifa-name {
      padding: px2rem(9) 0 0 0;
      font-size: 11px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color:rgba(51,51,51,1);
    }
  }
}

.index-swipeW {
  margin: px2rem(160) px2rem(10) px2rem(10) px2rem(10);
  padding-bottom: px2rem(25);
  img {
    width: 100%;
    border-radius:10px;
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
