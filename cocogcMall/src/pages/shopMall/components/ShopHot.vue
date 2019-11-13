<template>
    <div class="shopHot">
      <div><span class="iconBg headIcon"></span></div>
        <div class="home-rGoodsW">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in goodsList" :key="index">
                        <div class="home-hGoodsW">
                            <router-link :to="`/goodsDetail/${item.id}`" style="display:inline-block">
                                <img :src="item.picUrl" :alt="item.name"/>
                                <p class="name"><span class="nameBefore"></span>{{item.name}}</p>
                                <p class="money"><span class="iconBg iconLogo"></span>{{item.currentPrice|toDecimal2}}</p>
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
import api from '@/service/api'

export default {
    data() {
        return {
            goodsList: [],
        }
    },
    mounted() {
        this.rank()
    },
    methods: {
        rank: function() {
            let _this = this;
            this.axios(testUrl + api.goodsGroups, {
                "id": "52a518d7ea3d448588edaaec7b789e74"
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.goodsList = data.data.goodsList;
                        _this.$nextTick(function() {
                            _this.swiperRank = new Swiper('.shopHot .swiper-container', {
                                autoplay: _this.goodsList.length>4?true:false,
                                loop: _this.goodsList.length>4?true:false,
                                slidesPerView : 4,
                                freeMode: true,
                            });
                        })
                    } else {
                        this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    this.Toast(err.message);
                })
        },
    }
}
</script>
<style lang="scss" scoped>
.shopHot {
    overflow: hidden;
    width: 6.9rem;
    border-radius: 0.2rem;
    background: #fff;
    box-shadow: 0px 0px 8px 6px #FFF3EB;
    margin:0.12rem auto 0.6rem auto;
    .home-rGoodsW{
      padding: 0 2%;
      box-sizing: border-box;
    }
    .home-hGoodsW {
        padding: 0.33rem 0.03rem 0.4rem 0.03rem;
        box-sizing: border-box;
        width: 95%;
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        font-size: 0.22rem;
        color: #333333;
        margin: 1%;
        a{
          width: 100%;
        }
        img{
            border: 2px solid #fedccd;
            width: 100%;
            margin: 0 auto;
            padding: 2px;
            border-radius: 50%;
            box-sizing: border-box;
        }
        .money{
          font-weight: 700;
          justify-content: center;
          display: flex;
          align-items: center;
          span{
             margin: 0 3px 0 -0;
          }
        }
        .name{
            margin: 0.24rem 0 0.2rem 0;
            overflow: hidden;
            font-size:0.22rem;
            line-height:1.5em;
            height:3em;
            word-break:break-all;
            word-wrap:break-word;
          .nameBefore{
            width: 5px;
            height: 5px;
            background: #ff8873;
            border-radius: 50%;
            content: '';
            display: inline-block;
            margin-right: 3px;
          }
        }
        .iconLogo{
          width: 0.24rem;
          height: 0.24rem;
          background-image: url('/static/images/logo/jd.png');
          flex-shrink: 0;
        }
    }
    .headIcon{
      width: 6.9rem;
      height: 0.62rem;
      background-image: url('/static/images/superMark/hot-bg.png');
      border-radius: 0.2rem 0 0 0;
    }

}
</style>
