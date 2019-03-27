<template>
    <div class="orderManage">
        <div class="orderHead">
            <header-top></header-top>
            <ul class="orderList">
                <li v-for="(item,index) in headList" :key="index" @click="headIndexCli(index)">
                    <p>{{item}}</p>
                    <p v-if="headIndex==index"></p>
                </li>
            </ul>
        </div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="orderContent">
              <router-link v-for="(item,index) in list" :key="index" :class="'ye'+item.id" :to="{name: 'orderDetails', params: {orderId:item.orderId}}" >
                  <!-- 多种商品 -->
                  <div  v-if="item.goodsList.length>1" class="order-goodsMW">
                      <div class="oMGoodsTit">
                          <p class="oMGoodsTitLeft">
                              <span>{{item.vendorId}}</span>
                              <span>订单号：</span>
                              <span>{{item.orderId}}</span>
                          </p>
                          <p class="oMGoodsTitRight">
                              <span>{{item.orderStatus}}</span>
                          </p>
                      </div>

                      <div class="order-swipeW one-bottom-px">
                          <div class="order-swipe">

                              <div class="swiper-container">
                                  <div class="swiper-wrapper">
                                      <div class="swiper-slide" v-for="(itemGoods,indexGoods) in item.goodsList" :key="indexGoods">
                                          <div class="order-goodsList">

                                              <img :src="itemGoods.picUrl" alt="" />                                        </div>
                                      </div>

                                  </div>

                              </div>
                          </div>

                          <div class="swipe-bntWrap">
                              <div class="swiper-button-next swiper-button-black"></div>
                          </div>

                      </div>

                      <div class="oMGoodsTotal">
                          <p>共
                              <span>2</span>件商品</p>
                          <p>合计：
                              <span>{{item.totalMoney}}</span>
                          </p>
                      </div>
                  </div>

                  <!-- 单个商品 -->
                  <div class="oMGoodsW" v-else>
                      <div class="oMGoodsTit">
                          <p class="oMGoodsTitLeft">
                              <span>{{item.vendorId}}</span>
                              <span>订单号：</span>
                              <span>{{item.orderId}}</span>
                          </p>
                          <p class="oMGoodsTitRight">
                              <span>{{item.orderStatus}}</span>
                          </p>
                      </div>
                      <div class="oMGoodsCon one-bottom-px">
                          <div class="oMGoodsConImg">

                              <img :src="item.goodsList[0].picUrl || ''" alt="" />
                          </div>
                          <div class="oMGoodsConInfo">
                              <div class="oMGoodsConName">
                                  {{item.goodsList[0].goodsName}}
                              </div>
                              <p class="oMGoodsConType">&nbsp;</p>
                              <div class="oMGoodsConMoney">
                                  <p>{{item.goodsList[0].buyPrice}}</p>
                                  <p>
                                      <span></span>
                                      <span>{{item.goodsList[0].buyNum}}</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div class="oMGoodsTotal">
                          <p>共
                              <span>{{item.goodsList[0].buyNum}}</span>件商品</p>
                          <p>合计：
                              <span>{{item.totalMoney}}</span>
                          </p>
                      </div>
                  </div>
              </router-link>
          </div>
        </mt-loadmore>
        <no-data :data="list"></no-data>

    </div>
</template>
<script>
import headerTop from "../../common/header.vue";
import Swiper from 'swiper';
import api from '../../service/api';
import { IsEmpty, getToken } from "@/util/common";
import { Loadmore } from 'mint-ui';

export default {
    data() {
        return {
            list: [],
            headList: ['全部', '已完成', '未完成', '已退货'],
            headIndex: 0,
            pathStatus: '',
            pageNum: 1,
            pageSize: 10,
            allLoaded: false
        }
    },
    computed: {
      offset() {
        return this.pageSize*(this.pageNum - 1) +1
      }
    },
    watch: {

    },
    mounted() {

        var token = getToken();
        this.pathStatus = this.$route.query.status;
        switch (this.pathStatus) {
            case '0':
                this.headIndex = 0;
                break;
            case '1':
                this.headIndex = 1;
                break;
            case '2':
                this.headIndex = 2;
                break;
            case '3':
                this.headIndex = 3;
                break;
            default:
                this.headIndex = 0;
                break;
        }
    },
    methods: {
      async loadTop(){
        console.log('this loadtop')
        this.init()
        await this.selectOrders(getToken(), this.headIndex);
        this.$refs.loadmore.onTopLoaded();
      },
      async loadBottom(){
        console.log('this is loadbottom')
        await this.selectOrders(getToken(), this.headIndex);
        this.$refs.loadmore.onBottomLoaded();
      },
        headIndexCli(index) {
            this.headIndex = index;
            this.init()
            this.selectOrders(getToken(), index);
        },
        init() {
          this.pageNum = 1
          this.list = []
        },
        async selectOrders(token, headIndex) {
          let data = await this.axios(testUrl + api.selectOrders, {"token": token,"status": headIndex,offset: this.offset}, 'post')
          if (data.error_code) {
             return
          }
          this.list.push(...data.data)
          this.pageNum ++
          this.allLoaded = !(data.data.length === this.pageSize)
          this.setSwiper(this.list)
        },
        setSwiper(list) {
          this.$nextTick(() =>{
              list.forEach((res) => {
                  var goodsId = 'ye' + res.id;
                  var classg = '.' + goodsId + ' .swiper-container';
                  var bnt = '.' + goodsId + ' .swiper-button-next';
                  new Swiper(classg, {
                      slidesPerView: 4,
                      slidesPerGroup: 1,
                      spaceBetween: 10,
                      navigation: {
                          nextEl: bnt,
                          // prevEl: '.swiper-button-prev',
                      }
                  })
              });
          })
        }
    },
    components: {
        "header-top": headerTop,
        "mt-loadmore": Loadmore
    }
}
</script>

