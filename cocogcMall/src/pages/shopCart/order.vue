<template>
    <div class="order">
        <header-top></header-top>

        <!-- 地址 -->
        <div>
            <div class="order-addressWN" addressMag>

                <router-link  class="order-addressW" to="/addressMag">
                    <div class="order-address">
                        <p class="order-addPerson">
                            <span>默认</span>
                            <span>{{dataAddress.userName}}</span>
                            <span>{{dataAddress.userMobile}}</span>
                        </p>
                        <p class="order-addInfo">
                            {{dataAddress.userAddress}}
                        </p>
                    </div>
                    <div>
                        <span class="goTo" @click="$router.push('/addressEdit')"></span>
                    </div>
                </router-link>

                <div class="order-addressN">
                    <span class="order-addNImg"></span>
                    <p>您还没有收货地址，点击添加</p>
                </div>

                <div class="order-bottom"></div>
            </div>
            

            <div v-for="(dataItem,dataIndex) in dataList" :key="dataIndex">

                <!-- 多种商品 -->
                <div v-if="dataItem.goodsList.length>1" class="order-goodsMW">
                    <div class="order-goodS">
                        <span class="shop-dNameImg"></span>
                        <span>{{dataItem.vendorId}}</span>
                        <p>
                            (共
                            <span></span>件)
                        </p>
                    </div>

                    <div class="order-swipeW" :class="'res'+dataItem.goodsList[0].goodsId">
                        <div class="order-swipe">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(itemGoods,indexGoods) in dataItem.goodsList" :key="indexGoods">
                                        <div class="order-goodsList">
                                            <!-- <img :src="itemGoods.imgsrc" alt="" /> -->
                                            <!-- <img src="static/images/goos_01.png" alt="" /> -->
                                            {{itemGoods.goodsName}}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div class="swipe-bntWrap">
                            <div class="swiper-button-next swiper-button-black"></div>
                        </div>
                    </div>

                    <p class="order-freight one-top-px">
                        <span>运费</span>
                        <span>0.00</span>
                    </p>
                    <p class="order-priceAll">
                        <span>小计</span>
                        <span>2054.00</span>
                    </p>
                </div>

                <!-- 单种商品 -->
                <div class="order-goodSW" v-else>
                    <div class="order-goodS">
                        <span class="shop-dNameImg"></span>
                        <span>{{dataItem.vendorId}}</span>
                        <p>
                            (共
                            <span>2</span>件)
                        </p>
                    </div>

                    <div class="order-goodSInfo one-bottom-px">
                        <div class="order-goodSIImg">
                            <!-- <img :src="itemGoods.imgsrc" alt="" /> -->
                        </div>
                        <div class="order-goodsDetail" v-for="(itemGoods,indexGoods) in dataItem.goodsList" :key="indexGoods">
                            <p class="order-goodsDName">{{itemGoods.goodsName}}</p>
                            <p class="order-goodsDType">黑色</p>
                            <div class="order-goodsDPriceW">
                                <span class="order-goodsDPrice">{{itemGoods.totalMoney}}</span>
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

                <!-- 费用 -->
                <div class="order-priceDetail one-bottom-px">
                    <p>
                        <span>商品</span>
                        <span>{{dataItem.sellMoney}}</span>
                    </p>
                    <p>
                        <span>运费</span>
                        <span>{{dataItem.shippingFee}}</span>
                    </p>
                    <p>
                        <span>服务费</span>
                        <span>{{dataItem.serviceMoney}}</span>
                    </p>
                    <p>
                        <span>税费</span>
                        <span>{{dataItem.taxFee}}</span>
                    </p>
                    <p>
                        <span>合计</span>
                        <span>{{dataItem.totalMoney}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="order-sumitW">
            <div class="order-sumitP">
                <span class="shop-cPriceInt">{{message|toDecimal2Fp(message)}}.</span>
                <span class="shop-cPriceFloat">{{message|toDecimal2Ap(message)}}</span>
            </div>
            <div class="order-sumit">提交订单</div>
        </div>
    </div>
</template>

<script>
import headerTop from "../../common/header.vue"
import Swiper from 'swiper';
import api from '../../service/api';

export default {
    data() {
        return {
            dataList: [],
            dataAddress: {},
            message: ""
        };
    },
    mounted() {
        this.previewOrder()
    },
    methods: {
        // 订单预览
        previewOrder: function() {
            var token = localStorage.getItem("token");
            let _this = this;
            this.axios(testUrl + api.previewOrder, {
                "token": "hhf7512935295b36d9b469e672c531d4c8",
                "id": "b636fd2b5cfb481b875f25f69e7c8fae",
                "buys": [
                    {
                        "goodsId": "35",
                        "nums": "1"
                    },
                    {
                        "goodsId": "34",
                        "nums": "1"
                    },
                    {
                        "goodsId": "33",
                        "nums": "1"
                    }]
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.message = data.message;
                        _this.dataList = data.data;
                        _this.dataAddress = data.data[0];
                        //多商品轮播图
                        _this.dataList.forEach((res, index) => {
                            if (res.goodsList.length > 1) {
                                var goodsId = 'res' + res.goodsList[0].goodsId;
                                var classg = '.' + goodsId + ' .swiper-container';
                                var bnt = '.' + goodsId + ' .swiper-button-next';
                                _this.$nextTick(function() {
                                    new Swiper(classg, {
                                        slidesPerView: 4,
                                        slidesPerGroup: 1,
                                        spaceBetween: 10,
                                        navigation: {
                                            nextEl: bnt,
                                            // prevEl: '.swiper-button-prev',
                                        },
                                    })
                                })
                            }
                        });
                        //地址存到localStorage
                        var editItem = JSON.stringify(_this.dataAddress);
                        localStorage.setItem('addressEdit', editItem);
                    

                    }
                })
                .catch((err) => {

                })
        },



    },
    components: {
        "header-top": headerTop
    }

}
</script>

