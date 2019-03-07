<template>
    <div class="logisticsDetail">
        <header-top></header-top>

        <div v-for="(item,index) in list" :key="index" :class="item.goodStoreId">
            <!-- 多种商品 -->
            <div v-if="item.goodsList.length>1" class="order-goodsMW">

                <div class="od-numberWrap">
                    <p class="od-number">
                        <span>订单编号：</span>
                        <span>201803051548625</span>
                    </p>
                    <p class="od-numberCopy">复制</p>
                </div>

                <div class="order-swipeW">
                    <div class="order-swipe">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(itemGoods,indexGoods) in item.goodsList" :key="indexGoods">
                                    <div class="order-goodsList">
                                        <img :src="itemGoods.imgsrc" alt="" />
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="order-goodsList">
                                        <!-- <img src="static/images/goos_01.png" alt="" /> -->
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
            <div class="order-goodSW" v-else>

                <div class="od-numberWrap">
                    <p class="od-number">
                        <span>订单编号：</span>
                        <span>201803051548625</span>
                    </p>
                    <p class="od-numberCopy">复制</p>
                </div>

                <div class="order-goodSInfo one-bottom-px" v-for="(itemGoods,indexGoods) in item.goodsList" :key="indexGoods">
                    <div class="order-goodSIImg">
                        <img :src="itemGoods.imgsrc" alt="" />
                    </div>
                    <div class="order-goodsDetail">
                        <p class="order-goodsDName">漫步者（EDIFIER） H210P 手机耳</p>
                        <p class="order-goodsDType">黑色</p>
                        <div class="order-goodsDPriceW">
                            <span class="order-goodsDPrice">105.00</span>
                            <p class="order-goodsDNumW">
                                <span class="order-goodsDNumI"></span>
                                <span class="order-goodsDNum">2</span>
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
                <li class="ld-contenLi">
                    <div class="ld-contenLeft">
                        <p class="ld-contenOrder">签</p>
                        <p class="ld-contentLine"></p>
                    </div>
                    <div class="ld-contenRight">
                        <p class="ld-contenAddress">
                            您的订单已由便利店代收（已在配送员处采用无纸化方式签收本订单）。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。
                        </p>
                        <p class="ld-contenTime">
                            <span>2019-03-15</span>
                            <span>17:45:32</span>
                        </p>
                    </div>
                </li>
                <li class="ld-contenLi">
                    <div class="ld-contenLeft">
                        <p class="ld-contenOrder">签</p>
                        <p class="ld-contentLine"></p>
                    </div>
                    <div class="ld-contenRight">
                        <p class="ld-contenAddress">
                            您的订单已由便利店代收您的订单已由便利店代收您的订单已
                        </p>
                        <p class="ld-contenTime">
                            <span>2019-03-15</span>
                            <span>17:45:32</span>
                        </p>
                    </div>
                </li>

            </ul>
        </div>

        <div class="ld-logisFixed">
            <div class="ld-logisWrap">
                <div class="ld-logis">
                    <div class="ld-logisTitleW one-bottom-px">
                        <div class="ld-logisTitle ">
                            <p>商品清单</p>
                            <p>共(
                                <span>10</span>)件</p>
                        </div>
                        <p class="j1Png ld-logisClose">

                        </p>

                    </div>

                    <div class="order-goodSW">
                        <div v-for="(item,index) in list" :key="index">
                            <div class="order-goodSInfo" v-for="(itemGoods,indexGoods) in item.goodsList" :key="indexGoods">
                                <div class="order-goodSIImg">
                                    <img :src="itemGoods.imgsrc" alt="" />
                                </div>
                                <div class="order-goodsDetail">
                                    <p class="order-goodsDName">漫步者（EDIFIER） H210P 手机耳</p>
                                    <p class="order-goodsDType">黑色</p>
                                    <div class="order-goodsDPriceW">
                                        <span class="order-goodsDPrice">105.00</span>
                                        <p class="order-goodsDNumW">
                                            <span class="order-goodsDNumI"></span>
                                            <span class="order-goodsDNum">2</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p class="order-freight">
                                <span>运费</span>
                                <span>0.00</span>
                            </p>
                            <p class="order-priceAll">
                                <span>小计</span>
                                <span>2054.00</span>
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
export default {
    data() {
        return {
            list: [
                {
                    goodStore: "京东商品",
                    AllFlag: false,
                    goodStoreId: "aaa",
                    goodsList: [{
                        id: 1,
                        name: "京东商品1阿迪斯发是手动阀手动阀京东商品1阿迪斯发是手动阀手动阀",
                        price: 10,
                        count: 5,
                        Stotal: 180,
                        sku: '001',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }]
                },

                {
                    goodStore: "自营商品",
                    AllFlag: false,
                    goodStoreId: "ccc",
                    goodsList: [{
                        id: 3,
                        name: "自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品11",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '003',
                        check: false,
                        imgsrc: "static/images/goos_01.png"
                    }]
                },
            ],
        };
    },
    mounted() {
        //多商品轮播图
        this.list.forEach((res) => {
            var goodsId = res.goodStoreId;
            var classg = '.' + goodsId + ' .swiper-container';
            var bnt = '.' + goodsId + ' .swiper-button-next';
            new Swiper(classg, {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: bnt,
                    // prevEl: '.swiper-button-prev',
                },

            })
        });

    },
    methods: {

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
    overflow: auto;
    height: 8rem;

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




