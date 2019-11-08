<template>
    <div class="shopForyou">
        <div class="home-integralW">
            <p class="home-rHM">为你推荐<span>RECOMMENDED</span></p>
            <div class="home-interWrap">
                <div class="home-iGoodsW" @click="goDetail(item)" v-for="(item,index) in goodsList" :key="index">
                    <div class="home-iGoods">
                        <img v-lazy="item.image" alt="" />
                    </div>
                    <p class="home-iNmame">
                        {{item.name}}
                    </p>
                    <div class="home-iMoneyW">
                        <img :src="logoImg" alt="" class="home-iMoneyL">
                        <span class="home-iMoney">{{item.currentPrice|toDecimal2}}</span>
                        <span class="home-iMoneymar" v-if="item.currentPrice!=item.marketPrice">{{item.marketPrice|toDecimal2}}</span>
                    </div>
                </div>
            </div>
            <button class="btn-list" @click="$router.push('/goodsList')">进店逛逛</button>
            <div class="logo-wrapper">
              <img src="/static/images/cart/logo.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/service/api";
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            goodsList: [],
            logoImg: LOGO_PACKAGE_URL + 'logo-black.png'
        }
    },
     computed:{
      ...mapGetters({
          searchHis: 'searchHis/getSearchHis'
      })
    },
    methods: {
        guessLike: function() {
            let _this = this;
            let name =  this.searchHis;
            this.axios(jdTestUrl + api.guessLike, {
                "name": name
            }, 'post')
                .then((data) => {
                    if (data.code == 0) {
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
@import '../../../scss/mixin.scss';
.shopForyou {
    .home-integralW {
        width: 100%;
        background: #fff;
        border-top: 1px solid transparent;
        overflow: hidden;
        .home-rHM {
          text-align: center;
          font-size: 0.32rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          span{
            color: #fe6701;
            font-weight: normal;
            display: inline-flex;
            align-items: center;
            &::before{
              content: '';
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background: #9a9a99;
              display: inline-block;
              margin: 0 0.1rem 0 0.13rem;
            }
          }
        }
        .home-interWrap {
            width: 100%;
            overflow: auto;
                padding: 0.3rem 0 0.32rem 0;
        }
        .no-more {
            padding-bottom: 0.5rem;
            text-align: center;
            font-style: italic;
        }
        .home-iGoodsW {
            display: inline-block;
            width: 43%;
            box-sizing: border-box;
            border-radius: 5px;
            box-shadow: 0px 0px 8px 6px #F3F3F3;
            margin:  0.1rem 5%;
            &:nth-of-type(2n+1){
              margin-right: 4%;
            }
            &:nth-of-type(2n+2){
                  margin-left: 0;
            }
            .home-iGoods {
                width: 100%;
                text-align: center;
                // height: 3.16rem;
                position: relative;
                img {
                    width: 100%;
                    border-radius: 5px 5px 0 0;
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
                        color: #fff;
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
                font-size: 0.26rem;
                word-break: break-all;
                word-wrap: break-word;
                text-align: left;
                overflow: hidden;
                position: relative;
                line-height: 1.5em;
                height: 2.9em;
                margin: 0.2rem 0.2rem 0 0.2rem;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .home-iMoneyW {
              display: flex;
              align-items: center;
              padding: 0.3rem 0.1rem 0.24rem 0.1rem;

              .home-iMoneyL {
                width: 18px;
                height: 18px;
                margin-right: 4px;
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
          margin: 0 auto px2rem(16) auto;
        }
    }
    .logo-wrapper{
       background: #f3f4f6;
        padding: 0.6rem 0 0.1rem 0;
      img{
        width: 2.32rem;
        height: 0.5rem;
        margin: 0.4rem auto 0.2rem;

      }
    }
}
</style>
