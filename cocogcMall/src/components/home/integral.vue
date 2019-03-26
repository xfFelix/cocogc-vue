<template>
    <div class="home-integralW">
        <div class="home-rHM">
            <h3>积分区间</h3>
            <!-- <span class="home-rMore" @click="$router.push('/goodsList')"></span> -->
        </div>
        <p class="home-hSE">INTEGRAL DIMENSION</p>
        <div class="home-iSelectW">
            <ul class="home-iSelect">
                <li v-for="(item,index) in homeSel" :key="index" v-show="item.homeSelShow" @click="iSelect(item,index)" :class="item.id==iSelectAct?'iSelectCla':'iSelectNo'">
                    {{item.integralInfo}}
                </li>
            </ul>

            <span class="home-iMore" @click="integraM()">
                <span class="home-iMoreGo j1Png" :class="homeSelFlag?'home-iMoreGob':'home-iMoreGoa'"></span>
            </span>
        </div>

        <div class="home-interWrap">
            <div class="home-iGoodsW" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
                <div class="home-iGoods one-bottom-px">
                    <img :src="item.image" alt="" />
                </div>
                <p class="home-iNmame">
                    {{item.name}}
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">{{item.currentPrice}}</span>
                </div>
            </div>
        </div>
        <div class="home-integralM one-top-px" @click="toGoodsList()">
            查看更多
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import api from '../../service/api';
import { mapGetters } from 'vuex';
import { getToken } from '@/util/common'

export default {
    data() {
        return {
            homeSel: [
                { id: 0, integral: '0~' + parseInt(this.$store.getters['userinfo/getUserInfo'].score), homeSelShow: true, integralInfo: '我能兑换' },
                { id: 1, integral: "0~50", homeSelShow: true, integralInfo: '0~50' },
                { id: 2, integral: "51~200", homeSelShow: true, integralInfo: '51~200' },
                { id: 3, integral: "201~1000", homeSelShow: true, integralInfo: '201~1000' },
                { id: 4, integral: "1001~5000", homeSelShow: true, integralInfo: '1001~5000' },
                { id: 5, integral: "5001~*", homeSelShow: true, integralInfo: '5000以上' },
            ],
            homeSelFlag: 0,
            iSelectAct: '',
            iSintegra: '',
            goodsList: [],
            token: getToken(),
        }
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo'
        })
    },
    mounted() {
        //积分列表展示
        this.homeSel.forEach((item, index) => {
            if (index > 4) {
                item.homeSelShow = false
            }
        })

        if (this.$store.getters['userinfo/getUserInfo'].score) {
            this.price(this.homeSel[0].integral);
            this.iSintegra = this.homeSel[0].integral.replace('~', '-');
        } else {
            this.iSelectAct = 1
            this.price(this.homeSel[1].integral);
            this.iSintegra = this.homeSel[1].integral.replace('~', '-');
        }


    },
    methods: {
        //带积分到列表页
        toGoodsList() {
            this.$router.push({ path: '/goodsList', query: { integra: this.iSintegra } })
        },
        // 积分区间
        integraM() {
            if (this.homeSelFlag == 0) {
                this.homeSel.forEach((item, index) => {
                    if (index > 4) {
                        item.homeSelShow = true;
                    }
                })
                this.homeSelFlag = 1;
            } else {
                this.homeSel.forEach((item, index) => {
                    if (index > 4) {
                        item.homeSelShow = false;
                    }
                })
                this.homeSelFlag = 0;
            }
        },
        goDetail(item) {
            this.$router.push({
                path: '/goodsDetail/' + item.id
            })
        },
        iSelect(item, index) {
            if (item.integral == '0~NaN') {
                MessageBox.confirm('', {
                    message: '登录后查看您可兑换的商品，立即登录。',
                    title: '提示',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                        this.$router.push({ path: '/login' })
                    }
                })
                return
            } else {
                this.iSelectAct = index;
                this.price(item.integral);
                this.iSintegra = item.integral.replace('~', '-');
            }
        },
        price: function(integral) {
            let integrals = integral.replace('~', '-');
            let _this = this;
            this.axios(jdTestUrl + api.price, {
                "price": integrals,
                "offset": 0,
                "rows": 10
            }, 'get')
                .then((data) => {
                    if (data.code == 0) {
                        _this.goodsList = data.list;
                    } else {
                        _this.Toast(data.message)
                    }
                })
                .catch((err) => {

                })
        },


    }

}
</script>
<style lang="less" scoped>
.home-integralW {
    width: 100%;
    background: #fff;
    margin-top: 0.3rem;
    border-top: 1px solid transparent;
    .home-iSelectW {
        color: #333333;
        font-size: 0.2rem;
        overflow: auto;
        display: flex;
        justify-content: space-around; // margin-bottom: 0.2rem;
        .home-iSelect {
            width: 6.90rem;
            li {
                width: 17.54%; // height: 0.56rem;
                line-height: 0.5rem;
                text-align: center; // border: 1px solid #ccc;
                float: left;
                margin: 0 0 0.15rem 1.77%;
                padding: 3px 0;
                border-radius: 2rem;
            }
        }
        .home-iMore {
            width: 5.4%;
            height: 0.58rem;
            display: inline-block;
            border: 1px solid #dfdfdf;
            border-radius: 1rem; // margin-right: 0.09rem;
            text-align: center;
            .home-iMoreGo {
                background-position: -3.24rem -0.76rem; // transform: rotate(90deg);
                width: 0.25rem;
                height: 0.25rem;
                display: inline-block;
                margin: 0.18rem auto;
                transition: all 0.4s;
            }
            .home-iMoreGoa {
                transform: rotate(90deg);
            }
            .home-iMoreGob {
                transform: rotate(-90deg);
            }
        }
        .iSelectNo {
            border: 1px solid rgba(0, 0, 0, 0.06);
            color: #333333;
        }
        .iSelectCla {
            color: #fff;
            background: #30ce84;
            border: none;
            border: 1px solid #30ce84;
        }
    }
    .home-interWrap {
        width: 100%;
        overflow: auto;
    }
    .home-iGoodsW {
        float: left;
        width: 50%;
        padding: 0 0.32rem;
        box-sizing: border-box;
        margin: 0.2rem 0;
        .home-iGoods {
            width: 100%;
            text-align: center; // border-bottom: 1px solid #e6e6e6; // height: 3.16rem;
            position: relative;
            img {
                width: 100%; // margin-top: 0.5rem;
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
            font-weight: bold;
            margin-top: 0.12rem;
            position: relative;
            line-height: 1.5em;
            height: 3em;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                padding: 0 5px;
                background-color: #fff;
            }
        }
        .home-iMoneyW {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.1rem 0;
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
    .home-integralM {
        padding: 0.33rem 0;
        text-align: center;
        font-size: 0.3rem; // margin-bottom: 49px;
    }
}
</style>
