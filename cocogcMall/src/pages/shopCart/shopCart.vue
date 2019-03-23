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
                    <ul class="shop-contentUl">
                        <li>
                            <span class="shop-selectW">
                                <span @click="selGoods(index,0,$event)" :class="!items.check?'shop-selectN':'shop-selectY'">
                                </span>
                            </span>
                            <span class="shop-selImg" @click="$router.push('/goodsDetail/'+ items.goods.id)">
                                <img :src="items.goods!=null?items.goods.picUrl:''" alt="" />
                            </span>
                            <div class="shop-selInfo">
                                <p class="shop-selGoodsT">{{items.goods!=null?items.goods.name:''}}</p>
                                <p class="shop-selGoodsC">{{items.goods!=null?items.goods.attrs:''}}</p>
                                <div class="shop-selGoodsN">
                                    <span class="shop-selGoodsS">{{items.goods!=null?items.goods.currentPrice:''}}</span>
                                    <p class="shop-selGoodsOW">
                                        <!-- <span @click="goodsItem.count>0?goodsItem.count :goodsItem.count" :class="goodsItem.count>0?'decNum':'decNoNum'"></span> -->
                                        <span @click="numDecrease(index) " :class="items.num>1?'decNum':'decNoNum'"></span>
                                        <span><input type="number" @input="storeMoney(items.num,index)" v-model.number="items.num" readonly="readonly" min="1" /></span>
                                        <!-- 是否需要有货和没货？+号颜色是否要变 -->
                                        <span @click="numIncrease(index)"></span>
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
            <!-- <p>再忙也记得买点什么犒赏自己</p> -->
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
                        <span class="shop-cartNum">{{countNum}}</span>)
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


    </div>
</template>
<script>
import Guesslike from "../../common/guesslike.vue";
import api from '../../service/api';
import { IsEmpty, getToken } from "@/util/common";
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            list: [],
            selTypeAllFlag: false,
            selGoodsFlag: false,
            selectAllFlag: false,
            selectAllPrice: 0,
            selectAllGoods: 0,
            deitDelFlag: true,

        };
    },
    computed: {
      countNum() {
        let num = 0
        if (this.list) {
          let buys = []
          let total = this.list.reduce((state, item) =>{
            buys.push({goodsId: item.goodsId, nums: item.num})
            if (item.check) {
              state.num = item.num + state.num
              num ++
            }
            return state
          },{num: 0})
          if (num === this.list.length) {
            this.selectAllFlag = true
          }
          this.axios(testUrl + api.updateCart, {token: getToken(),buys: buys}, 'post')
          return total.num
        } else {
          return 0
        }
      }
    },
    mounted() {
        var that = this;
        this.getCartGoodsList(function(data) {
            if (data == null) {
                that.list = [];
            } else {
                that.list = data;
            }
            that.computeTotal();
        });

    },
    methods: {
        ...mapActions({
            setNum: 'cart/setNum'
        }),
        getCartGoodsList(callback) {
            let _this = this;
            this.axios(testUrl + api.selectCarts, {
                token: getToken()
            },
                'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        if (callback)
                            callback(data.data);
                        //传给猜你喜欢
                        let cartShop = [];
                        data.data.forEach((res) => {
                            cartShop.push(res.goods.name)
                        })
                        localStorage.setItem('cartShop', JSON.stringify(cartShop));
                    } else {
                        _this.Toast(data.message)
                    }
                })
                .catch((err) => {
                    // _this.Toast(err.message)
                })
        },
        // 删除
        delGoods() {
            var that = this;
            var ids = [];
            that.list.forEach((res) => {
                if (res.check == true) {
                    ids.push(res.id);
                }
            });
            if (ids.length > 0) {
                that.axios(testUrl + api.removeCarts,
                    {
                        token: getToken(),
                        id: ids.join(",")
                    },
                    'post')
                    .then((data) => {
                        if (data.error_code == 0) {
                            that.getCartGoodsList(function(data) {
                                if (data == null) {
                                    that.list = [];
                                    that.setNum(0)
                                } else {
                                    that.list = data;
                                }
                                that.deitDelFlag = false;
                                that.selectAllPrice = 0;
                                that.selectAllGoods = 0;
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        //结算
        settleGoods() {
            var that = this;
            var buys = [];
            if (!JSON.parse(localStorage.isRealCert)) {
                this.Toast({
                    message: '请先实名认证',
                    duration: 1000
                })
                setTimeout(() => {
                  this.$router.push(infoURl+ '#!/cert?token=f7512935295b36d9b469e672c531d4c8')
                }, 1000)
                return
            }
            that.list.forEach(function(v) {
                if (v.check) {
                    var buy = {};
                    buy.goodsId = v.goodsId;
                    buy.nums = v.num;
                    buys.push(buy);
                }
            });
            if (that.selectAllGoods == 0) return false;
            if (buys.length <= 0) {
                that.Toast("请选择结算商品！");
                return false;
            }
            that.axios(testUrl + api.updateCart,
                {
                    token: getToken(),
                    buys: buys
                },
                'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        sessionStorage.setItem('buys', JSON.stringify(buys));
                        that.$router.push({
                            path: '/order',
                            query: {
                                cart: 'cart'
                            }
                        });

                    }
                });

        },
        //编辑
        deitDel() {
            this.deitDelFlag = false;

        },
        deitDelOk() {
            this.deitDelFlag = true;

        },
        computeTotal() {
            var that = this;
            this.selectAllPrice = 0;
            this.selectAllGoods = 0;
            this.list.forEach((res) => {
                if (res.check == true && res.goods != null) {
                    that.selectAllPrice += res.num * res.goods.currentPrice;
                    that.selectAllGoods++;
                }
            });
        },
        // 数量减小
        numDecrease(index) {
            if (this.list[index].num > 1) {
                this.list[index].num--;
                this.computeTotal();
            }
        },
        //增加
        numIncrease(index) {
            if (this.list[index].goods != null && this.list[index].num < this.list[index].goods.stocks) {
                this.list[index].num++;
                this.computeTotal();
            }
        },
        //输入的数量
        async storeMoney(e, index) {
            this.list[index].num = e;
            this.computeTotal();
        },
        //单个商品选中
        selGoods(index, goodsIndex) {
            var List = this.list;
            List[index].check = !List[index].check;
            //判断是否全选
            this.IsQuanXuan();
            this.computeTotal();
        },
        //全选
        selectAll() {
            this.selectAllFlag = !this.selectAllFlag;
            this.selectAllPrice = 0;
            this.selectAllGoods = 0;
            this.list.forEach((res) => {
                res.AllFlag = this.selectAllFlag;
                res.check = this.selectAllFlag;
                if (res.AllFlag == true) {
                    this.selectAllPrice += res.num * res.goods.currentPrice;
                    this.selectAllGoods++
                }
            });
        },
        //某个商品不选，全选不选
        IsQuanXuan(index) {
            let Notselected = true;
            this.list.forEach((res) => {
                if (!res.check) {
                    Notselected = false
                }
            });
            this.selectAllFlag = Notselected;
        },
    },
    components: {
        "guess-like": Guesslike
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
    bottom: 48px;
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
            color: #fb5c5c;
            .shop-cPriceInt {
                font-size: 0.36rem;
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