<style lang="less">
.order-bottom {
    height: 0.1rem;
    background-image: url(/static/images/bgRepeat.jpg);
    background-repeat: repeat-x;
    margin-left: -0.1rem;
}

.swipe-bntWrap {
    width: 0.32rem;
    height: 0.6rem;
    position: relative;
    overflow: hidden;
    margin-left: 0.2rem;
}

.order-addressWN {
    margin-top: 0.2rem;
    .order-addressN {
        display: none;
        text-align: center;
        background: #fff;
        padding: 0.7rem 0 0.78rem 0;
        .order-addNImg {
            width: 0.4rem;
            height: 0.4rem;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            background-position: -0.85rem -0.76rem;
            display: inline-block;
            padding-bottom: 0.2rem;
        }
        p {
            color: #999999;
        }
    }
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


.order-goodSW {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0 0.37rem 0 0.32rem;

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
            width: 57%;
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

.order-freight,
.order-priceAll {
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
}

.order-priceAll {
    padding-bottom: 0.14rem;
    span:nth-of-type(2) {
        color: #30ce84;
    }
}

.order-goodS {
    display: flex;
    align-items: center;
    padding: 0.3rem 0 0.44rem 0;
    .shop-dNameImg {
        width: 0.38rem;
        height: 0.38rem;
        background-position: -3.55rem -0.75rem;
        margin-right: 0.19rem;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-size: 5.8rem 1.86rem;
        display: inline-block;
    }
    span:nth-of-type(2) {

        color: #000;
        font-size: 0.3rem;
        font-weight: bold;
    }
    p {
        display: inline-block;
    }
}

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

.order-priceDetail {
    background: #fff;
    padding: 0.32rem 0.37rem 0.08rem 0.29rem;
    p {
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        line-height: 0.6rem;
        span:nth-of-type(1) {
            color: #666666;
        }
        span:nth-of-type(2) {
            color: #000000;
        }
    }
}

.order-sumitW {
    height: 1.2rem;
    background: #fff;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0.27rem;
    margin-bottom: 48px;
    .order-sumitP {
        span:nth-of-type(1) {
            font-size: 0.48rem;
        }
        span:nth-of-type(2) {
            font-size: 0.3rem;
        }
    }
    .order-sumit {
        width: 2.4rem;
        background: #30ce84;
        color: #ffffff;
        font-size: 0.3rem;
        text-align: center;
    }
}
</style>
