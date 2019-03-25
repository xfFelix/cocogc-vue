<template>
    <div class="order">
        <header-top></header-top>

        <!-- 地址 -->
        <div>
            <div class="order-addressWN" addressMag>
                <div v-if="addressDef != null">
                  <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart:this.$route.query.cart}}">
                      <div class="order-address">
                          <p class="order-addPerson">
                              <span></span>
                              <span>{{addressDef.name}}</span>
                              <span>{{addressDef.tel}}</span>
                          </p>
                          <p class="order-addInfo">
                              {{addressDef.area}} {{addressDef.address}}
                          </p>
                      </div>
                      <div>
                          <span class="goTo" @click="$router.push('/addressEdit')"></span>
                      </div>
                  </router-link>
                </div>
                <div v-else>
                  <router-link class="order-addressW" :to="{path:'/addressMag',query:{cart:this.$route.query.cart}}">
                    <div class="order-addressN" style="display: block;">
                          <span class="order-addNImg"></span>
                          <p>您还没有收货地址，点击添加</p>
                    </div>
                  </router-link>
                </div>
                <div class="order-bottom"></div>
            </div>

            <div v-for="(dataItem,dataIndex) in dataList" :key="dataIndex" class="product-container">

                <!-- 多种商品 -->
                <div v-if="dataItem.goodsList.length>1" class="order-goodsMW">
                    <div class="order-goodS">
                        <span class="shop-dNameImg"></span>
                        <span>{{dataItem.vendorId}}</span>
                        <p>
                            (共
                            <span>{{dataItem.goodsList.length}}</span>件)
                        </p>
                    </div>

                    <div class="order-swipeW" :class="'res'+dataItem.goodsList[0].goodsId">
                        <div class="order-swipe">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(itemGoods,indexGoods) in dataItem.goodsList" :key="indexGoods">
                                        <div class="order-goodsList">
                                            <img :src="itemGoods.picUrl" alt="" />
                                            <!-- <img src="static/images/goos_01.png" alt="" /> -->
                                            <!-- {{itemGoods.goodsName}} -->
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
                        <span>{{dataItem.shippingFee}}</span>
                    </p>
                    <p class="order-priceAll">
                        <span>小计</span>
                        <span style="color:#000;">{{dataItem.totalMoney}}</span>
                    </p>
                </div>

                <!-- 单种商品 -->
                <div class="order-goodSW" v-else>
                    <div class="order-goodS">
                        <span class="shop-dNameImg"></span>
                        <span>{{dataItem.vendorId}}</span>
                        <p>
                            (共<span>1</span>件)
                        </p>
                    </div>

                    <div class="order-goodSInfo one-bottom-px" v-for="(itemGoods,indexGoods) in dataItem.goodsList" :key="indexGoods">
                        <div class="order-goodSIImg">
                            <img :src="itemGoods.picUrl" alt="" />
                        </div>
                        <div class="order-goodsDetail">
                            <p class="order-goodsDName">{{itemGoods.goodsName}}</p>
                            <p class="order-goodsDType">类型没有</p>
                            <div class="order-goodsDPriceW">
                                <span class="order-goodsDPrice">{{itemGoods.buyPrice}}</span>
                                <p class="order-goodsDNumW">
                                    <span class="order-goodsDNumI"></span>
                                    <span class="order-goodsDNum">{{itemGoods.buyNum}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
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
                        <span style="color: #30ce84;">{{dataItem.totalMoney}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="order-sumitW">
            <div class="order-sumitP">
                <span class="shop-cPriceInt">{{other|toDecimal2Fp}}.</span>
                <span class="shop-cPriceFloat">{{other|toDecimal2Ap}}</span>
            </div>
            <div class="order-sumit" @click="dialogCode">提交订单</div>
        </div>
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="phonePay-bg" id="phonePay-sms" v-if="showSendCode">
                <p class="phonePay-title">
                    <span class="phoneChe-backW" @click="showSendCode = false">
                        <span class="phoneChe-back"></span>
                    </span>
                    <span class="phonePay-tName">确认兑换</span>
                </p>
                <p class="phonePay-telW hide" v-show="isSmsCode">短信验证码已发送至手机
                    <span class="phonePay-tel">{{userinfo.userName | formatPhone}}</span>
                </p>
                <p class="phonePay-inpW">
                    <input class="phonePay-msg" type="number" placeholder="请输入短信验证码" v-model="smsCode" />
                    <span class="sendPhoneSms" style="background: green;" @click="sendPhoneSms()">{{validate}}</span>
                </p>
                <p class="phonePay-confirm phonePay-conA" :class="smsCode?'light': ''" @click="sumitOrder">确认兑换</p>
            </div>
        </transition>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <bg-mask v-model="showSendCode"></bg-mask>
        </transition>

        <exchange-su v-if="exchangeShow" v-bind:chOrderId ='parOrderId' v-bind:chMessage="other"></exchange-su>
    </div>
</template>

<script>
import headerTop from "../../common/header.vue"
import BgMask from "@/common/BgMask"
import Swiper from 'swiper';
import api from '../../service/api';
import ExchangeSu from "@/components/shopCart/ExchangeSu"
import { mapGetters } from 'vuex';
import { IsEmpty, getToken } from "@/util/common";
import axios from '@/service/http'

export default {
    data() {
        return {
            dataList: [],
            dataAddress: {},
            message: "",
            validate: "获取验证码",
            validateFlag: 1,
            showSendCode: false,
            smsCode: undefined,
            exchangeShow: false,
            addressDef: null,
            isSmsCode: false,
            other: 0
        };
    },
    mounted() {
        if (this.$route.query.cart == 'cart') {
            this.previewOrderByCart()
        } else {
            this.previewOrder()
        }
        sessionStorage.setItem('fromOrder',false);
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo'
        })
    },
    methods: {
        dialogCode() {
          if (this.userinfo.score > this.other) {
            this.showSendCode = true
          } else {
            this.Toast(this.message)
          }
        },
        sumitOrder() {
            if (this.$route.query.cart == 'cart') {
                this.saveOrderByCart()
            } else {
                this.saveOrder();
            }
        },
        async getUserAddress() {
          var _token = getToken();
          var address = await axios(testUrl + api.selectDefaultAddresses, {token: _token}, 'post');
          if (address.error_code == 0 && address.data)
          {
            this.addressDef = address.data;
          };
        },
        // 订单预览
        previewOrder: function() {
            var token = getToken();
            var buys = window.buys;
            if(!buys){
              this.$router.push({
                path: '/layout/shopCart'
              });
            }
            if(window.chooseAddress)
            {
              this.addressDef = window.chooseAddress;
            }else{
              //选区默认地址
              this.getUserAddress();
            }
            var addressId = 0;
            if(this.addressDef)
             addressId = this.addressDef.id;
            let _this = this;
            this.axios(testUrl + api.previewOrder, {
                "token": token,
                "id": addressId,
                "buys": buys
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0 || data.error_code == 7) {
                        _this.message = data.message;
                        _this.other = data.other
                        _this.dataList = data.data;
                        _this.dataAddress = data.data[0];
                        // if (localStorage.getItem('orderAddress')=='' || localStorage.getItem('orderAddress')==null) {
                        //     _this.addressDef.name = data.data[0].userName;
                        //     _this.addressDef.userAddress = data.data[0].userAddress;
                        //     _this.addressDef.tel = data.data[0].userMobile;
                        //     localStorage.setItem('orderAddress',JSON.stringify(_this.addressDef))
                        // }else{
                        //     let orderAddress = JSON.parse(localStorage.getItem('orderAddress'));
                        //     _this.addressDef.name = orderAddress.name;
                        //     _this.addressDef.userAddress = orderAddress.userAddress;
                        //     _this.addressDef.tel = orderAddress.tel;
                        // }

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
                        // var editItem = JSON.stringify(_this.dataAddress);
                        // localStorage.setItem('addressEdit', editItem);
                    }else if(data.error_code == 3){
                      this.Toast(data.msg);
                      setTimeout(function () {
                        _this.$router.push({
                          path: '/'
                        });
                      },1000);
                    }
                })
                .catch((err) => {

                })
        },
        // 通过购物车进来
        previewOrderByCart: function() {
            var token = getToken();
            console.log(window.chooseAddress);
            if(window.chooseAddress)
            {
              this.addressDef = window.chooseAddress;
            }else{
              //选区默认地址
              this.getUserAddress();
            }
            var addressId = 0;
            if(this.addressDef)
              addressId = this.addressDef.id;
            let _this = this;
            this.axios(testUrl + api.previewOrderByCart, {
                "token": token,
                "id": addressId,
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0 || data.error_code == 7)
                    {
                      _this.message = data.message;
                      _this.other = data.other
                      _this.dataList = data.data;
                      _this.dataAddress = data.data[0];
                      // if (localStorage.getItem('orderAddress') == '' || localStorage.getItem('orderAddress') == null) {
                      //   _this.addressDef.name = data.data[0].userName;
                      //   _this.addressDef.userAddress = data.data[0].userAddress;
                      //   _this.addressDef.tel = data.data[0].userMobile;
                      //   localStorage.setItem('orderAddress', JSON.stringify(_this.addressDef))
                      // } else {
                      //   let orderAddress = JSON.parse(localStorage.getItem('orderAddress'));
                      //   _this.addressDef.name = orderAddress.name;
                      //   _this.addressDef.userAddress = orderAddress.userAddress;
                      //   _this.addressDef.tel = orderAddress.tel;
                      // }
                      //多商品轮播图
                      _this.dataList.forEach((res, index) => {
                        if (res.goodsList.length > 1) {
                          var goodsId = 'res' + res.goodsList[0].goodsId;
                          var classg = '.' + goodsId + ' .swiper-container';
                          var bnt = '.' + goodsId + ' .swiper-button-next';
                          _this.$nextTick(function () {
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
                      // var editItem = JSON.stringify(_this.dataAddress);
                      // localStorage.setItem('addressEdit', editItem);
                    }else if(data.error_code == 3){
                      this.Toast(data.message);
                      this.$router.push({
                        path: '/'
                      });
                    }else {
                      this.Toast(data.message);
                    }
                })
                .catch((err) => {

                })
        },
        //下单
        saveOrder: function() {
            var token = getToken();
            var buys = window.buys;
            if(!this.addressDef)
            {
              this.Toast("请选择配送地址！");
              return ;
            }

            if(!buys)
            {
              this.Toast("购买商品不能为空！");
              return ;
            }

            let _this = this;
            this.axios(testUrl + api.saveOrder, {
                "token": token,
                "id": this.addressDef.id,
                "buys": buys,
                code: this.smsCode
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        var orderId = data.data[0].orderId;
                        // this.Toast('下单成功')
                        // this.$router.push({ name: 'orderDetails', params: { orderId: orderId } })
                        _this.showSendCode = false;
                        _this.exchangeShow = true;
                        _this.parOrderId = orderId;

                    }else{
                      _this.Toast(data.msg);
                    }
                })
                .catch((err) => {

                })
        },
        // 通过购物车下单
        saveOrderByCart: function() {
            var token = getToken();
            if(!this.addressDef)
            {
              this.Toast("请选择配送地址！");
              return ;
            }
            let _this = this;
            this.axios(testUrl + api.saveOrderByCart, {
                token,
                id: this.addressDef.id,
                code: this.smsCode
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        var orderId = data.data[0].orderId;
                        // this.Toast('下单成功')
                        // this.$router.push({ name: 'orderDetails', params: { orderId: orderId } })
                        _this.showSendCode = false;
                        _this.exchangeShow = true;
                        _this.parOrderId = orderId;
                    } else {
                      _this.Toast(data.message)
                    }
                })
                .catch((err) => {

                })
        },

        //定时
        async sendPhoneSms() {
            if (this.validateFlag == 1) {
                let data = await this.axios(testUrl + api.sendSms, { token: localStorage.getItem('yeyun_token') }, 'post')
                if (data.error_code) {
                    return this.Toast(data.message)
                }
                this.isSmsCode = true
                this.validate = "120s 重新获取"
                let _this = this;
                let timeInit = 120;
                let countDown = setInterval(function() {
                    let i = 1;
                    timeInit = timeInit - i;
                    if (timeInit > 0) {
                        _this.validate = timeInit + 's 重新获取';
                        _this.validateFlag = 0
                    } else {
                        _this.validate = "重新获取"
                        _this.validateFlag = 1;
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        }
    },
    components: {
        "header-top": headerTop,
        BgMask,
        ExchangeSu
    },
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
                margin-bottom: 0.33rem; // span:nth-of-type(1) {
                //     background: #30ce84;
                //     color: #fff;
                //     font-size: 0.24rem;
                //     border-radius: 0.4rem;
                //     padding: 0.1rem;
                // }
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
                color: #000;
                font-size: 0.3rem;
                font-size: 14px;
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
                .order-goodsDPrice {
                    color: #30ce84;
                }
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
.product-container{
  &:last-of-type{
    margin-bottom: 70px;
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
        color: #000;
    }
}

.order-sumitW {
    height: 1.2rem;
    background: #fff;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0.27rem; // margin-bottom: 48px;
    position: fixed;
    width: 100%;
    bottom: -1px;
    left: 0;
    .order-sumitP {
        font-weight: 500;
        color: #30ce84;
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




.phonePay-bg {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0; // border-radius: 5px;
    margin: 0 auto;
    right: 0;
    z-index: 101;
    background: #F3F4F6;
    input {
        width: 65%;
        height: 23px;
        line-height: 23px;
        padding-left: 11px;
        font-size: 18px;
        color: #333;
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 1;
    }
    .phonePay-title {
        background: #fff;
        text-align: center;
        height: 45px;
        line-height: 45px;
        /* border-bottom: 1px solid #dfdfdf; */
        color: #333333;
        font-size: 15px;
        position: relative;
        .phoneChe-backW {
            width: 0.22rem;
            height: 0.38rem;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-size: 5.8rem 1.86rem;
            background-position: -0.2rem -0.74rem;
            position: absolute;
            left: 0.32rem;
            top: 0.26rem;
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
    }
}


.phonePay-telW {
    //   width: 5.67rem;
    max-width: 339px;
    margin: 23px auto 0 auto;
    color: #333;
    font-size: 13px;
}

.phonePay-inpW {
    /* border: 1px solid #dfdfdf;  */
    height: 44px; // width: 5.67rem;
    max-width: 339px;
    display: flex;
    justify-content: space-between;
    margin: 16px auto;
    position: relative;
    /* box-shadow:0px 0px 0px 1px #ccc; */
    background: #fff;
}

.phonePay-inpW span {
    display: inline-block;
    width: 30%;
    background: #999999;
    height: 45px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: -1px;
    z-index: 1;
}

.phonePay-confirm {
    margin: 0 auto;
    line-height: 45px;
    height: 45px;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    box-shadow: 0px 0px 10px 0px rgba(135, 248, 199, 0.4);
    border-radius: 50px;
    background: #91efb1;
    width: 90%;
    margin-bottom: 1rem;
}

.light {
    background-color: #27bd5a;
}
</style>
