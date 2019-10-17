<template>
    <div id="account">
        <div class="account-head">
            <div class="acc-headInfo">
                <div class="acc-headImgW">
                    <img class="acc-headImg" :src="logoImg" alt="" />
                </div>
                <div class="acc-headTG">
                  <div class="acc-numInfo">
                      <p class="acc-headTel">{{userName|formatPhone}}</p>
                      <p  class="acc-headGrade">
                        <span class="acc-headChessI"></span>
                        <span class="acc-headChess"> {{levelFlag?'专业选手':'业余选手'}}</span>
                      </p>
                  </div>
                  <div class="balance">
                   <span class="iconBg logo" :style="`background-image:url(${logoImg})`"></span>椰子分余额：{{score}}
                  </div>
                </div>
            </div>

        </div>
        <div class="banner">
            <div class="account-swipe">
                <div class="swiper-container" ref="topSwiper">
                    <!-- 页面 -->
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item of top" :key="item.title">
                          <a :href="item.url">
                            <img :src="item.src" alt=""/>
                          </a>
                        </div>
                    </div>
                    <!-- 分页器 -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>

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
import {mapGetters} from 'vuex';
import { IsEmpty, getToken } from "@/util/common";

export default {
    data() {
        return {
            orderList: [
                { bgImgClass: 'account-qImg01', name: '全部订单', path: '/orderManage?status=0' },
                { bgImgClass: 'account-qImg03', name: '未完成', path: '/orderManage?status=2' },
                { bgImgClass: 'account-qImg04', name: '已完成', path: '/orderManage?status=1' },
                { bgImgClass: 'account-qImg05', name: '已退货', path: '/orderManage?status=3' },
            ],
            score: '',
            userName: '',
            top: [],
            end: [],
            levelFlag:false,
            num: 0,
            logoImg: LOGO_PACKAGE_URL + 'headImg.png'
        };
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
        if(this.userinfo.level == 0){
            this.levelFlag = false;
        }else{
            this.levelFlag = true;
        }
    },
    methods: {
      async getOrderTotals() {
        let data = await this.axios(testUrl+ api.getOrderTotals,{token: getToken()},'post')
        this.num = data.data['2']
      },
      async getSwiper() {
        const [top, end] = await Promise.all([
          this.getBanner('1ffcda7e7555460399096529c68a7a2a'),
          this.getBanner('eaccd32767844f78b3e94923ff6ae899')
        ])
        this.end = end
        this.top = top
        this.checkLength(this.top, 'topSwiper')
        this.checkLength(this.end, 'endSwiper')
      },
      checkLength(list, el) {
        this.$nextTick(() => {
          if (list.length > 1) {
            this.setSwiper(this.$refs[el],true)
          } else {
            this.setSwiper(this.$refs[el],false)
          }
        })
      },
      setSwiper(el, autoplay){
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
      getBanner (id) {
        let promise = new Promise(async (resolve, reject) => {
          let banner = await this.axios(testUrl + api.goodsGroups, {"id": id}, 'post')
          if (!banner.error_code) {
            resolve(banner.data.data)
          }
        })
        return promise
      },
    },
    components:{
      'orderList':()=>import ('./components/orderList'),
      'inquireList':()=>import ('./components/inquireList')
    }
};
</script>

<style lang="scss" scoped>
#account{
  position: relative;
  .banner{
    width: 100%;
    height: 3.6rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
  }
}
.account-head {
    background: transparent;
    width: 100%;
    height: 3.6rem;
    position: relative;
    z-index: 22;
    padding-top: 0.6rem;
    .acc-headInfo {
        display: flex;
        // margin-top: 10px;
        .acc-headImgW {
            width: 1.1rem;
            height: 1.1rem;
            margin-left: 0.66rem;
            margin-top: 0.1rem;
            margin-right: 0.36rem;
            .acc-headImg {
                width: 100%;
            }

        }
        .acc-headTG {
            margin-bottom: 0.13rem;
            margin-top: 0.18rem;
            .balance{
              font-size: 0.24rem;
              color: #fff;
              display: inline-flex;
              align-items: center;
              background: rgba(0,0,0,0.3);
              margin-top: 0.16rem;
              padding: 0.04rem 0.08rem;
              border-radius: 50px;
              .logo{
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.1rem;
              }

            }
            .acc-headTel {
                font-size:0.36rem;
                color: #fff;
                font-weight: bold;
                display: inline-flex;
            }
            .acc-headGrade {
                background: linear-gradient(to right, #ebc99d, #d5b587);
                font-size: 0.22rem;
                padding: 0.04rem 0.1rem;
                display: inline-flex;
                border-radius: 50px;
                color: #fff;
                align-items: center;
                .acc-headChessI {
                    width: 0.28rem;
                    height: 0.28rem;
                    display: inline-block;
                    background-image: url("/static/images/account.png");
                    background-repeat: no-repeat;
                    background-size: 3.12rem 2.95rem;
                    background-position: -1.78rem -1.09rem;
                }
                .acc-headChess {
                    margin:0 0.2rem 0 0.1rem;
                }
                .acc-headChessN {
                    margin-right: 0.2rem;
                }
            }
        }
    }
}


.account-quickW {
    margin-top: -1.14rem;
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
                    height: 0.58rem;
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
