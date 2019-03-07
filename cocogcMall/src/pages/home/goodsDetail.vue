<template>
    <div class="goodsDetail page-wrapper">
        <div class="goodsD-headW">
            <div class="goodsD-headImg">

                <div class="swiper-container goodsD-headImg">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="static/images/goodBanner.jpg" alt="" /></div>
                        <div class="swiper-slide"><img src="static/images/goodBanner.jpg" alt="" /></div>
                        <div class="swiper-slide"><img src="static/images/goodBanner.jpg" alt="" /></div>
                        <div class="swiper-slide"><img src="static/images/goodBanner.jpg" alt="" /></div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Add Arrows -->

                </div>

            </div>
            <div class="goodsD-hBM">
                <p class="goodsD-hBack" @click="$router.go(-1)">
                    <span></span>
                </p>
                <div class="home-message">
                    <span class="home-msg"></span>
                    <span class="home-msgNum">11</span>
                </div>
            </div>
        </div>

        <div class="goodsD-priceAddress">
            <div class="goodsD-priceW one-bottom-px">
                <div class="changeGoods">
                    <p class="changeGoodsa">忆江南 茶叶乌龙茶 新天尊龙品 安溪特级铁观音茶叶年货礼盒 500g</p>
                    <p class="changeGoodsb">9000</p>
                </div>
                <div class="changeMoney">
                    <p class="changeMoneya">8200</p>
                    <p class="changeMoneyb">兑换价</p>
                </div>
            </div>

            <div class="goodsD-addressInfo">
                <div class="goodsD-address">
                    <p>送至</p>
                    <p>服务</p>
                </div>
                <div class="goodsD-serve">
                    <p>
                        <span>选择地区</span>
                        <span class="j1Png goodsD-addressGO"></span>
                    </p>
                    <p>由京东发货，并提供售后服务，服务电话4006-066-866</p>
                </div>
            </div>
        </div>

        <div class="goodsD-info">
            <h3>商品简介</h3>
            <p>
                <span>商品编号</span>
                <span>1534BIHJ4</span>
            </p>
            <p>
                <span>品牌</span>
                <span>忆江南</span>
            </p>
            <p>
                <span>保质期</span>
                <span>365天</span>
            </p>
            <p>
                <span>等级</span>
                <span>明前特级</span>
            </p>
            <p>
                <span>储存方法</span>
                <span>密封，防异味，干燥</span>
            </p>
            <p>
                <span>产品标准号</span>
                <span>Q/HXZ</span>
            </p>
            <p>
                <span>生产许可证</span>
                <span>0001S</span>
            </p>
            <p>
                <span>净含量</span>
                <span>SC11433016574984</span>
            </p>
        </div>

        <div class="goodsD-eval">
            <h3>商品评价(
                <span>54</span>)</h3>

            <div class="goodsD-evalSwipe">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="goodsD-evalList">
                                <div class="goodsD-evalNum">
                                    <div class="goodsD-humanH">
                                        <img src="static/images/goos_01.png" alt="" />
                                    </div>
                                    <div class="goodsD-humanNik">
                                        <p class="goodsD-tel">
                                            137****1545
                                        </p>
                                        <p class="goodsD-startW">
                                            <span class="goodsD-start"></span>
                                            <span class="goodsD-startGray"></span>
                                        </p>
                                    </div>
                                </div>
                                <p class="goodsD-evalInfo">不错不错，非常喜欢。包装挺好的。做工也很不错，物流 超赞。</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="goodsD-evalList">
                                <div class="goodsD-evalNum">
                                    <div class="goodsD-humanH">
                                        <img src="static/images/goos_01.png" alt="" />
                                    </div>
                                    <div class="goodsD-humanNik">
                                        <p class="goodsD-tel">
                                            137****1545
                                        </p>
                                        <p class="goodsD-startW">
                                            <span class="goodsD-start"></span>
                                            <span class="goodsD-startGray"></span>
                                        </p>
                                    </div>
                                </div>
                                <p class="goodsD-evalInfo">不错不错，非常喜欢。包装挺好的。做工也很不错，物流 超赞。</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="goodsD-evalList">
                                <div class="goodsD-evalNum">
                                    <div class="goodsD-humanH">
                                        <img src="static/images/goos_01.png" alt="" />
                                    </div>
                                    <div class="goodsD-humanNik">
                                        <p class="goodsD-tel">
                                            137****1545
                                        </p>
                                        <p class="goodsD-startW">
                                            <span class="goodsD-start"></span>
                                            <span class="goodsD-startGray"></span>
                                        </p>
                                    </div>
                                </div>
                                <p class="goodsD-evalInfo">不错不错，非常喜欢。包装挺好的。做工也很不错，物流 超赞。</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="goodsD-evalList">
                                <div class="goodsD-evalNum">
                                    <div class="goodsD-humanH">
                                        <img src="static/images/goos_01.png" alt="" />
                                    </div>
                                    <div class="goodsD-humanNik">
                                        <p class="goodsD-tel">
                                            137****1545
                                        </p>
                                        <p class="goodsD-startW">
                                            <span class="goodsD-start"></span>
                                            <span class="goodsD-startGray"></span>
                                        </p>
                                    </div>
                                </div>
                                <p class="goodsD-evalInfo">不错不错，非常喜欢。包装挺好的。做工也很不错，物流 超赞。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="goodsD-imgW">
            <h3>商品详情</h3>

        </div>

        <div class="goodDetail-buyW">
            <div class="goodDetail-bMoney">
                <p class="goodDetail-bmReal">
                    2000
                </p>
                <p class="goodDetail-bmNo">9000.00</p>
            </div>

            <div class="goodDetail-buyCO">
                <div class="goodDetail-buyCard">
                    <p class="navImg goodDetail-bcImg">
                        <span>200</span>
                    </p>
                    <p class="goodDetail-bcName">购物车</p>
                </div>
                <div class="goodDetail-buyOper">
                    <p class="goodDetail-boAdd">加入购物车</p>
                    <p class="goodDetail-boNow">立即购买</p>
                </div>
            </div>
        </div>

        <div class="goodDetail-selectFixed" @click="fixedClose($event)" v-if="fixedCloseFlag">
            <div class="goodDetail-selectW">
                <div class="goodDetail-sim">
                    <div class="goodDetail-sGoodsImg">
                        <img src="static/images/goos_01.png" alt="" />
                    </div>
                    <div class="goodDetail-sMI">
                        <p class="goodDetail-sMoney">5200.00</p>
                        <p class="goodDetail-sInfo">已选：已选：银色，128G，标配版，1个已选：银色，128G，标配版，1个</p>
                    </div>
                    <div class="j1Png goodDetail-sClose"></div>
                </div>

                <div class="goodDetail-selectPage">
                    <div class="goodDetail-selectTypeW">
                        <p class="goodDetail-sType">颜色</p>
                        <p class="goodDetail-sTypeSlect">
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeActive">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                        </p>
                    </div>

                    <div class="goodDetail-selectTypeW">
                        <p class="goodDetail-sType">颜色</p>
                        <p class="goodDetail-sTypeSlect">
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeActive">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                            <span class="goodsTypeNo">极光色</span>
                        </p>
                    </div>

                    <div class="goodDetail-selectNumW">
                        <span class="goodDetail-selectDec">-</span>
                        <span class="goodDetail-selectNum"><input type="number" value="1"></span>
                        <span class="goodDetail-selectInc">+</span>
                    </div>
                </div>

                <div class="button goodsDetailBnt">确定</div>
            </div>

        </div>

    </div>