<style lang="less">
.orderHead {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 11;
}

.orderList {
    display: flex;
    justify-content: space-around;
    font-size: 0.26rem;
    background: #fff;
    li {
        // width: 25%;
        // display: flex;
        p:nth-of-type(1) {
            margin: 0.07rem 0 0.26rem 0;
        }
        p:nth-of-type(2) {
            width: 100%;
            height: 3px;
            background: #30ce84;
        }
    }
}

.oMGoodsW {
    margin: 0.2rem 0;
    background: #fff;
    padding: 0 0.37rem;
    &:first-of-type{
      margin-top: 0;
    }
    .oMGoodsCon {
        display: flex;
        padding-bottom: 0.3rem;
        justify-content: space-between;
        .oMGoodsConImg {
            width: 1.6rem;
            height: 1.6rem;
            margin-right: 0.3rem;
            img {
                width: 100%;
                height: 100%;
                position: relative;
            }
            img::after{
              content: '';
              display: block;
              position: absolute;
              background-image: url(http://img13.360buyimg.com/n1/jfs/t3082/361/4101110131/88917/3777047a/58006c0bNdeadd9a4.jpg);
              background-size: cover;
              background-repeat: no-repeat;
              width: 100%;
              height: 100%;
              z-index: 2;
              top: 0;
              left: 0;
            }
        }
        .oMGoodsConInfo {
            width: 70%;
            .oMGoodsConName {
                font-size: 0.28rem;
                color: #333;
                line-height: 0.4rem;
            }
            .oMGoodsConType {
                color: #999999;
            }
            .oMGoodsConMoney {
                display: flex;
                justify-content: space-between;
                p:nth-of-type(1) {}
                p:nth-of-type(2) {
                    span:nth-of-type(1) {
                        width: 0.36rem;
                        height: 0.3rem;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-size: 5.8rem 1.86rem;
                        background-position: -0.42rem -0.66rem;
                        display: inline-block;
                    }
                    span:nth-of-type(2) {}
                }
            }
        }
    }
}

.oMGoodsTit {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    font-weight: bold;
    padding: 0.37rem 0 0.47rem 0;
    .oMGoodsTitLeft {
        span:nth-of-type(1) {
            background: #000;
            color: #fff;
            padding: 0 3px;
        }
    }
    .oMGoodsTitRight {}
}

.oMGoodsTotal {
    padding: 0.29rem 0 0.32rem 0;
    display: flex;
    justify-content: space-between;
    p:nth-of-type(1) {
        span {}
    }
    p:nth-of-type(2) {
        span {
            color: #30ce84;
        }
    }
}

.orderManage {
    padding-top: 2.25rem;
    .order-goodsMW {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.37rem 0 0.32rem;
        margin-bottom: 0.3rem;
        .order-goodsList {
            width: 1.5rem;
            height: 1.5rem;
            img {
                width: 100%;
            }
        }
        .order-swipeW {
            position: relative;
            display: flex;
            align-items: center;
            padding-bottom: 0.3rem;
            .order-swipe {
                width: 93%;
            }
        }
        .swiper-button-next.swiper-button-black,
        .swiper-container-rtl .swiper-button-prev.swiper-button-black {
            background-size: 13px;
            border: none;
        } // .swiper-wrapper {
        //     width: 93%;
        //     overflow: hidden;
        // }
        .swiper-button-next {
            right: -5px;
        }
        .order-freight {
            margin-top: 0.26rem;
            padding-top: 0.11rem; // border-top: 1px solid #dfdfdf;
        }
    }
}

</style>
