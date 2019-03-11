<template>
    <div class="shop">
        <div class="shop-headW">
            <h3 class="shop-title">购物车</h3>
            <p class="shop-headR" v-if="list.length != 0">
                <span class="shop-headWrite" @click="deitDel" v-if="deitDelFlag">编辑</span>
                <span class="shop-headWrite" @click="deitDelOk" v-if="!deitDelFlag">完成</span>
            </p>
        </div>

        <div class="shop-content">
            <div class="shop-dropW">
                <p>
                    <span class="shop-horn"></span>
                    <span class="shop-dropCon">购物车中有
                        <span class="shop-dropNum">2</span>
                        件商品已降价，快去看看
                    </span>
                </p>
                <span class="shop-dClose"></span>
            </div>

            <div class="shop-dStoreWW">
                <div class="shop-dStoreW" v-for="(items,index) in list" :key="index">
                    <div class="shop-dStore">
                        <span @click="selTypeAll(items,index,$event)" :class="!items.AllFlag ?'shop-selectN':'shop-selectY'"></span>
                        <!-- <input type="checkbox" id="shop_all"  v-model="selTypeAllFlag">
                            <label for="shop_all" class="shop" :class="selTypeAllFlag?'shop-selectY':'shop-selectN'" @click="selTypeAll(items,index,$event)"></label> -->
                        <span class="shop-dNameImg"></span>
                        <span class="shop-dName">{{items.goodStore}}</span>
                        <span class="shop-dGo"></span>
                    </div>
                    <ul class="shop-contentUl">
                        <li v-for="(goodsItem,goodsIndex) in items.goodsList" :key="goodsIndex">
                            <span class="shop-selectW">
                                <span @click="selGoods(index,goodsIndex,$event)" :class="!goodsItem.check?'shop-selectN':'shop-selectY'">
                                </span>
                            </span>
                            <span class="shop-selImg">
                                <img src="static/images/goos_01.png" alt="" />
                            </span>
                            <div class="shop-selInfo">
                                <p class="shop-selGoodsT">{{goodsItem.name}}</p>
                                <p class="shop-selGoodsC">{{goodsItem.goodSInfo}}</p>
                                <div class="shop-selGoodsN">
                                    <span class="shop-selGoodsS">{{goodsItem.price*goodsItem.count}}</span>
                                    <p class="shop-selGoodsOW">
                                        <!-- <span @click="goodsItem.count>0?goodsItem.count :goodsItem.count" :class="goodsItem.count>0?'decNum':'decNoNum'"></span> -->
                                        <span @click="numDecrease(goodsItem,goodsIndex),storeMoney() " :class="goodsItem.count>1?'decNum':'decNoNum'"></span>
                                        <span><input type="number" @input="storeMoney" v-model.number="goodsItem.count" /></span>
                                        <!-- 是否需要有货和没货？+号颜色是否要变 -->
                                        <span @click="numIncrease(index,goodsItem,goodsIndex),storeMoney()"></span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div class="shopEmpty" v-if="list.length == 0">
            <p>购物车竟然是空的~~</p>
            <p>再忙也记得买点什么犒赏自己</p>
        </div>

        <!-- 猜你喜欢 -->
        <guess-like></guess-like>

        <div class="shop-cartBot" v-if="list.length != 0">
            <p class="shop-cSelectW">
                <span @click="selectAll()" :class="!selectAllFlag?'shop-selectN':'shop-selectY'"></span>
                <span>全选</span>
            </p>

            <div class="shop-cPN" v-if="deitDelFlag">
                <p class="shop-cPriceW">
                    <span class="shop-cPriceInt">{{selectAllPrice|toDecimal2Fp(selectAllPrice)}}.</span>
                    <span class="shop-cPriceFloat">{{selectAllPrice|toDecimal2Ap(selectAllPrice)}}</span>
                </p>
                <p class="shop-cartNumW" :class="selectAllGoods>0?'shop-cartNum1':'shop-cartNum0'">
                    <span class="shop-carNumI" @click="settleGoods">
                        去结算(
                        <span class="shop-cartNum">{{selectAllGoods}}</span>)
                    </span>
                </p>
            </div>

            <div class="shop-cPN" v-if="!deitDelFlag">
                <p class="shop-cartNumW" :class="selectAllGoods>0?'shop-cartNum1':'shop-cartNum0'">
                    <span class="shop-carNumI" @click="delGoods">
                        删除(
                        <span class="shop-cartNum">{{selectAllGoods}}</span>)
                    </span>
                </p>
            </div>
        </div>

        <!-- <v-footer></v-footer> -->
    </div>