</template>


<script>
import Swiper from 'swiper';
export default {
    data() {
        return {
            fixedCloseFlag:true
        };
    },
    mounted() {
        //图片轮播
        var swiperBan = new Swiper('.goodsD-headImg .swiper-container', {
            pagination: {
                el: '.goodsD-headImg .swiper-pagination',
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                        ' | ' +
                        '<span class="' + totalClass + '"></span>';
                },
            },
        });
        //评价轮播
        var swiperBan = new Swiper('.goodsD-eval .swiper-container', {
            spaceBetween: 10,
            autoplay: false,
            autoplayDisableOnInteraction: false, 
            slidesPerGroup: 1,
            slidesPerView: "auto",
            centeredSlides: true,
        });
    },
    methods: {
        fixedClose(e) {
            if (e.target.className.indexOf('goodDetail-sClose') != -1 || e.target.className.indexOf('goodDetail-selectFixed') != -1) {
                this.fixedCloseFlag = false;
            }
        }


    },
    components: {

    }
};
</script>


<style lang="less">
.goodsD-headW {
    .goodsD-headImg {
        height: 7.5rem;
        img {
            height: 100%;
        }
    }
    .goodsD-hBM {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0.44rem;
        left: 0;
        width: 100%;
        z-index: 1;
        .goodsD-hBack {
            display: inline-block;
            width: 0.78rem;
            height: 0.78rem;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
            margin-left: 0.2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: relative;

            span {
                width: 0.22rem;
                height: 0.4rem;
                display: inline-block;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-position: -3.77rem -1.25rem;
                background-size: 5.8rem 1.86rem;
                margin-top: -0.04rem;
                margin-right: 0.1rem;
            }
        }
        .home-message {
            display: inline-block;
            width: 0.78rem;
            height: 0.78rem;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
            margin-right: 0.14rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: relative;
            .home-msg {
                width: 0.4rem;
                height: 0.4rem;
                display: inline-block;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-position: -2.68rem -0.19rem;
                background-size: 5.8rem 1.86rem;
            }
            .home-msgNum {
                position: absolute;
                right: -0.06rem;
                top: 0;
                background: #f63132;
                font-size: 0.18rem;
                padding: 0.06rem 0.12rem 0.02rem 0.12rem;
                border-radius: 40px;
                color: #fff;
            }
        }
    }
    .swiper-pagination {
        color: #fff;
        text-align: right;
        .swiper-pagination-total {
            margin-right: 0.25rem;
        }
    }
}

