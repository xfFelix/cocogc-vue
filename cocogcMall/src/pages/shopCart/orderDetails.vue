<template>
    <div class="orderDetails">
        <header-top></header-top>
        <div class="od-titleWrap">
            <p class="od-titleInfoWrap">
                <span class="j1Png od-titleInfoImg"></span>
                <span class="od-titleInfo">待发货</span>
            </p>
            <p class="od-service">
                申请售后
            </p>

        </div>

        <div class="order-addressWN">
            <div class="order-addressW">
                <div class="order-address">
                    <p class="order-addPerson">
                        <span>默认</span>
                        <span>王先生</span>
                        <span>137****5425</span>
                    </p>
                    <p class="order-addInfo">
                        广东深圳市南山区 粤海街道科技生态园 10栋A座1002
                    </p>
                </div>
                <div>
                    <span class="goTo"></span>
                </div>
            </div>

            <div class="order-bottom"></div>
        </div>

        <div class="od-timeInfoWrap">
            <div class="od-numberWrap">
                <p class="od-number">
                    <span>订单编号：</span>
                    <span>201803051548625</span>
                </p>
                <p class="od-numberCopy">复制</p>
            </div>
            <div class="od-timeInfo">
                <span>下单时间：</span>
                <span>20190305</span>
                <span>15:01:24</span>
            </div>
        </div>

        <div v-for="(item,index) in list" :key="index" :class="item.goodStoreId">
            <div class="order-goodSW">
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

                <div class="od-goodSNumWrap one-top-px">
                    <p class="od-goodSNum">
                        <span class="od-goodSNumName">京东单号：</span>
                        <span>201803051548625</span>
                    </p>
                    <p class="od-logistic">
                        <span>查看物流</span>
                        <span class="od-goLogistics j1Png"></span>
                    </p>
                </div>
            </div>
        </div>

        <div class="od-priceWrap">
            <ul class="od-priceUl one-bottom-px">
                <li>
                    <span>商品总额</span>
                    <span>2045.32</span>
                </li>
                <li>
                    <span>运费</span>
                    <span>2045.32</span>
                </li>
                <li>
                    <span>服务费</span>
                    <span>2045.32</span>
                </li>
                <li>
                    <span>税费</span>
                    <span>2045.32</span>
                </li>

            </ul>
            <p class="od-realPrice">
                <span>实付：</span>
                <span>2563.02</span>
            </p>
        </div>

    </div>
</template>
<script>

import headerTop from "../../common/header.vue"
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
                        imgsrc: "static/images/goos_02.jpg"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }]
                },
                {
                    goodStore: "京东商品",
                    AllFlag: false,
                    goodStoreId: "bbb",
                    goodsList: [{
                        id: 1,
                        name: "京东商品1阿迪斯发是手动阀手动阀京东商品1阿迪斯发是手动阀手动阀",
                        price: 10,
                        count: 5,
                        Stotal: 180,
                        sku: '001',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false,
                        imgsrc: "static/images/goos_02.png"
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
                        imgsrc: "static/images/goos_02.png"
                    }]
                }, {
                    goodStore: "自营商品",
                    AllFlag: false,
                    goodStoreId: "ddd",
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
                }

            ],
        };
    },
    mounted() {
      

    },
    methods: {

    },
    components: {
        "header-top": headerTop
    }
};
</script>
<style lang="less">
.od-titleWrap {
    padding: 0.4rem 0.3rem 0 0.3rem;
    height: 1.26rem;
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
                span:nth-of-type(1) {
                    background: #30ce84;
                    color: #fff;
                    font-size: 0.24rem;
                    border-radius: 0.4rem;
                    padding: 0.1rem;
                }
                span:nth-of-type(2),
                span:nth-of-type(3) {
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
    margin-top: 0.2rem;
    padding: 0.2rem 0.37rem 0.2rem 0.32rem;
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
    padding: 0.28rem 0 0.08rem 0;
    .od-goodSNum {
        .od-goodSNumName {}
        span:nth-of-type(2) {}
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




