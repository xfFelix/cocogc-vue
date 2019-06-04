<template>
    <div class="shop">
        <div class="shop-headW">
            <h3 class="shop-title">购物车</h3>
            <p class="shop-headR" v-if="list.length != 0">
                <span class="shop-headWrite" @click="deitDel" v-if="deitDelFlag">编辑</span>
                <span class="shop-headWrite" @click="deitDelOk" v-if="!deitDelFlag">完成</span>
            </p>
        </div>

        <div class="order-addressWN">
          <div v-if="addressDef != null">
            <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart: $route.path}}">
                <div class="order-address">
                    <p class="order-addPerson">
                        <span>{{addressDef.name}}</span>
                        <span>{{addressDef.tel}}</span>
                    </p>
                    <p class="order-addInfo">
                        {{addressDef.area}} {{addressDef.address}}
                    </p>
                </div>
                <div>
                    <span class="goTo" @click="$router.replace('/addressEdit')"></span>
                </div>
            </router-link>
          </div>
          <div v-else>
            <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart: $route.path}}">
              <div class="order-addressN" style="display: block;">
                    <span class="order-addNImg"></span>
                    <p>您还没有收货地址，点击添加</p>
              </div>
            </router-link>
          </div>
          <div class="order-bottom"></div>
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
                                <span @click="selGoods(index,0,$event, items)" :class="!items.check?'shop-selectN':'shop-selectY'">
                                </span>
                            </span>
                            <span class="shop-selImg" @click="$router.push('/goodsDetail/'+ items.goods.id)">
                                <img :src="items.goods!=null?items.goods.picUrl:''" alt="" />
                            </span>
                            <div class="shop-selInfo">
                                <p class="shop-selGoodsT">{{items.goods!=null?items.goods.name:''}}</p>
                                <p class="shop-selGoodsC">{{items.goods!=null?items.goods.attrs:''}}</p>
                                <div class="shop-selGoodsN">
                                    <div>
                                        <span class="shop-selGoodsS">{{items.goods.currentPrice|toDecimal2Fp}}.</span>
                                        <span class="shop-selGoodsS">{{items.goods.currentPrice|toDecimal2Ap}}</span>
                                    </div>
                                    <p class="shop-selGoodsOW">
                                        <!-- <span @click="goodsItem.count>0?goodsItem.count :goodsItem.count" :class="goodsItem.count>0?'decNum':'decNoNum'"></span> -->
                                        <span @click="numDecrease(index) " :class="items.num>1?'decNum':'decNoNum'"></span>
                                        <span><input type="number" @input="storeMoney(items.num,index)" v-model.number="items.num" readonly="readonly" min="1" @click="numberShow(items.num,index)" /></span>
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

        <div class="inputNum" v-if="inputNumShow">
            <div class="inputNumInfo">
                <p class="inputNumTitle">修改购买数量</p>
                <div class="inputNumWrite">
                    <span class="decNum" @click="numDec">-</span>
                    <span><input type="number" min="1" v-model="goodsNum"/></span>
                    <span @click="numInc">+</span>
                </div>
            </div>
            <div class="inputNumBnt">
                <p @click="cancelInp">取消</p>
                <p @click="comfirmInp()">确定</p>
            </div>
        </div>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <bg-mask v-model="inputNumShow"></bg-mask>
        </transition>

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
                        去结算(<span class="shop-cartNum">{{countNum}}</span>)
                    </span>
                </p>
            </div>

            <div class="shop-cPN" v-if="!deitDelFlag">
                <p class="shop-cartNumW" :class="selectAllGoods>0?'shop-cartNum1':'shop-cartNum0'">
                    <span class="shop-carNumI" @click="delGoods">
                        删除(<span class="shop-cartNum">{{selectAllGoods}}</span>)
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
import { mapActions, mapGetters } from 'vuex';
import BgMask from "@/common/BgMask"

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
            inputNumShow: false,
            goodsNum: 1,
            goodsNumIndex: 0,
            addressDef: undefined
        };
    },
    computed: {
      ...mapGetters({
        getScrollCart: 'scrollto/getScrollCart'
      }),
        countNum() {
            let num = 0
            console.log('111')
            if (this.list) {
                let buys = []
                let total = this.list.reduce((state, item) => {
                    if (item.check) {
                        buys.push({ goodsId: item.goodsId, nums: item.num })
                        state.num = Number(item.num) + Number(state.num)
                        num++
                    }
                    return state
                }, { num: 0 })
                if (num === this.list.length) {
                    this.selectAllFlag = true
                }
                this.axios(testUrl + api.updateCart, { token: getToken(), buys: buys }, 'post')
                return total.num
            } else {
                return 0
            }
        },
    },
    async mounted() {
        await this.resetAddress()
        var that = this;
        this.getCartGoodsList(function(data) {
            if (data == null) {
                that.list = [];
                that.setNum(0)
            } else {
                that.list = data;
            }
            that.computeTotal();
        });

    },
    beforeRouteEnter(to, from, next) {
      if(from.path.includes('goodsDetail')){
        next(vm => {
          vm.getCartGoodsList((data) =>{
              if (data == null) {
                  vm.list = [];
                  vm.setNum(0)
              } else {
                  vm.list = data;
              }
              vm.computeTotal();
          });
        })
      }else if (!from.path.includes('address')) {
        next(vm => {
          vm.resetAddress()
        })
      } else {
        next()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.setScrollCart(document.body.scrollTop || document.documentElement.scrollTop)
      next()
    },
    activated () {
      this.addressDef = window.chooseAddress
      window.scrollTo(0, this.getScrollCart)
    },
    methods: {
        ...mapActions({
            setNum: 'cart/setNum',
            incrementNum: 'cart/incrementNum',
            decrementNum: 'cart/decrementNum',
            checkAddress: 'userinfo/checkAddress',
            setScrollCart: 'scrollto/setScrollCart'
        }),
        async resetAddress() {
            let data = await this.checkAddress()
            window.chooseAddress = this.addressDef = data
        },
        getCartGoodsList(callback) {
            let _this = this;
            this.axios(testUrl + api.selectCarts, {
                token: getToken(),
                addressId: this.addressDef ? this.addressDef.id : undefined
            },
                'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      let num = 0
                      data.data.forEach((v, i) => {
                        num += v.num
                      })
                      this.setNum(num)
                        if (callback)
                            callback(data.data);
                        //传给猜你喜欢
                        let cartShop = [];
                        let ids = [];
                        data.data.forEach((res) => {
                            cartShop.push(res.goods.name);
                            ids.push(res.goods.id);
                        })
                        window.userLikeName = cartShop;
                        window.userLikeId = ids;
                        //localStorage.setItem('cartShop', JSON.stringify(cartShop));
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
            this.MessageBox.confirm('是否删除？').then(
                confirm => {
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
                cancel => {
                    return console.log('cancel')
                }
            )

        },
        //结算
        settleGoods() {
            var that = this;
            var buys = [];
            // if (this.$store.state.userinfo.userinfo.isRealCert == 0) {
            //     this.Toast({
            //         message: '请先实名认证',
            //         duration: 1000
            //     })
            //     setTimeout(() => {
            //         window.location.href = infoURl + '#!/cert?token=' + getToken();
            //     }, 1000)
            //     return
            // }
            that.list.forEach(function(v) {
                if (v.check) {
                  if (!v.goods.stocks)  {
                    return that.Toast(`${v.goods.name}库存不足`)
                  }
                    var buy = {};
                    buy.goodsId = v.goodsId;
                    buy.nums = v.num;
                    buys.push(buy);
                }
            });
            if (that.selectAllGoods == 0) return false;
            if (buys.length <= 0) {
                return false;
            }
            this.Indicator.open({
              spinnerType: 'triple-bounce'
            });
            that.axios(testUrl + api.updateCart,
                {
                    token: getToken(),
                    buys: buys
                },
                'post')
                .then((data) => {
                    this.Indicator.close()
                    if (data.error_code == 0) {
                        //sessionStorage.setItem('buys', JSON.stringify(buys));
                        window.buys = buys;
                        that.$router.push({
                            path: '/order'
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
                this.list[index].check = true
                this.list[index].num--;
                this.decrementNum()
                this.computeTotal();
            }
        },
        //增加
        numIncrease(index) {
            this.list[index].check = true
            if (this.list[index].goods != null && this.list[index].num < this.list[index].goods.stocks) {
                this.list[index].num++;
                this.incrementNum();
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
        cancelInp() {
            this.inputNumShow = false;
        },
        numberShow(itemNum, index) {
            this.inputNumShow = true;
            this.goodsNum = itemNum;
            this.goodsNumIndex = index
        },
        comfirmInp() {
            this.inputNumShow = false;
            if(this.goodsNum <= 0){
                this.Toast('宝贝不能再少了~~');
                return false;
            }
            this.list[this.goodsNumIndex].num = parseInt(this.goodsNum);
            this.list[this.goodsNumIndex].check = true
        },
        numDec() {
            if (this.goodsNum > 1) {
                this.goodsNum--
            }
        },
        numInc() {
            this.goodsNum++
        },
    },
    components: {
        "guess-like": Guesslike,
        BgMask
    }
};
</script>

<style lang="less">
.shop {
    padding-bottom: calc(50px + 40px) !important;
}
.order-bottom {
    height: 0.1rem;
    background-image: url(/static/images/bgRepeat.jpg);
    background-repeat: repeat-x;
    margin-left: -0.1rem;
    margin-bottom: 10px;
}

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
    .shop-dStoreWW {
      position: relative;
        margin-bottom: 0.3rem;
        .z-mask{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          background: rgba(238, 241, 256, 0.6);
          color: #ccc;
          text-align: center;
          padding-top: 100px;
        }
    }
    .shop-dStoreW {
        background: #fff;
        border-bottom: 1px solid #eef1f6;
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
                width: 0.32rem;
                height: 0.3rem;
                background: #fff;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-size: 5.8rem 1.86rem;
            }
            .shop-selectN {
                background-position: -5.17rem -0.77rem;
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
                    flex: 1;
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
                            margin-right: 0.22rem;
                            input {
                                border: none;
                                padding: 0 0.02rem;
                                height: 100%;
                                width: 100%;
                                margin: 0 auto;
                                text-align: center;
                                display: flex;
                                align-self: center;
                            }
                            .decNum {
                                float: left;
                                background-position: -2.88rem -1.04rem;
                            }
                            .decNoNum {
                                float: left;
                                background-position: -2.08rem -1.04rem;
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
                                background-position: -3.32rem -1.17rem;
                            }
                            span:nth-of-type(odd) {
                                display: inline-block;
                                height: 100%;
                                width: 0.42rem;
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
    max-width: 450px;
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
            background-position: -5.17rem -0.77rem;
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


.inputNum {
    width: 85%;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    text-align: center;
    font-size: 0.32rem;
    position: fixed;
    top: 3rem;
    left: 0;
    right: 0;
    z-index: 101;
    .inputNumInfo {
        .inputNumTitle {
            line-height: 1.2rem;
            color: #333;
        }
        .inputNumWrite {
            line-height: 0.8rem;
            border: 1px solid #dfdfdf;
            width: 50%;
            margin: 0 auto 0.4rem auto;
            display: flex;
            span:nth-of-type(2) {
                border-right: 1px solid #DFDFDF;
                border-left: 1px solid #DFDFDF;
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            span {
                text-align: center;
                width: 25%;
                display: inline-block;
                font-size: 26px;
                font-weight: bold;
                input {
                    text-align: center;
                    width: 100%;
                    height: 98%;
                    font-size: 16px;
                }
            }
        }
    }
    .inputNumBnt {
        display: flex;
        justify-content: space-around;
        height: 0.9rem;
        line-height: 0.8rem;
        border-top: 1px solid #DFDFDF;
        p {
            width: 50%;
        }
        p:first-of-type {
            color: #333;
            border-right: 1px solid #DFDFDF;
        }
        p:last-of-type {
            color: #fff;
            background: #32CE84;
            border-radius: 0 0 10px 0;
        }
    }
}
</style>
<style lang="less" scoped>
.order-addressWN {
    margin-top: 0.2rem;
    .order-addressN {
        display: none;
        text-align: center;
        background: #fff;
        padding: 0.7rem 0 0.78rem 0;
        margin: 0 auto;
        .order-addNImg {
            width: 0.4rem;
            height: 0.4rem;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            background-position: -0.85rem -0.76rem;
            display: inline-block;
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
</style>
