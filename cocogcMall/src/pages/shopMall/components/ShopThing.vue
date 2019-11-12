<template>
  <div class="goodThing">
    <p class="goodThing-title">好物精选<span>BEST</span></p>
    <ul>
      <li v-for="(item,index) in thingList" :key="index" @click="jumpPath(item)">
        <img :src='item.src'/>
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
      display: inline-block;
      box-shadow: 0px 0px 27px 0px rgba(180, 180, 180, 0.26);
      margin: 0 auto 2% auto;
      border-radius: 0.2rem;
      &:nth-of-type(2n+1){
        margin-right: 3%;
      }
      img{
        height: auto;
        border-radius: 0.2rem;
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
