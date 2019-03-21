<template>
    <div class="logisticsDetail">
        <header-top></header-top>

        <div>
            <!-- 多种商品 -->
            <div v-if="orderList  &&  orderList.length > 1" class="order-goodsMW">
                <div class="od-numberWrap">
                    <p class="od-number">
                        <span>订单编号：</span>
                        <span>{{list.orderId}}</span>
                    </p>
                    <p class="od-numberCopy" @click="handleCopy(list.orderId,$event)">复制</p>
                </div>

                <div class="order-swipeW">
                    <div class="order-swipe">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(itemGoods,indexGoods) in orderList" :key="indexGoods">
                                    <div class="order-goodsList">
                                        <img :src="itemGoods.picUrl" alt="" />
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="order-goodsList">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swipe-bntWrap">
                        <div class="swiper-button-next swiper-button-black"></div>
                    </div>
                </div>

                <div class="order-freight">
                    <span>运单号</span>
                    <span>va156564165156</span>
                </div>
                <div class="order-priceAll">
                    <span>快递</span>
                    <span>京东快递</span>
                </div>
            </div>

            <!-- 单种商品 -->
            <div class="order-goodSW" v-else-if="orderList.length == 1">

                <div class="od-numberWrap">
                    <p class="od-number">
                        <span>订单编号：</span>
                        <span>{{list.orderId}}</span>
                    </p>
                    <p class="od-numberCopy">复制</p>
                </div>

                <div class="order-goodSInfo one-bottom-px">
                    <div class="order-goodSIImg">
                        <img :src="orderList[0].picUrl" alt="" />
                    </div>
                    <div class="order-goodsDetail">
                        <p class="order-goodsDName">{{orderList[0].goodsName}}</p>
                        <!-- <p class="order-goodsDType">黑色</p> -->
                        <div class="order-goodsDPriceW">
                            <span class="order-goodsDPrice">{{orderList[0].buyPrice}}</span>
                            <p class="order-goodsDNumW">
                                <span class="order-goodsDNumI"></span>
                                <span class="order-goodsDNum">{{orderList[0].buyNum}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="order-freight">
                    <span>运单号</span>
                    <span>va156564165156</span>
                </div>
                <div class="order-priceAll">
                    <span>快递</span>
                    <span>京东快递</span>
                </div>
            </div>
        </div>

        <div class="ld-contentWrap">
            <ul class="ld-content">
                <li class="ld-contenLi" v-for="(item,index) in logisticList" :key="index">
                    <div class="ld-contenLeft">
                        <p class="ld-contenOrder">签</p>
                        <p class="ld-contentLine"></p>
                    </div>
                    <div class="ld-contenRight">
                        <p class="ld-contenAddress">
                            {{item.content}}
                        </p>
                        <p class="ld-contenTime">
                            <span>{{item.msgTime}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="ld-logisFixed" v-show="logisClose">
            <div class="ld-logisWrap">
                <div class="ld-logis">
                    <div class="ld-logisTitleW one-bottom-px">
                        <div class="ld-logisTitle ">
                            <p>商品清单</p>
                            <p>共(
                                <span>{{goodsTotal}}</span>)件</p>
                        </div>
                        <p class="j1Png ld-logisClose" v-show="logisClose=false"></p>

                    </div>

                    <div class="order-goodSW">
                        <div>
                            <div class="order-goodSInfo" v-for="(itemGoods,indexGoods) in list.goodsList" :key="indexGoods">
                                <div class="order-goodSIImg">
                                    <img :src="itemGoods.picUrl" alt="" />
                                </div>
                                <div class="order-goodsDetail">
                                    <p class="order-goodsDName">{{itemGoods.goodsName}}</p>
                                    <!-- <p class="order-goodsDType">黑色</p> -->
                                    <div class="order-goodsDPriceW">
                                        <span class="order-goodsDPrice">{{itemGoods.buyPrice}}</span>
                                        <p class="order-goodsDNumW">
                                            <span class="order-goodsDNumI"></span>
                                            <span class="order-goodsDNum">{{itemGoods.buyNum}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p class="order-freight">
                                <span>运费</span>
                                <span>{{list.shippingFee|toDecimal2(list.shippingFee)}}</span>
                            </p>
                            <p class="order-priceAll">
                                <span>小计</span>
                                <span>{{list.totalMoney|toDecimal2(list.totalMoney)}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import headerTop from "../../common/header.vue";
import Swiper from 'swiper';
import api from '../../service/api';
import clip from '@/util/clipboard'
export default {
    data() {
        return {
            list: {},
            orderList: [],
            goodsTotal: 0,
            logisClose: false,
            logisticList: []
        };
    },
    mounted() {
        this.findOrder()
        this.queryOrderTrack()

    },
    methods: {
        findOrder: function() {
            var token = localStorage.getItem("yeyun_token");
            let _this = this;
            this.axios(testUrl + api.findOrder, {
                "token": token,
                "code": this.$route.query.orderId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.list = data.data;
                        _this.orderList = data.data.goodsList
                        _this.list.goodsList.forEach((res) => {
                            _this.goodsTotal += res.buyNum;
                        });
                    } else {
                        _this.Toast(data.message)
                    }
                }).then(res => {
                    _this.$nextTick(function() {
                        new Swiper('.swiper-container', {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                            spaceBetween: 10,
                            navigation: {
                                nextEl: '.swiper-button-prev',
                            },
                        })
                    })
                })
                .catch((err) => {
                    _this.Toast(err.message);
                })
        },
        queryOrderTrack: function() {
            var token = localStorage.getItem("yeyun_token");
            let _this = this;
            this.axios(testUrl + api.queryOrderTrack, {
                "token": token,
                "id": this.$route.query.logisticId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        if (data.data != null) {
                            _this.logisticList = data.data;
                        } else {
                            _this.logisticList = data.message;
                        }

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
        }
    },
    components: {
        "header-top": headerTop
    }
};
</script>
<style lang="less">
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

        .order-swipe {
            width: 93%;
        }
    }
    .swiper-button-next.swiper-button-black,
    .swiper-container-rtl .swiper-button-prev.swiper-button-black {
        background-size: 13px;
        border: none;
    }
    .swiper-button-next {
        right: -5px;
    }
}

.order-goodSW {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0 0.37rem 0 0.32rem;
    overflow: auto; // height: 8rem;
    .order-goodSInfo {
        display: flex;
        align-items: end; // padding: 0 0.39rem 0 0.32rem;
        // border-bottom: 1px solid #dfdfdf;
        padding-bottom: 0.28rem;
        margin-bottom: 0.11rem;
        .order-goodSIImg {
            width: 2.11rem;
            height: 2.11rem;
            margin-right: 0.76rem;
            img {
                width: 100%;
            }
        }
        .order-goodsDetail {
            width: 4.2rem;
            .order-goodsDName {
                line-height: 0.4rem;
                color: #333;
                font-size: 0.3rem;
                margin-bottom: 0.06rem;
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

.order-freight {
    padding-top: 0.14rem;
    margin-top: 0.15rem;
}

.order-priceAll {
    padding-bottom: 0.1rem;
}

.order-freight,
.order-priceAll {
    font-size: 0.26rem;
    color: #000;
    display: flex;
    justify-content: space-between;
    line-height: 0.56rem;
    span:nth-of-type(1) {
        font-weight: bold;
    }
    span:nth-of-type(2) {
        color: #000;
    }
}

.ld-contentWrap {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.35rem 0 0.3rem 0;
    .ld-content {
        padding: 0 0.34rem;
        .ld-contenLi {
            font-size: 0.26rem;
            display: flex;
            line-height: 0.4rem;
            padding-top: 0.25rem;
            .ld-contenLeft {
                margin-right: 0.16rem;
                .ld-contenOrder {
                    width: 0.4rem;
                    height: 0.4rem;
                    background: #30ce84;
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.22rem;
                }
                .ld-contentLine {
                    height: 1.26rem;
                    width: 1px;
                    background: linear-gradient(#aaaaaa, #fff);
                    margin: 0.05rem auto;
                }
            }
            .ld-contenRight {
                .ld-contenAddress {}
                .ld-contenTime {}
            }
        }
    }
}

.ld-logisFixed {
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .ld-logisWrap {
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
        .ld-logis {
            position: relative;
            .order-goodSIImg {
                margin: 0;
            }
            .ld-logisTitleW {
                p {
                    display: inline-block;
                }
                .ld-logisTitle {
                    padding: 0.36rem 0 0.36rem 0.32rem;
                    p:nth-of-type(1) {
                        font-weight: bold;
                    }
                }
                .ld-logisClose {
                    width: 0.3rem;
                    height: 0.3rem;
                    background-position: -4.85rem -1.52rem;
                    position: absolute;
                    top: 0.4rem;
                    right: 0.26rem;
                }
            }

            .order-goodSInfo {
                padding: 0.2rem 0;
                margin: 0;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>




