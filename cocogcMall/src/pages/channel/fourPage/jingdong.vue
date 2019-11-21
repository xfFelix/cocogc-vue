<template>
  <div class="jd-channel">

   <ul class="category">
      <li v-for="(item,index) in list" :key="index" @click="jumpPath(item.path)">
        <p class="iconBg iconNorms" :style="`background-image:url('${item.img}');display:block;`"></p>
        {{item.name}}
      </li>
    </ul>

    <ul class="category-o" v-if="otherList.length>0">
      <li v-for="(item,index) in otherList" :key="index" @click="jumpPath(item.url)">
        <!-- <p class="cate-name">{{item.name}}</p>
        <p class="cate-detail" :class="`cate-detail-${index}`">{{item.title}}</p> -->
        <img :src="item.src" :alt="item.name" />
      </li>
    </ul>

    <channel-hot :keyId="`e2a913cee8b84c97a9a9801375a6a1f7`" :keyName="`jingDong`"></channel-hot>
    <swiper-bana :keyBana="`a10a220f9aa94dc49c960c77cd783d11`" :keyName="`jingDong`"></swiper-bana>
    <new-goods :keyId="`3dc231152e7a4e51b0f67481de86c3af`" :keyName="`jingDong`"></new-goods>
    <!-- <integral :keyName="`JingDong`"></integral> -->

  </div>
</template>
<script>
import api from '@/service/api'
export default {
  data:()=>({
    list:[
      {name:'京东数码',path:'831',img:'/static/images/channel/jd-1-1.png'},
      {name:'京东家电',path:'737',img:'/static/images/channel/jd-1-2.png'},
      {name:'京东服饰',path:'1315',img:'/static/images/channel/jd-1-3.png'},
      {name:'京东手机',path:'9987',img:'/static/images/channel/jd-1-4.png'},
      {name:'京东美妆',path:'1316',img:'/static/images/channel/jd-1-5.png'},
      {name:'京东母婴',path:'1319',img:'/static/images/channel/jd-1-6.png'},
      {name:'京东家居',path:'12353',img:'/static/images/channel/jd-1-7.png'},
      {name:'京东食品',path:'1320',img:'/static/images/channel/jd-1-8.png'},
      {name:'京东生鲜',path:'12218',img:'/static/images/channel/jd-1-9.png'},
      {name:'京东珠宝',path:'6144',img:'/static/images/channel/jd-1-10.png'}
    ],
    otherList:[]
  }),
  methods:{
    jumpPath(url){
      if(url.indexOf('http')!=-1){
        window.location.href = `${url}&vendorId=jingDong`;
      }else{
        this.$router.push({path:`/goodsList?quickItem=${url}&vendorId=jingDong`});
      }
    },
    rank(){
            let _this = this;
            this.axios(testUrl + api.goodsGroups, {
                "id": '25ccbfda88bc4c86a8cbf5236e7b0b41'
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      let res = data.data.data;
                      this.otherList = res.splice(0,4);
                    } else {
                      this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    this.Toast(err.message);
                })
        },
  },
  mounted(){
    this.rank()
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
.jd-channel{
  padding: 0 0.13rem;
  .category{
    margin-top: 0.5rem;
    li{
      text-align: center;
      width: 20%;
      display: inline-block;
      font-size: 0.25rem;
      color: #4a4242;
      margin:0.01rem 0 0.43rem 0;
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
  .category-o{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.9rem;
    margin:0 auto 0.4rem auto;
    li{
      width: 23%;
      text-align: center;
      box-shadow: -3px 2px 20px 4px rgba(231, 230, 230, 0.46);
      border-radius: 0.2rem;
      height: 2.64rem;
    }
    // .cate-name{
    //   color: #4a4242;
    //   font-size: 0.22rem;
    //   margin: 0.24rem 0 0.06rem 0;

    // }
    // .cate-detail{
    //   font-size: 12px;
    //   transform: scale(0.8);
    //   width: 100%;
    //   display: inline-block;
    //   white-space: nowrap;
    // }
    // .cate-detail-0{
    //    color: #2543d8;
    // }
    // .cate-detail-1{
    //    color: #0cbd70;
    // }
    // .cate-detail-2{
    //   color: #e23131;
    // }
    // .cate-detail-3{
    //   color: #b42de6;
    // }
    img{
      // margin: 0.15rem auto 0.25rem auto;
      height: auto;
      width: 100%;
      border-radius: 0.2rem;
    }
  }
}
</style>
