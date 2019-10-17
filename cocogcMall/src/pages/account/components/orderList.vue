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
  export default {
    data:()=>({
      serveList:[
        {bgImgClass:"/static/images/personal/gold.png",name:'黄金订单',path:`${hostUrl}ticket/gold/record`},
        {bgImgClass:"/static/images/personal/phone.png",name:'话费订单',path:`${hostUrl}ticket/phone/record`},
        {bgImgClass:"/static/images/personal/oil.png",name:'加油卡订单',path:`${hostUrl}ticket/oil/oilRecord`},
        {bgImgClass:"/static/images/personal/life.png",name:'生活缴费订单',path:`${hostUrl}ticket/life/record`},
        {bgImgClass:"/static/images/personal/vipCard.png",name:'会员订单',path:`${hostUrl}ticket/memberCard/cardRecord`},
        {bgImgClass:"/static/images/personal/travel.png",name:'海南旅游订单',path:`${hostUrl}ticket/order/list`},
        // {bgImgClass:"/static/images/personal/hotel.png",name:'机票酒店订单',path:`${hostUrl}ticket/gold`}
      ],
    }),
    methods:{
      serveJump(path){
        window.location.href = path;
      },
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
