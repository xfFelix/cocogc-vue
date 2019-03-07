<template>
    <div class="home-quickW">
        <div class="home-quick">

            <div class="swiper-container">
                <!-- 页面 -->
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="#" class="home-quickA">
                            <p class="home-qImg">
                                <span class="home-qIde">HOT</span>
                            </p>
                            <p class="home-qName">黄金兑换</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">话费兑换</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">信用卡还款</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">京东优选</p>
                        </a>

                    </div>
                    <div class="swiper-slide">
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">黄金兑换</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">话费兑换</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">信用卡还款</p>
                        </a>
                        <a href="#" class="home-quickA">
                            <p class="home-qImg"></p>
                            <p class="home-qName">京东优选</p>
                        </a>

                    </div>
                </div>
                <!-- 分页器 -->
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
                display: inline-block;
                background-image: url(/static/images/banner.png);
                background-repeat: no-repeat;
                background-position: -0.09rem -0.09rem;
                background-size: 4.82rem 1.97rem;
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
            .home-qName {
                margin-top: 0.16rem;
            }
        }


    }
}
</style>
