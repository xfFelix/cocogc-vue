<template>
  <div class="yy-channel">
   <ul class="category">
      <li v-for="(item,index) in list" :key="index" @click="jumpPath(item.path)">
        <p class="iconBg iconNorms" :style="`background-image:url('${item.img}');display:block;`"></p>
        {{item.name}}
      </li>
    </ul>
    <channel-hot :keyId="`b11e9672f8e74b13bff096e7a0e1cbb9`" :keyName="`yeyun`"></channel-hot>
    <swiper-bana :keyBana="`5131440ef0c345cd87dc9208de6379f4`" :keyName="`yeyun`"></swiper-bana>
    <new-goods :keyId="`78c0a7d6181747d08228b29783690bdb`" :keyName="`yeyun`"></new-goods>
  </div>
</template>
<script>
export default {
  data:()=>({
    list:[
      {name:'品质好货',path:'',img:'/static/images/channel/xy-1-1.png'},
      {name:'手机数码',path:'',img:'/static/images/channel/xy-1-2.png'},
      {name:'酒果好礼',path:'',img:'/static/images/channel/xy-1-3.png'},
      {name:'美人坊',path:'',img:'/static/images/channel/xy-1-4.png'}
    ]
  }),
  methods:{
    jumpPath(id){
      this.$router.push({path:`/goodsList?quickItem=${id}`});
    }
  },
  components:{
    channelHot:()=>import ('./components/cannelHot'),
    swiperBana:()=>import ('./components/swiperBana'),
    newGoods:()=>import ('./components/newGoods'),
    integral: ()=>import ('@/components/home/integral'),
  }
}
</script>

<style lang="scss" scoped>
.yy-channel{
  padding: 0 0.13rem;
  .category{
    margin-top:0.5rem;
    li{
      text-align: center;
      width: 25%;
      display: inline-block;
      font-size: 0.25rem;
      color: #4a4242;
      margin:0.01rem 0 0.74rem 0;
    }
    .iconNorms{
      width: 1.33rem;
      height: 1.33rem;
      margin: 0 auto;
      margin-bottom: 0.04rem;
      display: block;
      position: relative;
    }
  }
}
</style>
