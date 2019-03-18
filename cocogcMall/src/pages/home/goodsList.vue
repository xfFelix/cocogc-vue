<template>
    <div class="goodsList">
        <div class="home-smWrap">
            <head-search @searchChild='parentChild' v-bind:kewWordC="keyWord"></head-search>
            <ul class="goodsList-order one-bottom-px">
                <li>
                    <p @click="searchAll()">全部</p>
                </li>
                <li>
                    <div @click="goodsOrder()">
                        <p>销量</p>
                        <p class="j1Png gl-orderBg">
                            <span></span>
                            <span></span>
                        </p>
                    </div>
                </li>
                <li>
                    <div @click="goodsPrice()">
                        <p>价格</p>
                        <p class="j1Png gl-orderBg">
                            <span></span>
                            <span></span>
                        </p>
                    </div>

                </li>
                <li>
                    <p @click="intervalCli">积分区间</p>

                </li>
            </ul>

            <div class="home-iSelectW" v-if="intervalFlag">
                <ul class="home-iSelect">
                    <li v-for="(item,index) in homeSel" :key="index" v-if="item.homeSelShow" @click="iSelect(item,index)" :class="item.id==iSelectAct?'iSelectCla':'iSelectNo'">
                        {{item.integral}}
                    </li>
                </ul>
            </div>

        </div>

        <div class="goodList-interWrap">
            <div class="home-iGoodsW" v-for="(item,index) in goodsList" :key="index">
                <router-link :to="{path:'goodsDetail/'+item.id}">
                <div class="home-iGoods">
                    <img :src="item.image" alt="" />
                </div>
                <p class="home-iNmame">
                    {{item.name|wordSize(item.name)}}
                </p>
                <div class="home-iMoneyW">
                    <span class="home-iMoneyL"></span>
                    <span class="home-iMoney">{{item.currentPrice|toDecimal2(item.currentPrice)}}</span>
                </div>
                </router-link>
            </div>
        </div>
        <div id="moreMsg" @click="moreMsg()" v-show="moreShow">
            <div class="loading-box tc">
                <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
                <span class="loading-more-txt"> 点击加载更多...</span>
            </div>
        </div>
        <div v-show="moreShow==false">
            已经到底了噢~~
        </div>


    </div>
</template>
<script>
import headSearch from "../../common/headSearch.vue";
// import Loading from "../../common/loading.vue";

import api from '../../service/api';

export default {
    data() {
        return {
            observer: null,
            searchCont: '',
            homeSel: [

                { id: 0, integral: "0~50", homeSelShow: true },
                { id: 1, integral: "51~200", homeSelShow: true },
                { id: 2, integral: "201~500", homeSelShow: true },
                { id: 3, integral: "501~1000", homeSelShow: true },
                { id: 4, integral: "1001~2000", homeSelShow: true },
            ],
            iSelectAct: '',
            intervalFlag: false,
            goodsList: [],
            pages: 1, //页数
            pages_size: 10, //每页显示页数
            offsetRows: 1, //页数开始

            price: '', //判断点击的积分区间
            moreShow: false,
            price: '', //价格区间
            brandId: '', //分类id
            keyWord: '',//关键字
            priceRange: '', //判断价格的高低
            priceRangeFlag: true,  //判断价格的高低
            salesVolume:"" //销量排序
        };
    },
    mounted() {
        //观察是否到了底部
        this.observer = new IntersectionObserver(
            function(entries) {
                // 如果不可见，就返回
                if (entries[0].intersectionRatio <= 0) return;
                // loadItems(10);  //可见做的事
                var avtive = $('#moreMsg').attr('data-active')
                if (avtive !== 'false') {
                    $('#moreMsg').click();
                }
            });
        // 开始观察
        this.observer.observe(
            document.querySelector('#moreMsg')
        );

        this.urlParams()
    },
    methods: {
        //搜索框
        parentChild(val) {
            this.keyWord = val;
            this.goodsList = [];
            this.brandId = ''
            this.goodsListSearch(1)
        },
        //加载更多
        moreMsg() {
            this.pages += 1;
            this.offsetRows = 1 + 10 * (this.pages - 1);
            this.goodsListSearch(this.offsetRows)
        },
        //价格顺序
        goodsPrice() {
            if (this.priceRangeFlag == true) {
                this.priceRange = 'asc'
                this.priceRangeFlag = false;
            } else {
                this.priceRange = 'desc'
                this.priceRangeFlag = true;
            }
            this.pages = 1;
            this.offsetRows = 1;
            this.goodsList = [];
            this.price = "";
            this.salesVolume = "";

            this.goodsListSearch(1)
        },

        //判断积分区间
        intervalCli() {
            this.intervalFlag = !this.intervalFlag;
        },
        iSelect(item, index) {
            this.pages = 1;
            this.offsetRows = 1;
            this.goodsList = [];
            this.priceRange = "";
            this.salesVolume = "";

            this.iSelectAct = index; //改变积分颜色
            this.intervalFlag = false;

            this.price = item.integral;
            this.goodsListSearch(1)

        },

        //所有
        searchAll() {
            this.pages = 1;
            this.offsetRows = 1;
            this.goodsList = [];
            this.price = "";
            this.priceRange = "";
            this.salesVolume="";
            this.goodsListSearch(1);
        },

        //销量排序
        goodsOrder(){
            this.pages = 1;
            this.offsetRows = 1;
            this.goodsList = [];
            this.price = "";
            this.priceRange = "";
            this.salesVolume = "y";
            this.goodsListSearch(1);
        },

        //判断url参数
        urlParams() {
            this.price = this.$route.query.integra;
            this.brandId = this.$route.query.classfyId;
            this.keyWord = this.$route.query.keyWord;

            if (this.$route.query.integra == undefined) {
                this.price = ""
            }
            if (this.$route.query.classfyId == undefined) {
                this.brandId = ""
            }
            if (this.$route.query.keyWord == undefined) {
                this.keyWord = ""
            }
            this.goodsListSearch(this.offsetRows)
        },

        goodsListSearch(offsetRows) {
            let _this = this;
            this.axios(jdTestUrl + api.keyword, {
                "categoryId": _this.brandId,
                "keyWord": _this.keyWord,
                "offset": offsetRows,
                "price": _this.price.replace('~', '-'),
                "priceRange": _this.priceRange,
                "rows": 10,
                "salesVolume": _this.salesVolume,
                "timeSort": "",
            }, 'post')
                .then((data) => {
                    if (data.code == 0) {
                        if (data.list.length > 0) {
                            _this.goodsList = _this.goodsList.concat(data.list);

                            _this.moreShow = true


                        } else {
                            _this.moreShow = false
                        }
                    } else {

                    }
                })
                .catch((err) => {


                })
        }
    },
    components: {
        "head-search": headSearch,
        // "v-loading": Loading,
    }

}
</script>
<style lang="less">
.goodsList {
    height: 100%;
    .home-smWrap {
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
    padding-top: 2.22rem;
    .home-iGoodsW {
        float: left;
        width: 50%;
        padding: 0 0.32rem;
        box-sizing: border-box;
        margin: 0.2rem 0;
        height: 4.1rem;

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
            width: 100%; // height: 0.75rem;
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

#moreMsg {
    height: 0.8rem;
    background: #fff;
    .loading-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>