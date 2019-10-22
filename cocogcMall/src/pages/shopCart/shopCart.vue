<template>
    <div class="shop">
        <div class="shop-headW">
            <div class="header-wrapper">
              <h3 class="shop-title">购物车</h3>
              <p class="shop-headR" v-if="list.length != 0">
                  <span class="shop-headWrite" @click="deitDelFlag=false" v-if="deitDelFlag">编辑</span>
                  <span class="shop-headWrite" @click="deitDelFlag=true" v-if="!deitDelFlag">完成</span>
              </p>
            </div>
        </div>

        <!-- 收货地址 -->
        <div class="content-wrapper">
          <div class="order-addressWN">
              <div v-if="addressDef != null">
                <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart: $route.path}}">
                    <div class="order-address">
                        <p class="order-addPerson">
                          <span class="default-text">默认</span>
                          <span>{{addressDef.name}}</span>
                          <span>{{addressDef.tel}}</span>
                        </p>
                        <p class="order-addInfo">
                            {{addressDef.area}} {{addressDef.address}}
                        </p>
                        <span class="iconfont icon-right" @click="$router.replace('/addressEdit')"></span>
                    </div>
                </router-link>
              </div>
              <div v-else>
                <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart: $route.path}}">
                    <div class="order-addressN">
                        <img src="/static/images/cart/add-address.png" alt="">
                        <p>您还没有收货地址，点击添加</p>
                        <span class="iconfont icon-right"></span>
                    </div>
                </router-link>
              </div>
          </div>
        </div>
        <!-- 收货地址end -->

        <!-- 购物车列表 -->
          <div class="shop-content" v-if="num && list.length">
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
              <div v-for="(itemList,index) in list" :key="index" class="shop-dStoreWW">
                <div class="vendor-title"><span class="iconBg vendorIcon"></span>{{itemList.vendorId}}<span class="vendorInfo">{{itemList.vendorInfo}}</span></div>
                <div class="shop-dStoreW" v-for="(items,index) in itemList.cartVOList" :key="index">
                    <ul class="shop-contentUl">
                        <li>
                            <span class="shop-selectW">
                                <span @click="selGoods(items)" :class="!items.check?'shop-selectN':'shop-selectY'">
                                </span>
                            </span>
                            <span class="shop-selImg" @click="$router.push('/goodsDetail/'+ items.goods.id)">
                                <img :src="items.goods!=null?items.goods.picUrl:''" alt="" />
                            </span>
                            <div class="shop-selInfo">
                                <p class="shop-selGoodsT">{{items.goods!=null?items.goods.name:''}}</p>
                                <p class="shop-selGoodsC">{{items.goods!=null?items.goods.attrs:''}}</p>
                                <div class="shop-selGoodsN">
                                    <div style="display: flex; align-items: center">
                                        <img :src="logoImg" alt="" class="money-logo">
                                        <span class="shop-selGoodsS" v-if="items.goods">{{items.goods.currentPrice|toDecimal2Fp}}.</span>
                                        <span class="shop-selGoodsS" v-if="items.goods">{{items.goods.currentPrice|toDecimal2Ap}}</span>
                                    </div>
                                    <p class="shop-selGoodsOW">

                                        <span @click="numDecrease(items)" class="decNum">
                                          <img :src="`/static/images/cart/cut${items.num>1 ? '': '-disabled'}.png`" alt=" " class="num-icon">
                                        </span>
                                        <span @click="numberShow(items)" ><input type="number" @input="storeMoney(items)" v-model.number="items.num" readonly="readonly" min="1"/></span>
                                        <span class="add-num" @click="numIncrease(items)">
                                          <img :src="`/static/images/cart/add.png`" alt=" " class="num-icon">
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
              </div>
        </div>

        <div class="shopEmpty" v-if="num && !list.length">
            <!-- <p>购物车加载中~~</p> -->
            <text-loading>购物车加载中</text-loading>
        </div>

        <div class="shopEmpty" v-if="!num">
            <img src="/static/images/home/nothing.png" alt="" class="nothing">
            <button class="btn-list" @click="$router.push('/goodsList')">进店逛逛</button>
        </div>
        <!-- 购物车列表end -->
        <div class="inputNum" v-if="inputNumShow">
            <div class="inputNumInfo">
                <p class="inputNumTitle">修改购买数量</p>
                <div class="inputNumWrite">
                    <span class="decNum" @click="goodsNum>1?goodsNum--:goodsNum">-</span>
                    <span><input type="number" min="1" v-model="goodsNum"/></span>
                    <span @click="goodsNum++">+</span>
                </div>
            </div>
            <div class="inputNumBnt">
                <p @click="inputNumShow = false">取消</p>
                <p @click="comfirmInp()">确定</p>
            </div>
        </div>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <bg-mask v-model="inputNumShow"></bg-mask>
        </transition>

        <!-- 猜你喜欢 -->
        <guess-like></guess-like>

        <div class="logo-wrapper">
          <img src="/static/images/cart/logo.png" alt="">
        </div>

        <div class="shop-cartBot" v-if="list.length">
            <p class="shop-cSelectW">
                <span @click="selectAll()" :class="!selectAllFlag?'shop-selectN':'shop-selectY'"></span>
                <span>全选</span>
            </p>
            <div class="shop-cPN" v-if="deitDelFlag">
                <p class="shop-cPriceW">
                    <span>合计：</span>
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
                <p class="shop-cartNumW" :class="selectAllGoods>0?'shop-cartNum2':'shop-cartNum0'">
                    <span class="shop-carNumI" @click="delGoods">
                        删除(<span class="shop-cartNum">{{selectAllGoods}}</span>)
                    </span>
                </p>
            </div>
        </div>

    </div>
