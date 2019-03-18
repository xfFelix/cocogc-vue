<template>
    <div class="home-quickW">
        <div class="home-quick">

            <div class="swiper-container">
                <!-- 页面 -->
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in quickList" :key="index">
                        <router-link :to="quickItem.path" class="home-quickA" v-for="(quickItem,quickIndex) in item" :key="quickIndex">
                            <p class="navImg home-qImg" :class="quickItem.imgBg">
                                <!-- <span class="home-qIde">HOT</span> -->
                            </p>
                            <p class="home-qName">{{quickItem.name}}</p>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>

        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    data() {
        return {
            quickList: [
                [
                    { name: "精彩活动", path: '/aa', imgBg: 'home-qImg01' },
                    { name: "团购预售", path: '/aa', imgBg: 'home-qImg02' },
                    { name: "一元购", path: '/aa', imgBg: 'home-qImg03' },
                    { name: "日用超市", path: '/aa', imgBg: 'home-qImg04' },
                ],
                [
                    { name: "手机数码", path: '/aa', imgBg: 'home-qImg05' },
                    { name: "家用电器", path: '/aa', imgBg: 'home-qImg06' },
                    { name: "美妆护肤", path: '/aa', imgBg: 'home-qImg07' },

                ]
            ]
        }
    },
    mounted() {
        /*
          快捷通道 
        */
        var swiperQuick = new Swiper('.home-quick .swiper-container', {
            // autoplay: {
            //   delay: 1000,
            //   stopOnLastSlide: false,
            //   disableOnInteraction: false,
            // },
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    methods: {

    }

}
</script>
<style lang="less" scoped>
.home-quickW {

    width: 100%;
    padding: 0.35rem 0.25rem 0 0.25rem;
    box-sizing: border-box; // height: 3.88rem;
    box-shadow: 0 4.5px 10px 0px #e1ebff;
    background: #fff;
    .home-quick {
        overflow: auto;
        font-size: 0.24rem;
        color: #333;
        .home-quickA {
            display: block;
            float: left;
            width: 25%;
            text-align: center;
            margin-top: 0.5rem;
            .home-qImg {
                width: 0.5rem;
                height: 0.5rem;
                position: relative;

                .home-qIde {
                    position: absolute;
                    font-size: 0.14rem;
                    background: #f63132;
                    color: #fff;
                    border-radius: 40px;
                    top: -0.12rem;
                    right: -0.3rem;
                    padding: 0.05rem 0.1rem 0.03rem 0.1rem;
                    -webkit-transform: scale(0.8);
                }
            }
            .home-qImg01 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg02 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg03 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg04 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg05 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg06 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qImg07 {
                background-position: -0.09rem -0.09rem;
            }
            .home-qName {
                margin-top: 0.16rem;
            }
        }
    }
}
</style>
