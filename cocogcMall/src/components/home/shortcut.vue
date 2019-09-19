<template>
    <div class="home-quickW">
        <div class="home-quick">

            <div class="swiper-container">
                <!-- 页面 -->
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in quickList" :key="index">
                        <!-- <router-link :to="{path: quickItem.path, query: {id: quickItem.id}}" class="home-quickA" v-for="(quickItem,quickIndex) in item" :key="quickIndex">
                                    <p class="navImg home-qImg" :class="quickItem.imgBg">
                                    </p>
                                    <p class="home-qName">{{quickItem.name}}</p>
                                </router-link> -->

                        <div class="home-quickA" v-for="(quickItem,quickIndex) in item" :key="quickIndex" @click="jumpPage(quickItem)">
                            <p class="navImg home-qImg" :class="quickItem.imgBg">
                            </p>
                            <p class="home-qName">{{quickItem.name}}</p>
                        </div>

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
                    { name: "天涯严选", imgBg: 'home-qImg01', id: '18608' },
                    { name: "手机数码", imgBg: 'home-qImg02', id: '9987' },
                    { name: "家用电器", imgBg: 'home-qImg03', id: '737' },
                    { name: "美妆护肤", imgBg: 'home-qImg04', id: '1316' },
                ],
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
        jumpPage(quickItem){
            if(quickItem.id=='18608'){
                return false;
            }
            this.$router.push({path:'/goodsList',query:{quickItem:quickItem.id}})
        }
    }

}
</script>
<style lang="scss" scoped>
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
                width: 0.6rem;
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
                width: 0.6rem;
                background-position: -0.07rem -0.09rem;
            }
            .home-qImg02 {
                width: 0.35rem;
                background-position: -0.77rem -0.09rem;
            }
            .home-qImg03 {
                width: 0.42rem;
                background-position: -1.21rem -0.09rem;
            }
            .home-qImg04 {
                width: 0.5rem;
                background-position: -1.74rem -0.09rem;
            }

            .home-qName {
                margin-top: 0.16rem;
            }
        }
    }
}
</style>