</template>
<script>
import TextLoading from '@/common/loading/TextLoading'
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
            goodsNumId: 0,
            addressDef: undefined,
            logoImg: LOGO_PACKAGE_URL + 'logo.png'
        };
    },
    computed: {
      ...mapGetters({
        getScrollCart: 'scrollto/getScrollCart',
        num: 'cart/getNum'
      }),
        countNum() {
            let num = 0
            if (this.list) {
                let buys = []
                let total = this.list.reduce((state, data) => {
                  data.cartVOList.forEach((res,indexR)=>{
                    if(res.check){
                      buys.push({ goodsId: res.goodsId, nums: res.num })
                      state.num = Number(res.num) + Number(state.num)
                      num++
                    }
                    if(num === res.length){
                      this.selectAllFlag = true
                    }
                  })
                  return state
                }, { num: 0 })
                this.axios(testUrl + api.updateCart, { token: getToken(), buys: buys }, 'post');
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
            this.Indicator.open({
              spinnerType: 'double-bounce'
            });
            this.axios(testUrl + api.selectCarts, {
                token: getToken(),
                addressId: this.addressDef ? this.addressDef.id : undefined
            }, 'post')
                .then((data) => {
                    this.Indicator.close()
                    if (data.error_code == 0) {
                      if (!data.data) {
                        callback(data.data);
                      } else {
                        let num = 0
                        data.data.forEach((items,indexD)=>{
                          items.cartVOList.forEach((res,indexR)=>{
                            num += res.num
                          })
                          if(items.vendorId=='网易严选'){
                             data.data[indexD].vendorInfo='（88包邮）';
                          }else if(items.vendorId=='椰云直营'){
                            data.data[indexD].vendorInfo='（一件包邮）';
                          }else{
                            data.data[indexD].vendorInfo='';
                          }
                        })
                        this.setNum(num)
                      }
                        if (callback)
                            callback(data.data);
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
                    this.list.forEach((data,indexD)=>{
                      data.cartVOList.forEach((res,indexR)=>{
                        if(this.list[indexD].cartVOList[indexR].check){
                          ids.push(res.id);
                        }
                      })
                    })
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
        async settleGoods() {
            var that = this;
            var buys = [];
            this.list.forEach((data,indexD)=>{
              data.cartVOList.forEach((res,indexR)=>{
                for (let i in res) {
                  if (res.check) {
                    // if(res.goods.stocks<res.num){
                    //   return this.Toast(`${res.goods.name}库存不足`)
                    // }
                    var buy = {};
                    buy.goodsId = res.goodsId;
                    buy.nums = res.num;
                    buys.push(buy);
                  }
                }
              })
            })

            if (that.selectAllGoods == 0) return false;
            if (buys.length <= 0) {
                return false;
            }
            if (!window.chooseAddress) {
              window.chooseAddress = await this.$store.dispatch('userinfo/checkAddress')
              if (!window.chooseAddress) {
                return this.Toast('请选择配送地址!');
              }
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
        //算价格
        computeTotal() {
          this.selectAllPrice =0;
          this.selectAllGoods = 0;
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
              if(this.list[indexD].cartVOList[indexR].check && this.list[indexD].cartVOList[indexR].goods!= null){
                 this.selectAllPrice += this.list[indexD].cartVOList[indexR].num*this.list[indexD].cartVOList[indexR].goods.currentPrice;
                 this.selectAllGoods++;
              }
            })
          })
        },
        // 数量减小
        numDecrease(item) {
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
              for (let i in res) {
                if (res[i] == item.id) {
                  if (this.list[indexD].cartVOList[indexR].num> 1) {
                    this.list[indexD].cartVOList[indexR].num--
                    this.list[indexD].cartVOList[indexR].check=true;
                    this.decrementNum();
                    this.computeTotal();
                  }
                }
              }
            })
          })
        },
        //增加
        numIncrease(item) {
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
              for (let i in res) {
                if (res[i] == item.id) {
                  this.list[indexD].cartVOList[indexR].check=true;
                  if (this.list[indexD].cartVOList[indexR].goods != null && this.list[indexD].cartVOList[indexR].num < this.list[indexD].cartVOList[indexR].goods.stocks) {
                    this.list[indexD].cartVOList[indexR].num++;
                    this.incrementNum();
                    this.computeTotal();
                  }
                }
              }
            })
          })
        },
        //输入的数量
        async storeMoney(item) {
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
              for (let i in res) {
                if (res[i] == item.id) {
                  this.list[indexD].cartVOList[indexR].num = item.num;
                  this.computeTotal();
                }
              }
            })
          })
        },
        //单个商品选中
        selGoods(item) {
          let checkFlag = true;
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
               for (let i in res) {
                 if (res[i] == item.id) {
                  this.list[indexD].cartVOList[indexR].check = !this.list[indexD].cartVOList[indexR].check;
                 }
               }
               checkFlag = this.list[indexD].cartVOList[indexR].check && checkFlag;
               if(!checkFlag){
                  this.selectAllFlag = false;
               }else{
                  this.selectAllFlag = true;
               }
            })
          })
          this.computeTotal();
        },
        //全选
        selectAll() {
          this.selectAllFlag = !this.selectAllFlag;
          this.list.forEach((data,indexD)=>{
            data.cartVOList.forEach((res,indexR)=>{
              if(this.selectAllFlag){
                if(!this.list[indexD].cartVOList[indexR].check){
                  this.list[indexD].cartVOList[indexR].check=true;
                  this.selectAllPrice += this.list[indexD].cartVOList[indexR].num * this.list[indexD].cartVOList[indexR].goods.currentPrice;
                }
              }else{
                this.list[indexD].cartVOList[indexR].check=false;
              }
            })
          })
          this.computeTotal()
        },
        numberShow(item) {
            this.inputNumShow = true;
            this.goodsNum = item.num;
            this.goodsNumId = item.id;
        },
        comfirmInp() {
            this.inputNumShow = false;
            if(this.goodsNum <= 0){
                this.Toast('宝贝不能再少了~~');
                return false;
            }
            let num =0;
            this.list.forEach((data,indexD)=>{
              data.cartVOList.forEach((res,indexR)=>{
               for(let i in res){
                  if(res[i] == this.goodsNumId){
                    this.list[indexD].cartVOList[indexR].num=parseInt(this.goodsNum);
                    this.list[indexD].cartVOList[indexR].check = true;
                  }
                }
                num += this.list[indexD].cartVOList[indexR].num;
                this.setNum(num);
              })
            })
            this.computeTotal();
        },
    },
    components: {
        "guess-like": Guesslike,
        BgMask,
        TextLoading
    }
};
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
.shop {
    padding-bottom: calc(50px + 40px) !important;
    background:rgba(243,244,246,1);
}
.order-bottom {
    height: 0.1rem;
    background-image: url(/static/images/bgRepeat.jpg);
    background-repeat: repeat-x;
    margin-left: -0.1rem;
    margin-bottom: 10px;
}
.logo-wrapper{
  img{
    width: px2rem(116);
    height: px2rem(25);
    margin: px2rem(20) auto px2rem(20);
  }
}