.goodsD-priceAddress {
    background: #FFF;
    padding: 0 0.38rem;
    .goodsD-priceW {
        background: #fff; // margin-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        .changeMoney {
            width: 1.4rem;
            height: 1.4rem;
            display: block;
            text-align: center;
            /* margin: 0 auto; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0.38rem 0 0.24rem 0;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            .changeMoneya {
                color: #fe5a4c;
                font-size: 0.36rem;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }
            .changeMoneyb {
                border: 1px solid #000;
                width: 60%;
                font-size: 0.24rem;
            }
        }
        .changeGoods {
            width: 4.8rem;
            .changeGoodsa {
                line-height: 0.5rem;
                margin-top: 0.5rem;
            }
            .changeGoodsb {
                text-decoration: line-through;
            }
        }
    }
    .goodsD-addressInfo {
        background: #fff;
        font-size: 0.26rem;
        margin-bottom: 0.2rem;
        display: flex;
        padding: 0.34rem 0;
        .goodsD-address {
            width: 10%;
            color: #999;
            p:nth-of-type(1) {
                margin-bottom: 0.1rem;
            }
        }
        .goodsD-serve {
            p:nth-of-type(1) {
                margin-bottom: 0.1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .goodsD-addressGO {
                    width: 0.22rem;
                    height: 0.26rem;
                    display: inline-block;
                    background-position: -3.24rem -0.76rem;
                }
            }
        }
    }
}


.goodsD-info {
    margin-bottom: 0.22rem;
    padding: 0.22rem 0.24rem;
    background: #fff;
    h3 {

        font-size: 0.3rem;
        color: #000000;
    }
    p {
        font-size: 0.26rem;
        line-height: 0.68rem;
        span:nth-of-type(1) {
            color: #999999;
            padding: 0.18rem 0 0.06rem 0;
        }
        span:nth-of-type(2) {
            color: #333333;
        }
    }
}

.goodsD-eval {
    background: #fff;
    margin-bottom: 0.22rem;
    padding-bottom: 0.38rem;
    .swiper-container {
        // width: 88%;
        overflow: hidden;
        margin: 0 auto;
    }
    .swiper-wrapper {
        width: 88%;
    }
    h3 {
        padding: 0.22rem 0 0.36rem 0.22rem;
        font-size: 0.3rem;
        color: #000000;
    }
    .goodsD-evalList {
        border: 1px solid #cccccc;
        padding: 0.3rem 0.24rem; // width: 80%;
        .goodsD-evalNum {
            display: flex;
            align-items: flex-end;
            .goodsD-humanH {
                width: 0.6rem;
                height: 0.6rem;
                display: inline-block;
                margin-right: 0.2rem;
                img {
                    width: 100%;
                }
            }
            .goodsD-humanNik {
                display: inline-block;
                .goodsD-tel {
                    font-size: 0.28rem;
                    color: #000;
                }
                .goodsD-startW {
                    .goodsD-start,
                    .goodsD-startGray {
                        width: 0.26rem;
                        height: 0.26rem;
                        display: inline-block;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-size: 5.8rem 1.86rem;
                        float: left;
                    }
                    .goodsD-start {
                        background-position: -4.11rem -1.28rem;
                    }
                    .goodsD-startGray {
                        background-position: -4.49rem -1.28rem;
                    }
                }
            }
        }
    }
    .goodsD-evalInfo {
        font-size: 0.26rem;
        line-height: 0.3rem;
        padding-bottom: 0.34rem;
    }
}

.goodsD-imgW {
    background: #fff;
    h3 {
        color: #000;
        padding: 0.5rem 0.26rem;
    }
    margin-bottom: 0.9rem;
}

.goodDetail-buyW {
    height: 1.16rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    .goodDetail-bMoney {
        margin-left: 0.2rem;
        .goodDetail-bmReal {
            font-size: 0.36rem;
            color: #333;
        }
        .goodDetail-bmNo {
            color: #999;
            font-size: 0.24rem;
            text-decoration: line-through;
        }
    }
    .goodDetail-buyCO {
        display: flex;
        .goodDetail-buyCard {
            color: #000000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .goodDetail-bcImg {
                width: 0.42rem;
                height: 0.42rem;
                position: relative;
                background-position: -1.71rem -0.73rem;
                margin: 0 auto;
                span {
                    position: absolute;
                    top: -5px;
                    left: 50%;
                    background: #f73130;
                    font-size: 0.18rem;
                    color: #fff;
                    border-radius: 40px;
                }
            }
            .goodDetail-bcName {
                font-size: 0.3rem;
            }
        }
        .goodDetail-buyOper {
            display: flex;
            line-height: 0.92rem;
            height: 0.92rem;
            font-size: 0.3rem;
            color: #fff;
            text-align: center;
            margin-left: 0.2rem;
            .goodDetail-boAdd {
                background: #313340; // padding: 0 0.27rem 0 0.36rem;
                width: 2.11rem;
                border-radius: 40px 0 0 40px;
            }
            .goodDetail-boNow {
                width: 2.11rem;
                border-radius: 0 40px 40px 0;
                background: #30ce84;
            }
        }
    }
}


.goodDetail-selectFixed {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 12;
    .goodDetail-selectW {
        height: 8.7rem;
        background: #fff;
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 0.37rem;
        box-sizing: border-box;
        .goodDetail-sim {
            .goodDetail-sClose {
                width: 0.3rem;
                height: 0.3rem;
                background-position: -4.85rem -1.52rem;
                position: absolute;
                top: 0.4rem;
                right: 0.26rem;
            }
            display: flex;
            padding: 0.3rem 0 0.2rem 0;
            .goodDetail-sGoodsImg {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 0.24rem;
                img {
                    width: 100%;
                } 
            }
            .goodDetail-sMI {
                width: 72%;
                .goodDetail-sMoney {
                    font-size: 0.36rem;
                    color: #fe5a4c;
                    font-weight: bold;
                    margin-bottom: 0.04rem;
                }
                .goodDetail-sInfo {
                    font-size: 0.24rem;
                    color: #666;
                }
            }
        }
        .goodDetail-selectPage {
            position: relative;
            height: 5.4rem;
            overflow: scroll;
            width: 100%;
            .goodDetail-selectTypeW {
                font-size: 0.24rem;
                .goodDetail-sType {
                    color: #999999;
                    margin-top: 0.2rem;
                }
                .goodDetail-sTypeSlect {
                    .goodsTypeNo {
                        background: #f1f1f1;
                        color: #333333;
                    }
                    .goodsTypeActive {
                        background: #30ce84;
                        color: #fff;
                    }
                    span {
                        height: 0.46rem;
                        line-height: 0.46rem;
                        padding: 0 0.13rem;
                        border-radius: 3px;
                        margin: 0.1rem 0.13rem 0.1rem 0;
                        display: inline-block;
                    }
                }
            }
            .goodDetail-selectNumW {
                height: 0.45rem;
                margin-top: 0.5rem;
                span {
                    float: left;
                    background: #f1f1f1;
                    height: 0.45rem;
                    border-radius: 3px;
                }
                .goodDetail-selectDec,
                .goodDetail-selectInc {
                    width: 0.45rem;

                    display: inline-block;

                    text-align: center;
                    line-height: 0.45rem;
                    color: #666666;
                }
                .goodDetail-selectDec {}
                .goodDetail-selectNum {
                    width: 1.15rem;
                    display: flex;
                    margin: 0 0.1rem;
                    input {
                        width: 100%;
                        height: 100%;
                        background: #f1f1f1;
                        text-align: center;
                        display: inline-block;
                        line-height: 0.45rem;
                        border-radius: 3px;
                        font-size: 0.24rem;
                        font-weight: bold;
                    }
                }
                .goodDetail-selectInc {}
            }
        }
    }
    .goodsDetailBnt {
        background: #30ce84;
    }
}
</style>