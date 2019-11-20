<template>
  <div class="wy-channel">
   <ul>
      <li v-for="(item,index) in list" :key="index" @click="jumpPath(item.path)">
        <p class="iconBg iconNorms" :style="`background-image:url('${item.img}');display:block;`"></p>
        {{item.name}}
      </li>
    </ul>
    <channel-hot :keyId="`b1c6120a70524fbf9869b51561e3b5d8`" :keyName="`WangYiYanXuan`"></channel-hot>
    <swiper-bana :keyBana="`d8b84db11f754d3d86177a77c699d560`" :keyName="`WangYiYanXuan`"></swiper-bana>
    <new-goods :keyId="`ab65568c3ee14ffdb3c795fe3ba2cdd8`" :keyName="`WangYiYanXuan`"></new-goods>
  </div>
</template>
<script>
export default {
  data:()=>({
    list:[
      {name:'居家生活',path:'家居',img:'/static/images/channel/wy-1-1.png'},
      {name:'数码家电',path:'数码家电',img:'/static/images/channel/wy-1-2.png'},
      {name:'服饰鞋包',path:'男装',img:'/static/images/channel/wy-1-3.png'},
      {name:'母婴亲子',path:'婴儿',img:'/static/images/channel/wy-1-4.png'}
    ]
  }),
  methods:{
    jumpPath(id){
      let uPattern =  /^\d+$/;
      if(!uPattern.test(id)){
        this.$router.push({path:`/goodsList?keyWord=${id}&vendorId=WangYiYanXuan`});
      }else{
        this.$router.push({path:`/goodsList?classfyId=${id}&vendorId=WangYiYanXuan`});
      }
    }
  },
   components:{
     channelHot:()=>import ('./components/cannelHot'),
     swiperBana:()=>import ('./components/swiperBana'),
     newGoods:()=>import ('./components/newGoods'),
     integral: ()=>import ('./components/integral'),
  }
}
</script>


<style lang="scss" scoped>
.wy-channel{
  padding: 0 0.13rem;
    ul{
      margin:0.5rem 0 0.74rem 0;
      li{
        text-align: center;
        width: 25%;
        display: inline-block;
        font-size: 0.22rem;
        color: #333333;
        // margin-b:0.01rem 0 0.74rem 0;
      }
    }
  .iconNorms{
    width: 1.33rem;
    height: 1.33rem;
    margin: 0 auto;
    margin-bottom: 0.18rem;
    display: block;
    position: relative;
  }
}
</style>
