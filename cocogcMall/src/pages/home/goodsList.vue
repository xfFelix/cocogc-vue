<template>
    <div class="goodsList">
        <div class="home-smWrap">
            <head-search></head-search>
            <ul class="goodsList-order one-bottom-px">
                <li>
                    <p>全部</p>

                </li>
                <li>
                    <p>销量</p>
                    <p class="j1Png gl-orderBg">
                        <span></span>
                        <span></span>
                    </p>
                </li>
                <li>
                    <p>价格</p>
                    <p class="j1Png gl-orderBg">
                        <span></span>
                        <span></span>
                    </p>
                </li>
                <li>
                    <p @click="intervalCli">积分区间</p>

                </li>
            </ul>

            <div class="home-iSelectW" v-if="intervalFlag">
                <ul class="home-iSelect">
                    <li v-for="(item,index) in homeSel" :key="index" v-if="item.homeSelShow" @click="iSelect(index)" :class="item.id==iSelectAct?'iSelectCla':'iSelectNo'">
                        {{item.integral}}
                    </li>
                </ul>
            </div>

        </div>

        <div class="goodList-interWrap">
            <div class="home-iGoodsW">
                <div class="home-iGoods">
                    <img src="static/images/goos_01.png" alt="" />
                    <span class="home-iTags">
                        <span class="iGoods"></span>
                        <span class="iDrop">直降</span>
                        <span class="iSelf">自营</span>
                    </span>
                </div>
                <p class="home-iNmame">
                    联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">6848.00</span>
                </div>
            </div>
            <div class="home-iGoodsW">
                <div class="home-iGoods">
                    <img src="static/images/goos_01.png" alt="" />
                    <span class="home-iTags">
                        <span class="iGoods"></span>
                        <span class="iDrop">直降</span>
                        <span class="iSelf">自营</span>
                    </span>
                </div>
                <p class="home-iNmame">
                    联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">6848.00</span>
                </div>
            </div>
            <div class="home-iGoodsW">
                <div class="home-iGoods">
                    <img src="static/images/goos_01.png" alt="" />
                    <span class="home-iTags">
                        <span class="iGoods"></span>
                        <span class="iDrop">直降</span>
                        <span class="iSelf">自营</span>
                    </span>
                </div>
                <p class="home-iNmame">
                    联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">6848.00</span>
                </div>
            </div>
            <div class="home-iGoodsW">
                <div class="home-iGoods">
                    <img src="static/images/goos_01.png" alt="" />
                    <span class="home-iTags">
                        <span class="iGoods"></span>
                        <span class="iDrop">直降</span>
                        <span class="iSelf">自营</span>
                    </span>
                </div>
                <p class="home-iNmame">
                    联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">6848.00</span>
                </div>
            </div>
            <div class="home-iGoodsW">
                <div class="home-iGoods">
                    <img src="static/images/goos_01.png" alt="" />
                    <span class="home-iTags">
                        <span class="iGoods"></span>
                        <span class="iDrop">直降</span>
                        <span class="iSelf">自营</span>
                    </span>
                </div>
                <p class="home-iNmame">
                    联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">6848.00</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headSearch from "../../common/headSearch.vue";
export default {
    data() {
        return {
            searchCont: '',
            homeSel: [
                { id: 0, integral: "我要兑换", homeSelShow: true },
                { id: 1, integral: "0~50", homeSelShow: true },
                { id: 2, integral: "50~200", homeSelShow: true },
                { id: 3, integral: "200~1000", homeSelShow: true },
                { id: 4, integral: "1000~2000", homeSelShow: true },
                { id: 5, integral: "1000~2000", homeSelShow: true },
                { id: 6, integral: "0~50", homeSelShow: true },
                { id: 7, integral: "50~200", homeSelShow: true },
                { id: 8, integral: "200~1000", homeSelShow: true },
                { id: 9, integral: "1000~2000", homeSelShow: true },
                { id: 10, integral: "1000~2000", homeSelShow: true },
                { id: 11, integral: "1000~2000", homeSelShow: true },
            ],
            iSelectAct: '',
            intervalFlag: false
        };
    },
    mounted() {

    },
    methods: {
        intervalCli() {
            this.intervalFlag = !this.intervalFlag;
        },
        iSelect(index) {
            this.iSelectAct = index
        }
    },
    components: {
        "head-search": headSearch
    }

}
</script>
<style lang="less">
.goodsList {
    .home-smWrap {
        // position: absolute;
        // top: 0;
        // z-index: 1;
        // display: flex;
        // justify-content: space-between;
        padding: 0.5rem 0 0 0;
        width: 100%; // align-items: center;
        background: #fff;
        position: fixed;
        z-index: 2;
        .goodsList-order {
            display: flex;
            justify-content: space-around;
            li {
                display: flex;
                align-items: center;
                padding: 0.5rem 0 0.18rem 0;
                p {
                    display: inline-block;
                }
                .gl-orderBg {
                    width: 0.22rem;
                    height: 0.26rem;
                    background-position: -0.63rem -1.27rem;
                }
            }
        }
    }
}


.goodList-interWrap {
    height: 100%;
    width: 100%;
    background: #fff;
    overflow: auto;
    padding-top:2.22rem; 
    .home-iGoodsW {
        float: left;
        width: 50%;
        padding: 0 0.32rem;
        box-sizing: border-box;
        margin: 0.2rem 0;
        .home-iGoods {
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #e6e6e6;
            height: 3.16rem;
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
}


.home-iSelectW {
    color: #333333;
    font-size: 0.2rem;
    overflow: auto;
    display: flex;
    justify-content: space-around;
    padding-bottom: 0.15rem;
    .home-iSelect {
        width: 6.90rem;
        li {
            width: 19%;
            height: 0.58rem;
            line-height: 0.58rem;
            text-align: center;
            float: left;
            margin: 0.3rem 0 0 1%;
            padding: 3px 0;
            border-radius: 2rem;
        }
    }
    .home-iMore {
        width: 5.4%;
        height: 0.58rem;
        display: inline-block;
        border: 1px solid #dfdfdf;
        border-radius: 1rem;
        text-align: center;
        margin-top: 3px;
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
        background: #efefef;
        color: #000;
    }
    .iSelectCla {
        color: #fff;
        background: #30ce84;
        border: none;
    }
}
</style>