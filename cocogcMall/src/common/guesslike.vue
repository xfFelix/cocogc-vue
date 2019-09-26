<template>
    <div class="guesslike">
        <div class="home-integralW">
            <div class="home-rHM">
                <h3>
                  <img src="/static/images/cart/left.png" alt="" class="left">
                  猜你喜欢
                  <img src="/static/images/cart/right.png" alt="" class="right">
                </h3>
            </div>
            <div class="home-interWrap">
                <div class="home-iGoodsW" @click="goDetail(item)" v-for="(item,index) in goodsList" :key="index">
                    <div class="home-iGoods">
                        <img v-lazy="item.image" alt="" />
                    </div>
                    <p class="home-iNmame">
                        {{item.name}}
                    </p>
                    <div class="home-iMoneyW">
                        <!-- <span class="home-iMoneyL"></span> -->
                        <img :src="logoImg" alt="" class="home-iMoneyL">
                        <span class="home-iMoney">{{item.currentPrice|toDecimal2}}</span>
                        <span class="home-iMoneymar" v-if="item.currentPrice!=item.marketPrice">{{item.marketPrice|toDecimal2}}</span>
                    </div>
                </div>
            </div>
            <!-- <no-data :data="goodsList"></no-data> -->
            <button class="btn-list" @click="$router.push('/goodsList')">进店逛逛</button>
        </div>
    </div>
</template>
<script>
import api from "@/service/api";
import { arrayContains } from "@/util/common";
export default {
    data() {
        return {
            goodsList: [],
            logoImg: LOGO_PACKAGE_URL + 'logo-black.png'
        }
    },
    methods: {
        parseGuessLike(list) {
            if (window.userLikeId) {
                for (var k = 0; k < list.length; k++) {
                    if (arrayContains(window.userLikeId, list[k].id)) {
                        list.splice(k, 1);
                    }
                }
            }
            return list;
        },
        guessLike: function() {
            let _this = this;
            let name = window.userLikeName;
            this.axios(jdTestUrl + api.guessLike, {
                "name": name
            }, 'post')
                .then((data) => {
                    if (data.code == 0) {
                        // _this.goodsList = _this.parseGuessLike(data.list);
                        _this.goodsList = data.list
                    } else {
                        _this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    _this.Toast(err.message);
                })
        },
        goDetail(item) {
            this.$router.push({
                path: '/goodsDetail/' + item.id
            })
        },
    },
    mounted() {
        this.guessLike()
    },

}
</script>


<style lang="scss" scoped>
@import '../scss/mixin.scss';
.guesslike {
    .home-integralW {
        width: 100%;
        background: #fff;
        border-top: 1px solid transparent;
        overflow: hidden;
        .home-rHM {
            margin: 0;
            h3 {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size:px2rem(15);;
              font-family:Microsoft YaHei;
              font-weight:bold;
              color:rgba(229,170,97,1);
              margin: px2rem(20) auto 0;
              img{
                width: px2rem(15);
                height: px2rem(15);
                &.left{
                  margin-right: px2rem(15);
                }
                &.right{
                  margin-left: px2rem(15);
                }
              }
            }
        }
        .home-interWrap {
            width: 100%;
            overflow: auto;
        }
        .no-more {
            padding-bottom: 0.5rem;
            text-align: center;
            font-style: italic;
        }
        .home-iGoodsW {
            display: inline-block;
            width: 50%;
            padding: 0.32rem;
            box-sizing: border-box;
            .home-iGoods {
                width: 100%;
                text-align: center;
                border-bottom: 1px solid #e6e6e6;
                height: 3.16rem;
                position: relative;
                img {
                    width: 100%;
                }
                .home-iTags {
                    position: absolute;
                    bottom: 0.05rem;
                    left: 0;
                    font-size: 0.18rem;
                    display: flex;
                    align-items: flex-end;
                    .iGoods {
                        width: 0.9rem;
                        height: 0.32rem;
                        display: inline-block;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-position: -3.67rem -0.26rem;
                        background-size: 5.8rem 1.86rem;
                        margin-right: 0.08rem;
                    }
                    .iDrop {
                        margin-right: 0.08rem;
                        background: #000000;
                        color: #fff; // padding: 0.04rem 0.07rem 0.01rem 0.07rem;
                        display: inline-block;
                        padding: 0.04rem 0.07rem 0.02rem 0.07rem;
                    }
                    .iSelf {
                        background: #30ce84;
                        color: #fff;
                        padding: 0.04rem 0.07rem 0.02rem 0.07rem;
                        display: inline-block;
                    }
                }
            }
            .home-iNmame {
                color: #333333;
                font-size: 13px;
                line-height: 20px;
                height: 37px;
                overflow: hidden;
                word-break: break-all;
                word-wrap: break-word;
                text-align: left;
                margin: 0.12rem 0;
            }
            .home-iMoneyW {
                display: flex;
                align-items: center;
                font-size: 0.26rem;
                .home-iMoneyL {
                    width: 20px;
                    height: 20px;
                    margin-right: 3px;
                }
            }
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
          margin: px2rem(16) auto;
        }
    }
}
</style>
