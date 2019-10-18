<template>
    <div class="orderDetails">
        <header-top></header-top>
        <div class="od-titleWrap">
             <p class="od-titleInfoWrap">
                <span class="j1Png od-titleInfoImg"></span>
                <span class="od-titleInfo">{{dataList.orderStatus}}</span>
                <span class="bind-stream" v-if="dataList.orderStatus === '申请退货'" @click="showStream = true">绑定物流</span>
            </p>
            <!-- <p class="od-service">
                申请售后
            </p> -->

        </div>

        <div class="order-addressWN">
            <div class="order-addressW">
                <div class="order-address">
                    <p class="order-addPerson">
                        <span>{{dataList.userName}}</span>
                        <span>{{dataList.userMobile}}</span>
                    </p>
                    <p class="order-addInfo">
                       {{dataList.userAddress}}
                    </p>
                </div>
                <!-- <div>
                    <span class="goTo"></span>
                </div> -->
            </div>

            <div class="order-bottom"></div>
        </div>

        <div class="od-timeInfoWrap">
            <div class="od-numberWrap">
                <p class="od-number">
                    <span>订单编号：</span>
                    <span>{{dataList.orderId}}</span>
                </p>
                <p class="od-numberCopy" @click="handleCopy(dataList.orderId, $event)">复制</p>
            </div>
            <div class="od-timeInfo">
                <span>下单时间：</span>
                <span>{{dataList.addTime}}</span>
            </div>
        </div>

        <div v-if="addressList && addressList.length">
          <div class="od-timeInfoWrap" v-for="(item, index) in addressList" :key="index">
              <div class="od-numberWrap">
                  <p class="od-number">
                      <span>申请单号：</span>
                      <span>{{item.applyId}}</span>
                  </p>
                  <p class="od-numberCopy" @click="handleCopy(item.applyId, $event)">复制</p>
              </div>
              <div class="od-timeInfo">
                  <span>收货地址：</span>
                  <span>{{item.fullAddress}}</span>
              </div>
              <div class="od-timeInfo">
                  <span>商品名称：</span>
                  <span>{{item.goodsName}}</span>
              </div>
              <div class="od-timeInfo">
                  <span>收货电话：</span>
                  <span>{{item.mobile}}</span>
              </div>
              <div class="od-timeInfo">
                  <span>收货人：</span>
                  <span>{{item.name}}</span>
              </div>
              <div class="od-timeInfo">
                  <span>邮政编码：</span>
                  <span>{{item.zipCode}}</span>
              </div>
          </div>
        </div>


        <div v-for="(item,index) in dataList.goodsList" :key="index">
            <div class="order-goodSW">
              <router-link :to="{path: '/goodsDetail/'+ item.goodsId}">
                <div class="order-goodSInfo">
                    <div class="order-goodSIImg">
                      <img :src="item.picUrl" alt="">
                    </div>
                    <div class="order-goodsDetail">
                        <p class="order-goodsDName">{{item.goodsName}}</p>

                        <p class="order-goodsDType"></p>
                        <div class="order-goodsDPriceW">
                            <span class="order-goodsDPrice">{{item.buyPrice|toDecimal2(item.buyPrice)}}</span>
                            <p class="order-goodsDNumW">
                                <span class="order-goodsDNumI"></span>
                                <span class="order-goodsDNum">{{item.buyNum}}</span>
                            </p>
                        </div>
                    </div>
                </div>
              </router-link>

            </div>
        </div>
        <div class="od-goodSNumWrap one-top-px">
            <p class="od-goodSNum">
                <span class="od-goodSNumName">{{dataList.vendorId}}</span>
                <span>{{dataList.orderId}}</span>
            </p>
            <p class="od-logistic">
                <router-link :to="{path:'/logisticsDetail',query:{orderId:dataList.orderId,logisticId:dataList.id}}">
                    <span>查看物流</span>
                    <span class="od-goLogistics j1Png"></span>
                </router-link>
            </p>
        </div>



        <div class="od-priceWrap">
            <ul class="od-priceUl one-bottom-px">
                <li>
                    <span>商品总额</span>
                    <span>{{dataList.sellMoney|toDecimal2(dataList.sellMoney)}}</span>
                </li>
                <li>
                    <span>运费</span>
                    <span>{{dataList.shippingFee|toDecimal2(dataList.shippingFee)}}</span>
                </li>
                <li>
                    <span>服务费</span>
                    <span>{{dataList.serviceMoney|toDecimal2(dataList.serviceMoney)}}</span>
                </li>
                <li>
                    <span>税费</span>
                    <span>{{dataList.taxFee|toDecimal2(dataList.taxFee)}}</span>
                </li>

            </ul>
            <p class="od-realPrice">
                <span>实付：</span>
                <span>{{dataList.totalMoney|toDecimal2(dataList.totalMoney)}}</span>
            </p>
        </div>

        <div class="mask" v-if="showStream">
          <div class="dialog">
            <h1>绑定物流信息</h1>
            <div class="item">
              <div class="label">申请单号</div>
              <input type="text" v-model="stream.applyId">
            </div>
            <div class="item">
              <div class="label">快递公司</div>
              <input type="text" v-model="stream.name" placeholder="圆通\中通\顺丰...">
            </div>
            <div class="item">
              <div class="label">快递单号</div>
              <input type="text" v-model="stream.number">
            </div>
            <div class="btn-wrapper">
              <div class="btn" @click="closeDialog()">取消</div>
              <div class="btn" @click="bindStream()">成功</div>
            </div>
          </div>
        </div>

    </div>