</template>
<script>
import Guesslike from "../../common/guesslike.vue";
import Footer from '../../common/footer.vue'
export default {
    data() {
        return {
            list: [
                {
                    goodStore: "京东商品",
                    AllFlag: false,
                    goodsList: [{
                        id: 1,
                        name: "京东商品1阿迪斯发是手动阀手动阀京东商品1阿迪斯发是手动阀手动阀",
                        price: 1.8,
                        count: 5,
                        Stotal: 180,
                        sku: '001',
                        check: false
                    }, {

                        id: 1,
                        name: "京东商品22222222222222222222222222222222222222222222222是手动阀手动阀",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '002',
                        check: false
                    }]
                },
                {
                    goodStore: "自营商品",
                    AllFlag: false,
                    goodsList: [{
                        id: 3,
                        name: "自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品自营商品11",
                        price: 10,
                        count: 1,
                        Stotal: 180,
                        sku: '003',
                        check: false
                    }]
                }

            ],
            selTypeAllFlag: false,
            selGoodsFlag: false,
            selectAllFlag: false,
            selectAllPrice: 0,
            selectAllGoods: 0,
            deitDelFlag: true,

        };
    },
    mounted() {


    },
    watch: {

    },
    methods: {
        // 删除
        delGoods() {

            if (this.selectAllFlag == true) {
                this.list.splice(0, this.list.length)
            }
            this.list.forEach((res, resIndex) => {
                if (res.AllFlag == true) {
                    this.list.splice(resIndex, 1)
                }
                res.goodsList.forEach((res2, resIndex2) => {
                    if (res2.check == true) {
                        res.goodsList.splice(resIndex2, 1)
                    }
                })
            })

            this.selectAllGoods = 0;
            this.selectAllPrice = 0;
        },
        //结算
        settleGoods() {
            if (this.selectAllGoods > 0) {
                this.$router.push('/order');

            }
        },
        //编辑
        deitDel() {
            this.deitDelFlag = false;

        },
        deitDelOk() {
            this.deitDelFlag = true;

        },
        findPositon(id) {

        },
        // 数量减小
        numDecrease(goodsItem, goodsIndex) {
            if (goodsItem.count > 1) {
                goodsItem.count--;
            }
            this.selectAllPrice = 0;
            this.list.forEach((res) => {
                res.goodsList.forEach((res2) => {
                    if (res2.check == true) {
                        this.selectAllPrice += res2.count * res2.price;

                    }
                })
            })
        },
        //增加
        numIncrease(index, goodsItem, goodsIndex) {
            goodsItem.count++
            this.selectAllPrice = 0;
            this.list.forEach((res) => {
                res.goodsList.forEach((res2) => {
                    if (res2.check == true) {
                        this.selectAllPrice += res2.count * res2.price;

                    }
                })
            })
        },
        //输入的数量
        storeMoney(e) {
            this.selectAllPrice = 0;
            this.list.forEach((res) => {
                res.goodsList.forEach((res2) => {
                    if (res2.check == true) {
                        this.selectAllPrice += res2.count * res2.price;
                    }

                })
            })

            // let tgoodCount =  e.target.value.replace(/[^1-9]*$/,"");
            // return tgoodCount

        },
        //单个商品选中
        selGoods(index, goodsIndex) {
            var List = this.list;
            List[index].goodsList[goodsIndex].check = !List[index].goodsList[goodsIndex].check;
            //判断是否全选
            this.Isquanxuan(index);
            this.selectAllPrice = 0;
            this.selectAllGoods = 0;
            this.list.forEach((res) => {
                res.goodsList.forEach((res2) => {
                    if (res2.check == true) {
                        this.selectAllPrice += res2.count * res2.price;
                        this.selectAllGoods++
                    }
                })
            })

        },
        //全选
        selectAll() {
            this.selectAllFlag = !this.selectAllFlag;
            this.selectAllPrice = 0;
            this.selectAllGoods = 0;
            this.list.forEach((res) => {
                res.AllFlag = this.selectAllFlag
                res.goodsList.forEach((res2) => {
                    res2.check = this.selectAllFlag;
                    if (res.AllFlag == true) {
                        this.selectAllPrice += res2.count * res2.price;
                        this.selectAllGoods++
                    }
                })

            })
        },
        //某个商品不选，全选不选
        Isquanxuan(index) {
            let List = this.list;
            let Notselected = true;
            List[index].goodsList.forEach((res) => {
                if (!res.check) {
                    Notselected = false
                }
            })
            List[index].AllFlag = Notselected;
            this.IsStorexuan()
        },
        //某个店铺不选，全选不选
        IsStorexuan() {
            let storeNot = true;
            this.list.forEach((res) => {
                if (!res.AllFlag) {
                    storeNot = false;
                }
            })
            this.selectAllFlag = storeNot;
        },
        //店铺商品选中
        selTypeAll(itemStore, index, e) {
            let List = this.list;
            this.selectAllPrice = 0;
            this.selectAllGoods = 0;
            List[index].AllFlag = !List[index].AllFlag;
            List[index].goodsList.forEach((res) => {
                res.check = List[index].AllFlag;
            })
            this.list.forEach((res) => {
                if (res.AllFlag == true) {
                    res.goodsList.forEach((res2) => {
                        this.selectAllPrice += res2.count * res2.price;
                        this.selectAllGoods++
                    })
                }
            })

            this.IsStorexuan();
        },






    },
    components: {
        "guess-like": Guesslike,
        "v-footer": Footer
    }
};
</script>

