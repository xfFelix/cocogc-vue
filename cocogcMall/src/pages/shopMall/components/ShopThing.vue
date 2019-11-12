<template>
  <div class="goodThing">
    <p class="goodThing-title">好物精选<span>BEST</span></p>
    <ul>
      <li v-for="(item,index) in thingList" :key="index" @click="jumpPath(item)" :style="index==0?'background: #fff3f5;text-align:left':'background: #fff;'">
        <img :src='`/static/images/superMark/thing-${index+1}.png`'/>
        <p class="title" :class="`thing-${index+1}`">{{item.title}}</p>
        <img :src="item.src" :class="`thing-img-${index+1}`" class="thing-img"/>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '@/service/api'
  export default {
    data:()=>({
      thingList:[]
    }),
    methods:{
        rank: function() {
          this.axios(testUrl + api.goodsGroups, {
              "id": "26eb5fd1044f47f380831e66988bc3c5"
          }, 'post')
              .then((data) => {
                  if (data.error_code == 0) {
                      this.thingList = data.data.data;
                  } else {
                      this.Toast(data.message);
                  }
              })
              .catch((err) => {
                  this.Toast(err.message);
              })
        },
        jumpPath(item){
            window.location.href=item.url;
        }
    },
    mounted(){
      this.rank()
    }
  }
</script>
<style lang='scss'>
.goodThing{
  ul{
    padding: 0 3%;
    li{
      width: 48%;
      height: 3.4rem;
      display: inline-block;
      box-shadow: 0px 0px 27px 0px rgba(180, 180, 180, 0.26);
      border-radius: 0.2rem;
      padding-top: 0.4rem;
      text-align: center;
      margin: 0 auto 2% auto;
      &:nth-of-type(2n+1){
        margin-right: 3%;
      }
      img{
        height: auto;
      }
      .title{
        display: inline-block;
        border-radius: 80px;
        font-size: 12px;
        color: #fff;
        padding: 0.06rem 0.3rem;
        transform: scale(0.9);
        margin-top: 3px;
      }
      .thing-1{
        background-image: linear-gradient(-90deg,  #fc5d31 0%,  #fd2f8b 100%), linear-gradient( #8e9198, #8e9198);
        margin-left: 0.1rem;
      }
      .thing-2{
        background-image: linear-gradient(266deg, #f48949 0%, #ff524a 100%), linear-gradient(	#8e9198,#8e9198);
      }
      .thing-3{
        background-image: linear-gradient(266deg, #f48949 0%, #ff524a 100%), linear-gradient( #8e9198, #8e9198);
      }
      .thing-4{
       	background-image: linear-gradient(213deg, #30ce84 0%, 	#2fc3ce 100%),	linear-gradient(#8e9198, #8e9198);
      }
      .thing-img{
        width: 1.9rem;
        margin: 0.05rem auto 0 auto;

      }
      .thing-img-1{
        float: right;
        margin: 5px 5px 0 0;
      }
    }
  }
  .goodThing-title{
    text-align: center;
    margin: 0.6rem 0 0.3rem 0;
    font-size: 0.32rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: #fe6701;
      font-weight: normal;
      display: inline-flex;
      align-items: center;
      &::before{
        content: '';
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        background: #9a9a99;
        display: inline-block;
        margin: 0 0.1rem 0 0.13rem;
      }
    }
  }
}
</style>
