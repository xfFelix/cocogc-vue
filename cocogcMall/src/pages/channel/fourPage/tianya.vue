<template>
  <div class="ty-channel">
   <ul>
      <li v-for="(item,index) in list" :key="index" @click="jumpPath(item.path)">
        <p class="iconBg iconNorms" :style="`background-image:url('${item.img}');display:block;`"></p>
        {{item.name}}
      </li>
    </ul>

    <channel-hot :keyId="`261806d02f3b4ceb84623725cd071c00`" :keyName="`TianYaYanXuan`"></channel-hot>
    <swiper-bana :keyBana="`55a06180684b4cee8486e40a2226fadf`" :keyName="`TianYaYanXuan`"></swiper-bana>
    <new-goods :keyId="`2b661783d683441b966f446cd98ebf9b`" :keyName="`TianYaYanXuan`"></new-goods>
  </div>
</template>
<script>
export default {
  data:()=>({
    list:[
      {name:'热带水果',path:18591,img:'/static/images/channel/ty-1-1.png'},
      {name:'海鲜干货',path:'采小海',img:'/static/images/channel/ty-1-2.png'},
      {name:'农副产品',path:'原切腌制',img:'/static/images/channel/ty-1-3.png'},
      {name:'特色饮品',path:'椰青',img:'/static/images/channel/ty-1-4.png'}
    ]
  }),
  methods:{
    jumpPath(id){
      let uPattern =  /^\d+$/;
      if(!uPattern.test(id)){
        this.$router.push({path:`/goodsList?keyWord=${id}&vendorId=TianYaYanXuan`});
      }else{
        this.$router.push({path:`/goodsList?classfyId=${id}&vendorId=TianYaYanXuan`});
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
.ty-channel{
  padding: 0 0.13rem;
    ul{
       margin:0.5rem 0 0.74rem 0;
      li{
        text-align: center;
        width: 25%;
        display: inline-block;
        font-size: 0.22rem;
        color: #333333;
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