<style lang="less">
.shop-headW {
    background: #fff;
    position: relative;
    .shop-title {
        text-align: center;
        height: 1.28rem;
        line-height: 1.28rem;
        font-size: 0.36rem;
        color: #333333;
        font-weight: normal;
    }
    .shop-headR {
        position: absolute;
        right: 0;
        top: 0.44rem;
        display: flex;
        justify-content: center;
        padding-right: 0.38rem;
        .shop-headWrite {
            font-size: 0.3rem; // margin-right: 0.42rem;
        }
    }
}

.shop-content {
    position: relative;
    .shop-dStoreWW {}
    .shop-dStoreW {
        background: #fff;
        margin-bottom: 0.3rem;
        .shop-dStore {
            display: flex;
            align-items: center;
            padding: 0.3rem 0 0.13rem 0;
            .shop-selectN,
            .shop-selectY,
            .shop-dNameImg,
            .shop-dGo {
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-size: 5.8rem 1.86rem;
                display: inline-block;
            }
            .shop-selectN,
            .shop-selectY {
                margin: 0 0.25rem 0 0.32rem;
                width: 0.3rem;
                height: 0.3rem;
                background: #fff;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-size: 5.8rem 1.86rem;
            }
            .shop-selectN {
                background-position: -5.18rem -0.77rem;
            }
            .shop-selectY {
                background-position: -4.75rem -0.77rem;
            }

            .shop-dNameImg {
                width: 0.38rem;
                height: 0.38rem;
                background-position: -3.55rem -0.75rem;
                margin-right: 0.19rem;
            }
            .shop-dName {
                font-size: 0.3rem;
                color: #000000;
                font-weight: bold;
                margin-right: 0.22rem;
            }
            .shop-dGo {
                width: 0.2rem;
                height: 0.24rem;
                background-position: -4.02rem -0.77rem;
            }
        }
        .shop-contentUl {
            li {
                display: flex;
                padding: 0.3rem 0;
                .shop-selectW {
                    align-items: center;
                    display: flex;
                    margin: 0 0.25rem 0 0.32rem;
                    .shop-selectN,
                    .shop-selectY {
                        width: 0.3rem;
                        height: 0.3rem;
                        background: #fff;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-size: 5.8rem 1.86rem;
                    }
                    .shop-selectN {
                        background-position: -5.18rem -0.77rem;
                    }
                    .shop-selectY {
                        background-position: -4.75rem -0.77rem;
                    }
                }
                .shop-selImg {
                    width: 2.1rem;
                    height: 2.1rem;
                    margin-right: 0.25rem;
                    img {
                        width: 100%;
                    }
                }
                .shop-selInfo {
                    .shop-selGoodsT {
                        width: 3.8rem;
                        font-size: 0.3rem;
                        color: #333333;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .shop-selGoodsC {
                        color: #999999;
                        margin: 0.06rem 0 0.3rem 0;
                    }
                    .shop-selGoodsN {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .shop-selGoodsS {
                            color: #333333;
                        }
                        .shop-selGoodsOW {
                            width: 1.68rem;
                            height: 0.48rem;
                            line-height: 0.48rem;
                            border: 1px solid #dfdfdf;
                            input {
                                border: none;
                                padding: 0 0.02rem;
                                height: 100%;
                                width: 100%;
                                margin: 0 auto;
                                text-align: center;
                                display: flex;
                            }

                            .decNum {
                                float: left;
                                background-position: -2.85rem -1.04rem;
                            }
                            .decNoNum {
                                float: left;
                                background-position: -2.05rem -1.04rem;
                            }
                            span:nth-of-type(2) {
                                width: 0.76rem;
                                display: inline-block;
                                text-align: center;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                word-break: break-all;
                                height: 100%;
                            }
                            span:nth-of-type(3) {
                                float: right; // background-position: -2.49rem -1.15rem; 灰色
                                background-position: -3.27rem -1.17rem;
                            }
                            span:nth-of-type(odd) {
                                display: inline-block;
                                height: 100%;
                                width: 0.46rem;
                                text-align: center;
                                background-image: url(/static/images/jl.png);
                                background-repeat: no-repeat;
                                background-size: 5.8rem 1.86rem;
                            }
                        }
                    }
                }
            }
        }
    }

    .shop-dropW {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 1rem;
        background: #30ce84;
        color: #fff; //         
        display: flex;
        align-items: center;
        justify-content: space-around;
        display: none;
        p {
            display: flex;
            align-items: center;
        }
        .shop-horn {
            background-position: -5.33rem -0.18rem;
            margin-right: 0.18rem;
        }
        .shop-dropCon {
            .shop-dropNum {}
        }
        .shop-dClose {
            background-position: -4.25rem -0.7rem;
        }
        .shop-horn,
        .shop-dClose {
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            width: 0.44rem;
            height: 0.38rem;
            display: inline-block;
        }
    }
}

