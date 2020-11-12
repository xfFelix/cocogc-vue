<template>
  <div id="account">
    <div class="account-head">
      <div class="setting-wrapper">
        <div class="icon-item">
          <img src="/static/images/user/icon_listen.png" alt="" class="img-fluid">
        </div>
        <div class="icon-item">
          <img src="/static/images/user/icon_setting.png" alt="" class="img-fluid">
        </div>
      </div>
      <div class="user-wrapper">
        <div class="avatar">
          <img src="/static/images/user/avatar.png" alt="" class="img-fluid"/>
        </div>
        <div class="user">
          <div class="name">{{userName}}</div>
          <!-- <span class="acc-headChess"> {{levelFlag?'专业选手':'业余选手'}}</span> -->
          <div class="mobile">{{userName | formatPhone}}</div>
            <!-- <span class="iconBg logo" :style="`background-image:url(${logoImg})`"></span>椰子分余额：{{score}} -->
        </div>
        <span class="next">
          <img src="/static/images/user/icon_next.png" alt="" class="img-fluid">
        </span>
      </div>
      <div class="auth-wrapper">
        <div class="auth">
          <div class="icon-item">
            <img src="/static/images/user/icon_auth.png" alt="" class="img-fluid">
          </div>
          已认证
        </div>
        <div class="auth">
          <div class="icon-item">
            <img src="/static/images/user/icon_star.png" alt="" class="img-fluid">
          </div>
          专业选手
        </div>
      </div>
    </div>
    <!-- <div class="banner">
      <div class="account-swipe">
        <div class="swiper-container" ref="topSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item of top" :key="item.title">
              <a :href="item.url">
                <img :src="item.src" alt="" />
              </a>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div> -->

    <div class="account-quickW">
      <ul class="account-quickUl">
        <li v-for="(item,index) in orderList" :key="index">
          <router-link class="account-quickA" :to="item.path">
            <p :class="item.bgImgClass" class="iconBg">
              <span v-if="item.name === '未完成' && num" class="num">{{num}}</span>
            </p>
            <p class="account-qName">{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>

    <order-list></order-list>
    <inquire-list></inquire-list>
  </div>
</template>
<script>
  import Swiper from 'swiper';
  import api from '@/service/api'
  import {
    mapGetters
  } from 'vuex';
  import {
    IsEmpty,
    getToken
  } from "@/util/common";

  export default {
    data() {
      return {
        orderList: [{
            bgImgClass: 'account-qImg01',
            name: '全部订单',
            path: '/orderManage?status=0'
          },
          {
            bgImgClass: 'account-qImg03',
            name: '未完成',
            path: '/orderManage?status=2'
          },
          {
            bgImgClass: 'account-qImg04',
            name: '已完成',
            path: '/orderManage?status=1'
          },
          {
            bgImgClass: 'account-qImg05',
            name: '已退货',
            path: '/orderManage?status=3'
          },
        ],
        score: '',
        userName: '',
        top: [],
        levelFlag: false,
        num: 0,
        logoImg: LOGO_PACKAGE_URL + 'headImg.png'
      };
    },
    filters: {
      formatPhone (str) {
        return str.replace(/(\d{3})\d*(\d{4})/, "$1****$2")
      }
    },
    computed: {
      ...mapGetters({
        userinfo: 'userinfo/getUserInfo',
      })
    },
    created() {
      this.getOrderTotals()
    },
    mounted() {
      this.userName = this.$store.getters['userinfo/getUserInfo'].userName;
      this.score = this.$store.getters['userinfo/getUserInfo'].score;
      this.getSwiper()
      if (this.userinfo.level == 0) {
        this.levelFlag = false;
      } else {
        this.levelFlag = true;
      }
    },
    methods: {
      async getOrderTotals() {
        let data = await this.axios(testUrl + api.getOrderTotals, {
          token: getToken()
        }, 'post')
        this.num = data.data['2']
      },
      async getSwiper() {
        const [top] = await Promise.all([
          this.getBanner('1ffcda7e7555460399096529c68a7a2a'),
        ])
        this.top = top
        this.checkLength(this.top, 'topSwiper')
      },
      checkLength(list, el) {
        this.$nextTick(() => {
          if (list.length > 1) {
            this.setSwiper(this.$refs[el], true)
          } else {
            this.setSwiper(this.$refs[el], false)
          }
        })
      },
      setSwiper(el, autoplay) {
        var swiperBan = new Swiper(el, {
          // autoplay: {
          //   delay: 1000,
          //   stopOnLastSlide: false,
          //   disableOnInteraction: false,
          // },
          autoplay: autoplay,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        })
      },
      getBanner(id) {
        let promise = new Promise(async (resolve, reject) => {
          let banner = await this.axios(testUrl + api.goodsGroups, {
            "id": id
          }, 'post')
          if (!banner.error_code) {
            resolve(banner.data.data)
          }
        })
        return promise
      },
    },
    components: {
      'orderList': () => import('./components/orderList'),
      'inquireList': () => import('./components/inquireList')
    }
  };

</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
*, ::after, ::before{
  box-sizing: border-box;
  font-family:
    // Safari for macOS and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for macOS (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  Roboto,
  // Basic web fallback
  "Helvetica Neue", Arial,
  // Linux
  "Noto Sans",
  // Sans serif fallback
  sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.img-fluid{
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
}
#account {
  padding: px2rem(16) px2rem(16) px2rem(50);
  background: #f5f5f5;
  .account-head{
    background: rgba(33, 211, 152, 1);
    margin: px2rem(-16) px2rem(-16) 0;
    width: auto;
    padding: px2rem(16) px2rem(16) 0;
    .setting-wrapper{
      display: flex;
      justify-content: flex-end;
      .icon-item{
        width: px2rem(24);
        height: px2rem(24);
        margin-left: px2rem(16);
        &:first-of-type{
          margin-left: 0;
        }
      }
    }
    .user-wrapper{
      margin-top: px2rem(16);
      display: flex;
      align-items: center;
      .avatar{
        width: px2rem(60);
        height: px2rem(60);
      }
      .user{
        flex: 1;
        padding-left: px2rem(12);
        color: #ffffff;
        .name{
          font-size: px2rem(24);
          font-weight: 600;
        }
        .mobile{
          font-size: px2rem(14);
        }
      }
      .next{
        width: px2rem(12);
        height: px2rem(12);
      }
    }
    .auth-wrapper{
      margin-top: px2rem(7);
      padding-left: px2rem(72);
      display: flex;
      .auth{
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: px2rem(12);
        transform: scale(.833);
        transform-origin: left center;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        padding: px2rem(3) px2rem(6);
        .icon-item{
          width: px2rem(14);
          height: px2rem(14);
          margin-right: px2rem(3);
        }
      }
    }
  }
}
  .account-quickW {
    height: 1.78rem;
    width: 100%;
    position: relative;
    z-index: 22;

    .account-quickUl {
      display: flex;
      margin: 0 auto;
      justify-content: space-around;
      background: #fff;
      height: 1.78rem;
      border-radius: 0.2rem;
      font-size: 0.26rem;
      color: #000000;
      width: 92%;

      li {
        width: 25%;

        .account-quickA {
          display: block;
          text-align: center;
          height: 100%;

          .account-qImg01,
          .account-qImg03,
          .account-qImg04,
          .account-qImg05 {
            width: 0.64rem;
            height: 0.62rem;
            margin: 0.38rem 0 0.13rem 0;
          }

          .account-qImg01 {
            background-image: url("/static/images/personal/order-1.png");
          }

          .account-qImg03 {
            background-image: url("/static/images/personal/order-2.png");
            position: relative;

            .num {
              position: absolute;
              top: -10px;
              right: -13px;
              padding: 2px 5px;
              background: #fb5c5c;
              color: #fff;
              border-radius: 50%;
              font-size: 12px;
            }
          }

          .account-qImg04 {
            background-image: url("/static/images/personal/order-3.png");
          }

          .account-qImg05 {
            background-image: url("/static/images/personal/order-4.png");
          }
        }
      }
    }
  }

</style>
