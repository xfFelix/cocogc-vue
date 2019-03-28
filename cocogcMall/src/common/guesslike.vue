<template>
    <div class="guesslike">
        <div class="home-integralW">
            <div class="home-rHM">
                <h3>猜你喜欢</h3>
            </div>
            <div class="home-interWrap">
                <div v-for="(item,index) in goodsList" :key="index">
                    <div class="home-iGoodsW" @click="goDetail(item)">
                        <div class="home-iGoods">
                            <img v-lazy="item.image" alt="" />
                        </div>
                        <p class="home-iNmame">
                            {{item.name|wordSize(item.name)}}
                        </p>
                        <div class="home-iMoneyW">
                            <span class="home-iMoneyL"></span>
                            <span class="home-iMoney">{{item.currentPrice|toDecimal2Fp}}.</span>
                            <span class="home-iMoney">{{item.currentPrice|toDecimal2Ap}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <no-data :data="goodsList"></no-data> -->
            <p style="text-align: center;padding: 0.2rem;color: #666;">已经到底了噢~~</p>
        </div>
    </div>
</template>
<script>
import api from "@/service/api";
import { arrayContains } from "@/util/common";
export default {
    data() {
        return {
            goodsList: []
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
            //console.log(name);
            this.axios(jdTestUrl + api.guessLike, {
                "name": name
            }, 'post')
                .then((data) => {
                    if (data.code == 0) {
                        _this.goodsList = _this.parseGuessLike(data.list);
                    } else {
                        _this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    _this.Toast(data.message);
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


<style lang="less">
.guesslike {
    .home-integralW {
        width: 100%;
        background: #fff;
        border-top: 1px solid transparent;
        margin-bottom: 0.8rem;
        .home-rHM {
            margin: 0;
            h3 {
                font-size: 0.3rem;
                font-weight: 100;
                margin: 0.43rem 0 0.23rem 0.32rem;
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
            float: left;
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
                font-size: 0.26rem;
                line-height: 0.36rem;
                margin-top: 0.12rem;
            }
            .home-iMoneyW {
                display: flex;
                align-items: center;
                .home-iMoneyL {
                    width: 0.26rem;
                    height: 0.28rem;
                    display: inline-block;
                    background-image: url(/static/images/jl.png);
                    background-repeat: no-repeat;
                    background-position: -2.57rem -0.78rem;
                    background-size: 5.8rem 1.86rem;
                    margin-right: 0.03rem;
                }
            }
        }
    }
}
</style>
