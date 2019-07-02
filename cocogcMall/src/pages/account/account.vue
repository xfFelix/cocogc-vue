<template>
    <div id="account">
        <div class="account-head">
            <div class="acc-headCSMW">
                <div class="acc-headCSM">
                    <img src="../../../static/images/user-set.png" class="acc-headSet"  @click="$router.push('/setUp')" />
                </div>
            </div>
            <div class="acc-headInfo">
                <div class="acc-headImgW">
                    <img class="acc-headImg" src="static/images/headImg.png" alt="" />
                </div>
                <div class="acc-headTG">
                    <p class="acc-headTel">{{userName}}</p>
                    <p class="acc-headGrade">
                        <span class="acc-headChessI"></span>
                        <span class="acc-headChess" v-if="levelFlag">专业选手</span>
                        <span class="acc-headChess" v-else>业余选手</span>
                    </p>
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
                        <p :class="item.bgImgClass">
                          <span v-if="item.name === '未完成' && num" class="num">{{num}}</span>
                        </p>
                        <p class="account-qName">{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="account-contentW">
            <div class="acc-content">
                <ul class="acc-contentUl">
                    <li v-for="(item,index) in jumpList" :key="index">
                        <a :href="item.path">
                            <span :class="item.bgImg"></span>
                            <div class="acc-contentInfo">
                                <span class="acc-contentName">{{item.name}}</span>
                                <p class="acc-contentR">
                                    <span v-if="item.scoreShow">椰子分余额：</span>
                                    <span v-if="item.scoreShow">{{score}}</span>
                                    <span class="acc-contentGo"></span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="acc-content">
                <ul class="acc-contentUl">
                    <li v-for="(item,index) in helpList" :key="index">
                        <a :href="item.path">
                            <span :class="item.bgImg"></span>
                            <div class="acc-contentInfo">
                                <span class="acc-contentName">{{item.name}}</span>
                                <p class="acc-contentR">
                                    <span class="acc-contentGo"></span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="account-swipeW">
            <div class="account-swipe">
                <div class="swiper-container" ref="endSwiper">
                    <!-- 页面 -->
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item of end" :key="item.title">
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
            jumpList: [
                { name: '我的椰子分', scoreShow: true, path: infoURl + "#!/slogs?token=" + getToken(), bgImg: "acc-contentLog01" },
                // { name: '黄金兑换', scoreShow: false, path: infoURl + "#!/goldChange?token=" + getToken(), bgImg: "acc-contentLog03" },
                { name: '信用卡还款', scoreShow: false, path: infoURl + "#!/pay?back=pay&token=" + getToken(), bgImg: "acc-contentLog02" },
                { name: '话费充值', scoreShow: false, path: infoURl + "#!/phoneBill?token=" + getToken(), bgImg: "acc-contentLog04" },
                { name: '门票兑换记录', scoreShow: false, path: hostUrl + 'ticket/order/list?token=' + getToken() , bgImg: "acc-contentLog09" },
            ],
            helpList: [
                { name: '卡密充值', path: infoURl + '#!/charge?token=' + getToken(), bgImg: "acc-contentLog08" },
                { name: '帮助中心', path: 'https://mp.weixin.qq.com/s/YjTWs8Ep1lpIYeSXJTH03Q', bgImg: "acc-contentLog05" },
                { name: '联系客服', path: infoURl + "#!/contact?token=" + getToken(), bgImg: "acc-contentLog06" },
                { name: '商务合作', path: infoURl + "#!/cooperation?token=" + getToken(), bgImg: "acc-contentLog07" },
            ],
            top: [],
            end: [],
            levelFlag:false,
            num: 0
        };
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo',
            platform: 'platform/getPlatform'
        })
    },
    watch: {
      platform: {
        handler (val) {
          if (!val) {
            this.jumpList.splice(1, 1)
          }
        },
        immediate: true
      }
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
    }
};
</script>

<style lang="less" scoped>
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
    .acc-headCSMW {
        border-top: 1px solid transparent;
        .acc-headCSM {
            display: flex;
            justify-content: flex-end;
            margin-top: 0.6rem;
            padding-right: 0.2rem;
            .acc-headCrown,
            .acc-headSet {
                display: inline-block;
                position: absolute;
                width: 35px;
                height: 30px;
                top: 15px;
                right: 19px;
                opacity: 0.5;
            }
            .acc-headCrown {
                background-position: -0.17rem -1.09rem;
            }
        }
    }
    .acc-headInfo {
        display: flex;
        margin-top: 10px;
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
                width: 27%;
            .acc-headTel {
                margin-bottom: 0.13rem;
                font-size: 0.3rem;
                color: #fff;
                font-weight: bold;
                margin-top: 0.18rem;
                    text-shadow: 0px 0 8px #666;
            }
            .acc-headGrade {
                background: linear-gradient(to right, #ebc99d, #d5b587);
                font-size: 0.22rem;
                padding: 0.08rem 0px 0.08rem 0.1rem;
                display: flex;
                border-radius: 50px;
                color: #fff;
                position: relative;
                width: 85%;
                .acc-headChessI {
                    width: 0.28rem;
                    height: 0.28rem;
                    display: inline-block;
                    background-image: url(/static/images/account.png);
                    background-repeat: no-repeat;
                    background-size: 3.12rem 2.95rem;
                    background-position: -1.78rem -1.09rem;
                    position: absolute;
                    left: 0.18rem;
                    top: 0.12rem;
                }
                .acc-headChess {
                    margin: 0 0.1rem 0 0.42rem;
                }
                .acc-headChessN {
                    margin-right: 0.2rem;
                }
            }
        }
    }
}

