<template>
    <div class="newGoods">
      <div class="title">新品推荐</div>
        <div class="home-rGoodsW" :class="keyName">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in goodsList" :key="index">
                        <div class="home-hGoodsW">
                            <router-link :to="`/goodsDetail/${item.id}`" style="display:inline-block">
                                <img :src="item.picUrl" :alt="item.name"/>
                                <p class="name"><span class="nameBefore"></span>{{item.name}}</p>
                                <p class="money">
                                  <span class="iconBg iconLogo"></span>
                                  <span class="current-price">{{item.currentPrice}}</span>
                                  <span class="last-price">{{item.marketPrice}}</span>
                                </p>
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
import {mapGetters} from 'vuex';
export default {
    props:{
      keyId:String,
      keyName:String
    },
    data:()=>({
       goodsList: [],
    }),
    computed: {
      ...mapGetters({
          channelName: 'channel/getTypeName'
      })
    },
    watch:{
      channelName:{
        handler:function(newName, oldName){
          if(newName == this.keyName){
            this.rank()
          }
        },
        immediate:true,
      },
    },
    methods: {
        rank: function() {
            let _this = this;
            this.axios(testUrl + api.goodsGroups, {
                "id": this.keyId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                       this.goodsList = data.data.goodsList;
                        _this.$nextTick(function() {
                            _this.swiperRank = new Swiper(`.newGoods .${this.keyName} .swiper-container`, {
                                autoplay: this.goodsList.length>4?true:false,
                                loop: this.goodsList.length>4?true:false,
                                slidesPerView : 4,
                                freeMode: true,
                                observer:true ,
                                observeParents:true,
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
.newGoods {
    overflow: hidden;
    width: 6.9rem;
    border-radius: 0.2rem;
    background: #fff;
    box-shadow: -3px 2px 20px 4px rgba(231, 230, 230, 0.46);
    margin:0.37rem auto 0.2rem auto;
    padding-bottom: 0.23rem;
    .title{
      font-size: 0.3rem;
      color: #000000;
      margin: 0.24rem 0 0.32rem 0.36rem;
      font-family: MicrosoftYaHei;
    }
    .swiper-slide{
      padding: 0 4px;
      box-sizing:border-box;
    }
    .home-rGoodsW{
      padding: 0 4%;
      box-sizing: border-box;
    }
    .home-hGoodsW {
        // padding: 0.33rem 0.03rem 0.4rem 0.03rem;
        box-sizing: border-box;
        width: 95%;
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        font-size: 0.22rem;
        color: #333333;
        margin: 1%;
        // border: 1px solid #000;
        a{
          width: 100%;
        }
        img{
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .money{
          // font-weight: 700;
          justify-content: center;
          display: flex;
          align-items: center;
          span{
             margin: 0 2px 0 -0;
              vertical-align: middle;
              display: inline-block;

          }
          .current-price{
            color: #d10c0c;
            font-size: 0.18rem;
          }
          .last-price{
            font-size: 0.18rem;
            transform: scale(0.8);
            text-decoration: line-through;
            color: #000000;
          }
          .iconLogo{
            width: 0.28rem;
            height: 0.28rem;
            background-image: url('/static/images/logo/logo-blacka.png');
            flex-shrink: 0;
          }
        }
        .name{
            margin: 0.11rem 0 0.13rem 0;
            overflow: hidden;
            font-size:0.22rem;
            line-height:1.5em;
            height:3em;
            word-break:break-all;
            word-wrap:break-word;
          .nameBefore{
            width: 5px;
            height: 5px;
            background: #d10c0c;
            border-radius: 50%;
            content: '';
            display: inline-block;
            margin-right: 3px;
          }
        }
    }
}
</style>
