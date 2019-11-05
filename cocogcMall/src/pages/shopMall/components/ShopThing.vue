<template>
  <div class="goodThing">
    <p>好物精选<span>BEST</span></p>
    <ul>
      <li v-for="(item,index) in thingList" :key="index">
        <img :src="item.imgPath" alt=""/>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data:()=>({
      thingList:[
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
        {name:'9块9包邮',imgPath:'/static/images/product_wine.png',jumpPath:'www.baidu.com'},
      ]
    })
  }
</script>
<style lang='scss'>
.goodThing{
  ul{
    padding: 0 0.2rem;
    li{
      width: 49%;
      display: inline-block;
      margin-bottom: 2%;
      &:nth-of-type(2n+1){
        margin-right: 2%;
      }

    }
  }
  p{
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