.account-quickW {
    margin-top: -0.64rem;
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
                .account-qImg02,
                .account-qImg03,
                .account-qImg04,
                .account-qImg05 {
                    width: 0.42rem;
                    height: 0.44rem;
                    display: inline-block;
                    background-image: url("../../../static/images/account.png");
                    background-repeat: no-repeat;
                    background-size: 3.12rem 2.95rem;
                    margin: 0.48rem 0 0.13rem 0;
                }
                .account-qImg01 {
                    background-position: -0.13rem -0.13rem;
                }
                .account-qImg02 {
                    background-position: -0.66rem -0.13rem;
                }
                .account-qImg03 {
                    background-position: -1.17rem -0.13rem;
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
                    background-position: -1.71rem -0.13rem;
                }
                .account-qImg05 {
                    background-position: -2.23rem -0.13rem;
                }
            }
        }
    }
}

.account-contentW {
    .acc-content {
        background: #fff;
        margin-top: 0.26rem;
        .acc-contentUl {
            li {
                a {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    .acc-contentLog01,
                    .acc-contentLog02,
                    .acc-contentLog03,
                    .acc-contentLog04,
                    .acc-contentLog05,
                    .acc-contentLog06,
                    .acc-contentLog07,
                    .acc-contentLog08,
                    .acc-contentLog09,
                     {
                        width: 0.3rem;
                        height: 0.3rem;
                        display: inline-block;
                        background-image: url("../../../static/images/account.png");
                        background-repeat: no-repeat;
                        background-size: 3.12rem 2.95rem;
                        margin: 0 0.36rem;
                    }
                    .acc-contentLog01 {
                        background-position: -0.17rem -0.68rem;
                    }
                    .acc-contentLog02 {
                        background-position: -0.58rem -0.7rem;
                    }
                    .acc-contentLog03 {
                        background-position: -1rem -0.7rem;
                    }
                    .acc-contentLog04 {
                        background-position: -1.5rem -0.7rem;
                    }
                    .acc-contentLog05 {
                        background-position: -1.88rem -0.7rem;
                    }
                    .acc-contentLog06 {
                        background-position: -2.3rem -0.7rem;
                    }
                    .acc-contentLog07 {
                        background-position: -2.71rem -0.7rem;
                    }
                    .acc-contentLog08{
                            background-position: -2.58rem -1.07rem;
                    }
                    .acc-contentLog09{
                            background-position: -2.58rem -1.07rem;
                            transform: rotate(-63deg);
                    }


                    .acc-contentInfo {
                        font-size: 0.30rem;
                        color: #666666;
                        border-bottom: 1px solid #f4f4f4;
                        display: flex;
                        justify-content: space-between;
                        flex: 1;
                        padding: 0.36rem 0;
                        margin-right: 0.36rem;
                    }


                    .acc-contentR {
                        font-size: 0.24rem;
                        color: #999;
                        display: flex;
                        align-items: center;
                        span {
                            color: #666;
                        }
                        .acc-contentGo {
                            width: 0.25rem;
                            height: 0.25rem;
                            display: inline-block;
                            background-image: url("../../../static/images/account.png");
                            background-repeat: no-repeat;
                            background-size: 3.12rem 2.95rem;
                            background-position: -2.7rem -0.25rem;
                        }
                    }
                }
            }
        }
    }
}

.account-swipeW {
    height: 1.8rem;
    margin: 0.5rem 0.53rem 0.5rem 0.53rem;
    .account-swipe {
        height: 100%;
        .swiper-container-horizontal>.swiper-pagination-bullets {
            bottom: 0px;
        }
        .swiper-container {
            height: 100%;
            .swiper-wrapper {
                .swiper-slide {
                    img {
                        height: 1.8rem;
                    }
                }
            }
        }
        .swiper-pagination {
            .swiper-pagination-bullet {
                width: 0.06rem;
                height: 0.06rem;
                border: 0.02rem solid #fff;
                border-radius: inherit;
                background: transparent;
            }
            .swiper-pagination-bullet-active {
                background: #fff;
            }
        }
    }
}
</style>