.shop-cartBot {
    display: flex;
    align-items: center;
    height: 1.2rem;
    position: fixed;
    bottom: 49px;
    width: 100%;
    border-top: 1px solid #dfdfdf;
    justify-content: space-between;
    background: #fff;
    .shop-cSelectW {
        margin-left: 0.22rem;
        .shop-selectN,
        .shop-selectY {
            width: 0.3rem;
            height: 0.3rem;
            background: #fff;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            display: block;
            margin: 0 auto;
        }
        .shop-selectN {
            background-position: -5.18rem -0.77rem;
        }
        .shop-selectY {
            background-position: -4.75rem -0.77rem;
        }
        span:nth-of-type(2) {
            font-size: 0.24rem;
            color: #000000;
        }
    }
    .shop-cPN {
        display: flex;
        height: 100%;
        .shop-cPriceW {
            display: flex;
            align-self: center;
            .shop-cPriceInt {
                font-size: 0.36rem;
                color: #000;
            }
            .shop-cPriceFloat {
                font-size: 0.24rem;
                display: flex;
                align-items: flex-end;
                margin-bottom: 0.02rem;
            }
        }
        .shop-cartNumW {

            width: 2.4rem;
            text-align: center;
            height: 100%;
            display: flex;
            align-items: center;
            color: #fff;
            text-align: center;
            margin-left: 0.34rem;
            z-index: 2;
            .shop-carNumI {
                margin: 0 auto;
                .shop-cartNum {}
            }
        }
        .shop-cartNum0 {
            background: #cdcdcd;
        }
        .shop-cartNum1 {
            background: #30ce84;
        }
    }
}

.shopEmpty {
    text-align: center;
    padding: 1rem 0;
    background: #fff;
    font-size: 0.38rem;
}
</style>