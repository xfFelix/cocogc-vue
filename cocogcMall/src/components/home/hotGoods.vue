<template>
    <div class="home-rank">
        <div class="home-rHM">
            <h3>热门爆款</h3>
            <span class="home-rMore" @click="$router.push('/goodsList')"></span>
        </div>
        <p class="home-hSE">BEST SELLERS EXPLOSIVE MONEY</p>
        <div class="home-rGoodsW">

            <div class="swiper-container">
                <div class="swiper-wrapper">

                    <div class="swiper-slide" v-for="(item,index) in goodsList" :key="index">
                        <div class="home-hGoodsW">
                            <router-link :to="{path:'goodsDetail/'+item.id}">
                                <div class="home-hGoods">
                                     <img :src="item.picUrl" alt="" /> 
                                      <!-- <img :src="item.picUrl" alt="" /> -->
                                    <span class="home-hSTags"></span>
                                </div>
                                <p class="home-boder"></p>
                                <p class="home-hSNmame">
                                    {{item.name}}
                                </p>
                                <div class="home-hSmoneyW">
                                    <span class="home-hSmoneyL"></span>
                                    <span class="home-hSmoney">{{item.marketPrice|toDecimal2(item.marketPrice)}}</span>
                                </div>
                            </router-link>

                        </div>

                    </div>



                </div>
            </div>

        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import api from '../../service/api'

export default {
    data() {
        return {
            goodsList: [],
        }
    },
    mounted() {
        // var swiperRank = new Swiper('.home-rank .swiper-container', {
        //     // autoplay: {
        //     //   delay: 1000,
        //     //   stopOnLastSlide: false,
        //     //   disableOnInteraction: false,
        //     // },
        //     // loop: true,
        //     slidesPerView: 'auto',
        //     slidesPerGroup: 4,
        //     spaceBetween: 20,
        //     // slidesOffsetAfter : 10,
        //     freeMode: true,
        // })
        this.rank()

    },
    methods: {
        rank: function() {
            let _this = this;
            this.axios(testUrl + api.goodsGroups, {
                "id": "e2a913cee8b84c97a9a9801375a6a1f7"
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.goodsList = data.data.goodsList;
                        console.log(data)
                        _this.$nextTick(function() {
                            _this.swiperRank = new Swiper('.home-rank .swiper-container', {
                                // autoplay: {
                                //   delay: 2000,
                                //   stopOnLastSlide: false,
                                //   disableOnInteraction: false,
                                // },
                                slidesPerView: 'auto',
                                slidesPerGroup: 4,
                                spaceBetween: 20,
                                // slidesOffsetAfter : 10,
                                freeMode: true,
                            });
                        })
                    } else {
                        this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    this.Toast(data.message);
                })
        },


    }

}
</script>
<style lang="less" scoped>
.home-rank {
    width: 100%;
    background: #fff;
    margin-top: 0.3rem;
    border-top: 1px solid transparent;
    overflow: hidden;
    .home-hGoodsW {
        width: 100%;
        font-size: 0.22rem;
        color: #333;
        .home-hGoods {
            // width: 2rem;
            width: 1.77rem;
            height: 1.77rem;
            // background: #f8f8f8;
            text-align: center;
            position: relative;
            img {
                width: 100%; // height: 100%;
            }
            .home-hSTags {
                width: 0.92rem;
                height: 0.32rem;
                display: inline-block;
                bottom: 0;
                left: 0;
                position: absolute;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-position: -3.67rem -0.26rem;
                background-size: 5.8rem 1.86rem;
            }
        }
    }
    .home-hSE {
        font-size: 0.24rem;
        color: #999999;
        margin: 0 0 0.49rem 0.35rem;
    }
    .home-rGoodsW {
        // width: 114%;
        .home-rGoods {
            width: 2rem;
            height: 2rem;
            background: #f8f8f8;
            text-align: center;
            img {
                width: 100%;
                margin-top: 0.16rem;
            }
        }
        .home-hSNmame {
            color: #333;
            text-align: center;
            font-weight: bold;
            font-size: 0.22rem;
            margin: 0.25rem 0 0.17rem;
        }
    }
    .home-hSmoneyW {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.4rem;
        .home-hSmoneyL {
            width: 0.28rem;
            height: 0.28rem;
            display: inline-block;
            background-image: url(/static/images/jl.png);
            background-repeat: no-repeat;
            background-position: -2.57rem -0.78rem;
            background-size: 5.8rem 1.86rem;
            margin-right: 0.03rem;
            margin-left: 0.01rem;
        }
        .home-hSmoney {}
    }
}
</style>
