<template>
  <div class="hotGood">
    <div><span class="iconBg headIcon"></span><span class="iconBg allbuy"></span></div>
    <ul>
      <li v-for="(item,index) in list" :key="index" >
        <router-link :to="`/goodsDetail/${item.id}`" style="display:inline-block">
          <img :src="item.picUrl" alt="good"/>
          <p class="name">{{item.name}}</p>
          <p class="money"><span class="iconBg iconLogo"></span>{{item.currentPrice|toDecimal2}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '@/service/api'
  export default {
    data:()=>({
      list:[]
    }),
    mounted() {
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
                        this.list = data.data.goodsList;
                        if(this.list.length>4){
                          this.list=this.list.splice(0,4)
                        }
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
<style lang="scss">
.hotGood{
    width: 6.9rem;
    border-radius: 0.2rem;
    background: #fff;
    box-shadow: 0px 0px 8px 6px #FFF3EB;
    margin:0.12rem auto 0.6rem auto;
    .headIcon{
      width: 4.74rem;
      height: 0.62rem;
      background-image: url('/static/images/superMark/hot-bg.png');
      border-radius: 0.2rem 0 0 0;
    }
    .allbuy{
      width: 1.97rem;
      height: 0.27rem;
      background-image: url('/static/images/superMark/allbuy.png');
    }
    ul{
      padding: 0.33rem 0.03rem 0.4rem 0.03rem;
    box-sizing: border-box;
      li{
        width: 23%;
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        font-size: 0.22rem;
        color: #333333;
        margin: 1%;
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
             margin: 0 5px 0 -5px;
          }
        }
        .name{
          justify-content: center;
          display: flex;
          align-items: center;
          margin: 0.24rem 0 0.2rem 0;
          &::before{
            width: 0.1rem;
            height: 0.1rem;
            background: #ff8873;
            border-radius: 50%;
            content: '';
            display: inline-block;
            margin: 0 5px 0 -5px;
          }
        }
        .iconLogo{
          width: 0.24rem;
          height: 0.24rem;
          background-image: url('/static/images/logo/jd.png')
        }
      }
    }
}
</style>
