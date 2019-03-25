<template>
    <div class="orderDetails">
        <header-top></header-top>
        <div class="od-titleWrap">
            <!-- <p class="od-titleInfoWrap">
                <span class="j1Png od-titleInfoImg"></span>
                <span class="od-titleInfo">待发货</span>
            </p> -->
            <!-- <p class="od-service">
                申请售后
            </p> -->

        </div>

        <div class="order-addressWN">
            <div class="order-addressW">
                <div class="order-address">
                    <p class="order-addPerson">
                        <span>{{dataList.userName}}</span>
                        <span>{{dataList.userMobile}}</span>
                    </p>
                    <p class="order-addInfo">
                       {{dataList.userAddress}}
                    </p>
                </div>
                <!-- <div>
                    <span class="goTo"></span>
                </div> -->
            </div>

            <div class="order-bottom"></div>
        </div>

        <div class="od-timeInfoWrap">
            <div class="od-numberWrap">
                <p class="od-number">
                    <span>订单编号：</span>
                    <span>{{dataList.orderId}}</span>
                </p>
                <p class="od-numberCopy" @click="handleCopy(dataList.orderId, $event)">复制</p>
            </div>
            <div class="od-timeInfo">
                <span>下单时间：</span>
                <span>{{dataList.addTime}}</span>
            </div>
        </div>


        <div v-for="(item,index) in dataList.goodsList" :key="index">
            <div class="order-goodSW">
              <router-link :to="{path: '/goodsDetail/'+ item.goodsId}">
                <div class="order-goodSInfo">
                    <div class="order-goodSIImg">
                      <img :src="item.picUrl" alt="">
                    </div>
                    <div class="order-goodsDetail">
                        <p class="order-goodsDName">{{item.goodsName}}</p>

                        <p class="order-goodsDType"></p>
                        <div class="order-goodsDPriceW">
                            <span class="order-goodsDPrice">{{item.buyPrice|toDecimal2(item.buyPrice)}}</span>
                            <p class="order-goodsDNumW">
                                <span class="order-goodsDNumI"></span>
                                <span class="order-goodsDNum">{{item.buyNum}}</span>
                            </p>
                        </div>
                    </div>
                </div>
              </router-link>

            </div>
        </div>
        <div class="od-goodSNumWrap one-top-px">
            <p class="od-goodSNum">
                <span class="od-goodSNumName">{{dataList.vendorId}}</span>
                <span>{{dataList.orderId}}</span>
            </p>
            <p class="od-logistic">
                <router-link :to="{path:'/logisticsDetail',query:{orderId:dataList.orderId,logisticId:dataList.id}}">
                    <span>查看物流</span>
                    <span class="od-goLogistics j1Png"></span>
                </router-link>
            </p>
        </div>



        <div class="od-priceWrap">
            <ul class="od-priceUl one-bottom-px">
                <li>
                    <span>商品总额</span>
                    <span>{{dataList.sellMoney|toDecimal2(dataList.sellMoney)}}</span>
                </li>
                <li>
                    <span>运费</span>
                    <span>{{dataList.shippingFee|toDecimal2(dataList.shippingFee)}}</span>
                </li>
                <li>
                    <span>服务费</span>
                    <span>{{dataList.serviceMoney|toDecimal2(dataList.serviceMoney)}}</span>
                </li>
                <li>
                    <span>税费</span>
                    <span>{{dataList.taxFee|toDecimal2(dataList.taxFee)}}</span>
                </li>

            </ul>
            <p class="od-realPrice">
                <span>实付：</span>
                <span>{{dataList.totalMoney|toDecimal2(dataList.totalMoney)}}</span>
            </p>
        </div>

    </div>
</template>
<script>

import headerTop from "../../common/header.vue";
import api from '../../service/api';
import clip from '@/util/clipboard'

export default {
    data() {
        return {
            list: [],

            dataList: {},
            orderId: this.$route.params.orderId
        };
    },
    mounted() {
      this.findOrder()
    },
    methods: {

        logisticGo: function() {
            this.$router.push('/logisticsDetail')
        },
        // 查找订单
        findOrder: function() {

            var token = localStorage.getItem("yeyun_token");
            let _this = this;
            this.axios(testUrl + api.findOrder, {

                "token": token,
                "code": this.orderId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.dataList = data.data;
                    } else {
                        _this.Toast(data.message)
                    }
                })
                .catch((err) => {
                    _this.Toast(err.message)
                })
        },
        handleCopy(text, event) {
            clip(text, event)
        },
    },
    components: {
        "header-top": headerTop
    }
};
</script>
<style lang="less">
.od-titleWrap {
    padding: 0.4rem 0.3rem 0 0.3rem;
    // height: 1.26rem;
    height: 0.5rem;
    background: #30ce84;
    color: #fff;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: start;
    .od-titleInfoWrap {
        display: flex;
        align-items: center;
        .od-titleInfoImg {
            width: 0.3rem;
            height: 0.3rem;
            background-color: #fff;
            background-position: -2.255rem -1.475rem;
            border-radius: 50%;
            margin-right: 0.05rem;
        }
        .od-titleInfo {}
    }
    .od-service {
        border: 1px solid #fff;
        display: inline-block;
        padding: 0 0.1rem;
        border-radius: 0.3rem;
    }
}