</template>
<script>

import headerTop from "../../common/header.vue";
import api from '../../service/api';
import clip from '@/util/clipboard'
import { IsEmpty, getToken } from "@/util/common";

export default {
    data() {
        return {
            list: [],
            addressList: [],
            dataList: {},
            orderId: this.$route.params.orderId,
            showStream: false,
            stream: {
              name: '',
              number: '',
              applyId: ''
            }
        };
    },
    mounted() {
      this.findOrder()
    },
    methods: {
      closeDialog() {
        this.stream = {
          name: '',
          number: '',
          applyId: ''
        },
        this.showStream = false
      },
      async bindStream() {
        let token = getToken();
        const { applyId, name, number } = this.stream
        let params = {token, code: this.orderId, applyId, trackingCompany: name, trackingNum: number}
        const { data, error_code, message } = await this.axios(testUrl + api.bindStream, params, 'post')
        this.Toast(message)
        if (error_code) return
        this.closeDialog()
      },
        logisticGo: function() {
            this.$router.push('/logisticsDetail')
        },
        // 查找订单
        findOrder: function() {

            var token = getToken();
            let _this = this;
            this.axios(testUrl + api.getOrder, {

                "token": token,
                "code": this.orderId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.dataList = data.data.orderVO;
                        this.addressList = data.data.returnAddressList
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
        },
    },
    components: {
        "header-top": headerTop
    }
};
</script>
<style lang="scss">
.od-titleWrap {
    padding: 0.4rem 0.3rem 0 0.3rem;
    // height: 1.26rem;
    height: 1.2rem;
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
        .bind-stream{
          background: #fff;
          color: #30ce84;
          padding: 3px 10px;
          border-radius: 25px;
          font-size: 13px;
          margin-left: 10px;
        }
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
        justify-content: flex-start;
        padding-bottom: 0.4rem;
        span:nth-of-type(1) {
            font-weight: bold;
            display: block;
            width: 68px;
            text-align-last: justify;
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
    // margin-top: 0.2rem;

    padding: 0.2rem 0.37rem 0.2rem 0.32rem; // height: auto;
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
    padding: 0.28rem 0.3rem 0.08rem 0.3rem;
    background: #fff;
    .od-goodSNum {
        span{
             display: block;
             margin-bottom: 0.1rem;
        }
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
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  .dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 88%;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    h1{
      font-size: 18px;
      text-align: center;
      margin-top: 15px;
    }
    .item{
      display: flex;
      align-items: center;
      margin: 15px 15px 0 15px;
      height: 40px;
      border: 1px solid #dedede;
      border-radius: 5px;
      .label{
        text-align: center;
        flex-basis: 80px;
        font-size: 14px;
        border-right: 1px solid #dedede;
      }
      input {
        flex: 1;
        height: 100%;
        padding-left: 10px;
        font-size: 14px;
      }
    }
    .btn-wrapper{
      display: flex;
      align-items: center;
      height: 44px;
      border-top: 1px solid #dedede;
      margin-top: 20px;
      .btn{
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child{
          border-left: 1px solid #dedede;
          color: #30ce84;
        }
      }
    }
  }
}
</style>




