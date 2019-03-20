<template>
    <div class="home-integralW">
        <div class="home-rHM">
            <h3>积分区间</h3>
            <span class="home-rMore" @click="$router.push('/goodsList')"></span>
        </div>
        <p class="home-hSE">INTEGRAL DIMENSION</p>
        <div class="home-iSelectW">
            <ul class="home-iSelect">
                <li v-for="(item,index) in homeSel" :key="index" v-if="item.homeSelShow" @click="iSelect(item,index)" :class="item.id==iSelectAct?'iSelectCla':'iSelectNo'">
                    {{item.integral}}
                </li>
            </ul>

            <span class="home-iMore" @click="integraM()">
                <span class="home-iMoreGo">

                </span>
            </span>
        </div>

        <div class="home-interWrap">
            <div class="home-iGoodsW" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
                <div class="home-iGoods one-bottom-px">
                    <img :src="item.image" alt="" />
                </div>
                <p class="home-iNmame">
                    {{item.name|wordSize(item.name)}}
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
export default {
    data() {
        return {
            homeSel: [
                { id: 0, integral: "我要兑换", homeSelShow: true },
                { id: 1, integral: "0~50", homeSelShow: true },
                { id: 2, integral: "51~200", homeSelShow: true },
                { id: 3, integral: "201~500", homeSelShow: true },
                { id: 4, integral: "501~1000", homeSelShow: true },
                { id: 5, integral: "1001~2000", homeSelShow: true },
            ],
            homeSelFlag: 0,
            iSelectAct: '',
            iSintegra:'',
            goodsList: [],
        }
    },
    mounted() {
        //积分列表展示
        this.homeSel.forEach((item, index) => {
            if (index > 4) {
                item.homeSelShow = false
            }
        })
        this.goodsAll()
    },
    methods: {
        //带积分到列表页
        toGoodsList() {
            this.$router.push({path:'/goodsList',query:{integra:this.iSintegra}})
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
                this.homeSelFlag = 0
            }
        },
        goDetail (item) {
          this.$router.push({
            path: '/goodsDetail/' + item.id
          })
        },
        iSelect(item, index) {
            this.iSelectAct = index;
            if (item.id != 0) {
                this.price(item.integral);
                this.iSintegra = item.integral.replace('~', '-');
            } else {
                this.goodsAll()
                this.iSintegra = "";
            }
        },
        price: function(integral) {
            let integrals = integral.replace('~', '-');
            var token = localStorage.getItem("token");
            let _this = this;
            this.axios(jdTestUrl + api.price, {
                "price": integrals,
                "offset": 0,
                "rows": 16
            }, 'get')
                .then((data) => {
                    if (data.code == 0) {
                        _this.goodsList = data.list;

                    } else {

                    }
                })
                .catch((err) => {


                })
        },

        goodsAll: function() {
            let _this = this;
            this.axios(jdTestUrl + api.keyword, {
                "offset": 1,
                "rows": 10,
                "keyWord": "",
                "brandId": "",
                "timeSort": "",
                "salesVolume": "",
                "priceRange": "",
                "price": "",
            }, 'post')
                .then((data) => {
                    if (data.code == 0) {
                        if (data.list.length > 0) {
                            _this.goodsList = data.list;
                        }else{

                        }
                    } else {
                        this.Toast(data.message)
                    }
                })
                .catch((err) => {
                    this.Toast(err.message)

                })
        },

        // http://192.168.0.110:9988/query/keyword
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
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-position: -3.24rem -0.76rem;
                background-size: 5.8rem 1.86rem;
                -webkit-transform: rotate(45deg);
                transform: rotate(90deg);
                width: 0.25rem;
                height: 0.25rem;
                display: inline-block;
                margin: 0.18rem auto;
            }
        }
        .iSelectNo {
            border: 1px solid rgba(0,0,0,0.06);
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
            text-align: center;
            // border-bottom: 1px solid #e6e6e6; // height: 3.16rem;
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
    .home-integralM {
        padding: 0.33rem 0 1.3rem 0;
        text-align: center;
        font-size: 0.3rem; // margin-bottom: 49px;
    }
}
</style>