.order-addressWN {
    margin: 0 0.27rem;
    margin-top: -0.5rem;
    overflow: hidden;
    .order-addressW {
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4rem 0.33rem 0.5rem 0.39rem;
        .order-address {
            width: 4.9rem;
            .order-addPerson {
                margin-bottom: 0.33rem;

                span:nth-of-type(1),
                span:nth-of-type(2) {
                    color: #000;
                    font-size: 0.3rem;
                }
            }
            .order-addInfo {
                color: #666666;
                font-size: 0.28rem;
            }
        }
        .goTo {
            width: 0.3rem;
            height: 0.38rem;
            background-position: -0.2rem -0.75rem;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            display: inline-block;
        }
    }
}

.od-timeInfoWrap {
    background: #fff;
    font-size: 0.26rem;
    padding: 0 0.37rem;
    margin: 0.2rem 0;
    .od-numberWrap {
        display: flex;
        justify-content: space-between;
        padding: 0.42rem 0 0.25rem 0;
        .od-number {
            span:nth-of-type(1) {
                font-weight: bold;
            }
            span:nth-of-type(2) {}
        }
        .od-numberCopy {
            font-size: 0.22rem;
            border-radius: 0.3rem;
            border: 1px solid #999999;
            display: inline-block;
            padding: 0 5px;
        }
    }
    .od-timeInfo {
        display: flex;
        justify-content: end;
        padding-bottom: 0.4rem;
        span:nth-of-type(1) {
            font-weight: bold;
        }
    }
}

.order-bottom {
    height: 0.1rem;
    background-image: url(/static/images/bgRepeat.jpg);
    background-repeat: repeat-x;
    margin-left: -0.1rem;
}


.order-goodSW {
    background: #fff;
    // margin-top: 0.2rem;

    padding: 0.2rem 0.37rem 0.2rem 0.32rem; // height: auto;
    .order-goodSInfo {
        display: flex;
        align-items: end; // padding: 0 0.39rem 0 0.32rem;
        padding: 0.2rem 0;
        margin-bottom: 0.11rem;
        justify-content: space-between;
        .order-goodSIImg {
            width: 2.11rem;
            height: 2.11rem; // margin-right: 0.76rem;
            img {
                width: 100%;
            }
        }
        .order-goodsDetail {
            .order-goodsDName {
                line-height: 0.4rem;
                color: #333;
                font-size: 0.3rem;
                margin-bottom: 0.06rem;
                width: 4.2rem;
            }
            .order-goodsDType {
                color: #999999;
                font-size: 0.3rem;
            }
            .order-goodsDPriceW {
                display: flex;
                justify-content: space-between;
                font-size: 0.3rem;
                margin-top: 0.48rem;
                .order-goodsDPrice {}
                .order-goodsDNumW {
                    .order-goodsDNumI {
                        width: 0.36rem;
                        height: 0.3rem;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-size: 5.8rem 1.86rem;
                        background-position: -0.42rem -0.66rem;
                        display: inline-block;
                    }
                    .order-goodsDNum {}
                }
            }
        }
    }
}

.od-goodSNumWrap {
    display: flex;
    justify-content: space-between;
    padding: 0.28rem 0.3rem 0.08rem 0.3rem;
    background: #fff;
    .od-goodSNum {
        span{
             display: block;
             margin-bottom: 0.1rem;
        }
    }
    .od-logistic {
        span:nth-of-type(1) {}
        .od-goLogistics {
            width: 0.16rem;
            height: 0.24rem;
            background-position: -3.29rem -0.77rem;
        }
    }
}

.od-priceWrap {
    background: #fff;
    margin-top: 0.2rem;
    .od-priceUl {
        margin: 0 0.4rem 0 0.37rem;
        padding: 0.2rem 0 0.16rem 0;
        li {
            display: flex;
            justify-content: space-between;
            font-size: 0.28rem;
            line-height: 0.56rem;
            span:nth-of-type(1) {
                font-weight: bold;
            }
            span:nth-of-type(2) {}
        }
    }
    .od-realPrice {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0.4rem;
        font-weight: bold;
        padding: 0.34rem 0 0.4rem 0;
        span:nth-of-type(1) {
            font-size: 0.28rem;
            color: #000;
        }
        span:nth-of-type(2) {
            font-size: 0.36rem;

            color: #30ce84;
        }
    }
}
</style>