.shop-headW {
  width: 100%;
  height: 92px;
  background:rgba(48,206,132,1);
  position: relative;
  z-index: 2;
  color: #fff;
  overflow: hidden;
  .header-wrapper{
    position: absolute;
    left: 0;
    top: px2rem(18);
    width: 100%;
    text-align: center;
    .shop-title{
      font-size:17px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .shop-headR{
      position: absolute;
      right: px2rem(16);
      top: 0;
      .shop-headWrite{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
}

.content-wrapper{
  background: #fff;
  .order-addressWN{
    position: relative;
    z-index: 3;
    margin: -36px px2rem(15) 0;
    padding: px2rem(19) px2rem(15);
    box-sizing: border-box;
    background: #fff;
    box-shadow:0px 9px 18px 0px rgba(123,123,123,0.16);
    border-radius:10px;
    &::after{
      content: '';
      background-image: url(/static/images/cart/line.png);
      background-size: cover;
      background-repeat: repeat-x;
      display: block;
      width: 100%;
      height: px2rem(3);
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 10px;
    }
    .order-addressW{
      padding: 0;
      .order-address{
        width: 100%;
        position: relative;
        .order-addPerson{
          display: flex;
          align-items: center;
          span{
            font-size: 15px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(51,51,51,1);
            margin-left: 10px;
          }
          .default-text{
            margin-left: 0;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255,255,255,1);
            padding: px2rem(2) px2rem(5);
            box-sizing: border-box;
            background: #30CE84;
            border-radius: 10px;
          }
        }
        .order-addInfo{
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:300;
          color:rgba(102,102,102,1);
          margin-top: px2rem(10);
          padding-right: px2rem(10);
          box-sizing: border-box;
        }
        .icon-right{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color:rgba(102,102,102,1);
        }
      }
      .order-addressN{
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        img{
          width: px2rem(22);
          height: px2rem(22);
        }
        p {
          margin-left: px2rem(6);
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .icon-right{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color:rgba(102,102,102,1);
        }
      }
    }
  }
}
.shop-content {
    position: relative;
    background: #fff;
    box-shadow:0px 0.36rem 0.7rem 0px rgba(123,123,123,0.09);
    .shop-dStoreWW {
      position: relative;
      border-bottom: 0.3rem solid #F2F3F5;
      padding:0 0.3rem;
      // margin-bottom: 0.3rem;
      &:last-of-type{
        border-bottom:0;
      }
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
        .vendor-title{
          font-size: 0.3rem;
          color: #000000;
          font-weight: Bold;
          display: flex;
          align-items: center;
          padding-top: 0.4rem;
          .vendorIcon{
            background-image: url('/static/images/cart/supermarket.png');
            width: 0.34rem;
            height: 0.32rem;
            margin-right: 0.26rem;
          }
          .vendorInfo{
            font-weight: normal;
            color: #E5AA61;
            margin-left: 0.1rem;
          }
        }

    }
    .shop-dStoreW {
        background: #fff;
        border-bottom: 1px solid #eef1f6;
        .shop-dStore {
            display: flex;
            align-items: center;
            padding: 0.3rem 0 0.13rem 0;
            .shop-dNameImg,
            .shop-dGo {
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-size: 5.8rem 1.86rem;
                display: inline-block;
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
                align-items: center;
                .shop-selectW {
                    align-items: center;
                    display: flex;
                    margin: 0 0.25rem 0 0;
                    .shop-selectN {
                      width: 20px;
                      height: 20px;
                      border: 1px solid #dedede;
                      border-radius: 50%;
                      display: block;
                      margin: auto;
                      box-sizing: border-box;
                    }
                    .shop-selectY {
                      background-image: url('/static/images/cart/checked.png');
                      background-repeat: no-repeat;
                      background-size: 100% 100%;
                      width: 20px;
                      height: 20px;
                      display: block;
                      margin: auto;
                      box-sizing: border-box;
                    }
                }
                .shop-selImg {
                    width: 2.1rem;
                    height: 2rem;
                    line-height: 2rem;
                    margin-right: 0.25rem;
                    img {
                        width: 100%;
                    }
                }
                .shop-selInfo {
                    flex: 1;
                    .shop-selGoodsT {
                        width: 3.8rem;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        font-size:15px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                    .shop-selGoodsC {
                        color: #999999;
                        margin: 0.06rem 0 0.3rem 0;
                    }
                    .shop-selGoodsN {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .money-logo{
                          width: 16px;
                          height: 16px;
                          margin-right: 5px;
                        }
                        .shop-selGoodsS {
                            color: #333333;
                        }

                        .shop-selGoodsOW {
                            width: 1.68rem;
                            height: 0.48rem;
                            // line-height: 0.48rem;
                            margin-right: 0.22rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            z-index: 2;
                            &::after{
                              content: ' ';
                              width: 200%;
                              height:200%;
                              position: absolute;
                              left: 0;
                              top: 0;
                              transform: scale(.5);
                              transform-origin: top left;
                              z-index: 1;
                              border: 1px solid #DFDFDF;
                              pointer-events: none;
                            }
                            input {
                                border: none;
                                padding: 0 0.02rem;
                                height: 100%;
                                width: 100%;
                                margin: 0 auto;
                                text-align: center;
                                display: flex;
                                align-self: center;
                                box-sizing: border-box;
                            }
                            span:nth-of-type(2) {
                                flex: 1;
                                width: 0.46rem;
                                display: inline-block;
                                text-align: center;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                word-break: break-all;
                                height: 100%;
                                position: relative;
                                z-index: 2;
                                &::after{
                                  content: ' ';
                                  width: 200%;
                                  height:200%;
                                  position: absolute;
                                  left: 0;
                                  top: 0;
                                  transform: scale(.5);
                                  transform-origin: top left;
                                  z-index: 1;
                                  border-left: 1px solid #DFDFDF;
                                  border-top: 1px solid #dedede;
                                  pointer-events: none;
                                }
                            }
                            span:nth-of-type(3) {
                              &::after{
                                border-left: 1px solid #DFDFDF;
                                pointer-events: none;
                              }
                            }
                            span:nth-of-type(odd) {
                              height: 100%;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              z-index: 2;
                              flex: 1;
                              position: relative;
                              &::after{
                                content: ' ';
                                width: 200%;
                                height:200%;
                                position: absolute;
                                left: 0;
                                top: 0;
                                transform: scale(.5);
                                transform-origin: top left;
                                z-index: 1;
                                pointer-events: none;
                              }
                              .num-icon{
                                width: px2rem(13);
                                height: px2rem(13);
                              }
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
    height: px2rem(47);;
    position: fixed;
    bottom: 48px;
    width: 100%;
    max-width: 450px;
    border-top: 1px solid #dfdfdf;
    justify-content: space-between;
    background: #fff;
    z-index: 3;
    .shop-cSelectW {
        margin-left: 0.22rem;
        .shop-selectN {
          width: 20px;
          height: 20px;
          border: 1px solid #dedede;
          border-radius: 50%;
          display: block;
          margin: auto;
          box-sizing: border-box;
        }
        .shop-selectY {
          background-image: url('/static/images/cart/checked.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 20px;
          height: 20px;
          display: block;
          margin: auto;
          box-sizing: border-box;
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
            align-items: center;
            color: #fb5c5c;
            span{
                &:nth-of-type(1) {
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    display: inline-block;
                }
            }
            .shop-cPriceInt {
                font-size: 0.36rem;
            }
            .shop-cPriceFloat {
              margin-top: px2rem(5);
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
              font-size: px2rem(14);
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
        .shop-cartNum2{
          background:rgba(251,92,92,1);
        }
    }
}

.shopEmpty {
  text-align: center;
  padding: px2rem(20) 0;
  background: #fff;
  font-size: 0.38rem;
  margin-bottom: px2rem(15);
  box-shadow:0px 9px 18px 0px rgba(123,123,123,0.09);
  .nothing{
    width: px2rem(138);
    height: px2rem(131);
    margin: auto;
  }
  .btn-list{
    display: block;
    width: px2rem(110);
    height: px2rem(33);
    background:rgba(48,206,132,1);
    border-radius:4px;
    font-size: px2rem(14);
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    border: none;
    margin: px2rem(16) auto 0;
  }
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
