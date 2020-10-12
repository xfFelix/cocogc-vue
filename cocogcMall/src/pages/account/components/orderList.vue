<template>
  <div class="acc-order">
    <p>兑换服务订单</p>
    <ul>
      <li v-for="(item,index) in serveList" :key="index" @click="serveJump(item.path)">
        <span class="iconBg serveIcon" :style="`background-image:url(${item.bgImgClass})`"></span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    data:()=>({
      serveList:[
        {bgImgClass:"/static/images/personal/gold.png",name:'黄金兑换',path:`${hostUrl}ticket/gold/record`},
        {bgImgClass:"/static/images/personal/phone.png",name:'话费充值',path:`${hostUrl}ticket/phone/record`},
        {bgImgClass:"/static/images/personal/oil.png",name:'加油卡充值',path:`${hostUrl}ticket/oil/oilRecord?go=cocogc`},
        {bgImgClass:"/static/images/personal/life.png",name:'生活缴费',path:`${hostUrl}ticket/life/record?go=cocogc`},
        {bgImgClass:"/static/images/personal/vipCard.png",name:'会员卡券',path:`${hostUrl}ticket/memberCard/cardRecord?go=cocogc`},
        // {bgImgClass:"/static/images/personal/travel.png",name:'海南旅游',path:`${hostUrl}ticket/order/list?go=cocogc`},
        // {bgImgClass:"/static/images/personal/hotel.png",name:'机票酒店订单',path:`${hostUrl}ticket/gold`}
      ],
    }),
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo',
            platform: 'platform/getPlatform',
            vendorId: 'platform/getVendorId',
        })
    },
    methods:{
      serveJump(path){
        window.location.href = path;
      },
    },
    created() {
      if(this.vendorId == '3839c796c9574b05a80c87f0adfb1f21') {
        this.serveList = [
          {bgImgClass:"/static/images/personal/phone.png",name:'话费充值',path:`${hostUrl}ticket/phone/record`},
          {bgImgClass:"/static/images/personal/oil.png",name:'加油卡充值',path:`${hostUrl}ticket/oil/oilRecord?go=cocogc`},
          {bgImgClass:"/static/images/personal/life.png",name:'生活缴费',path:`${hostUrl}ticket/life/record?go=cocogc`},
          {bgImgClass:"/static/images/personal/vipCard.png",name:'会员卡券',path:`${hostUrl}ticket/memberCard/cardRecord?go=cocogc`},
        ]
      }
    }
  }
</script>
<style lang="scss">

.acc-order{
  width: 92%;
  background: #fff;
  border-radius: 10px;
  margin: 0.2rem auto;
  padding: 0 0 0.16rem 0;
  font-size: 0.24rem;
  color: #666666;
  p{
    font-size: 0.28rem;
    color: #333333;
    font-weight: 700;
    padding: 0.4rem 0.3rem;
  }
  ul{
    li{
      margin-bottom: 0.28rem;
      text-align: center;
      width: 25%;
      display:inline-block;
    }
  }
  .serveIcon{
    width: 0.82rem;
    height: 0.82rem;
    display: block;
    margin: 0 auto 0.18rem auto;
  }
}
</style>
