<template>
  <div class="inquire">
    <ul>
      <li v-for="(item,index) in pageList" :key="index" @click="pageJump(item.path)">
        <span class="iconBg jumpIcon" :style="`background-image:url(${item.bgImgClass})`"></span>
        <p>{{item.name}} <span class="iconBg goIcon"></span></p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data:()=>({
      pageList:[
          {bgImgClass:"/static/images/logo/logo.png",name:'积分日志',path:`${hostUrl}ticket/integrallog`},
          {bgImgClass:"/static/images/personal/kami.png",name:'卡密充值',path:`${hostUrl}ticket/reCharge`},
        //  {bgImgClass:"/static/images/personal/collect.png",name:'我的收藏',path:`${hostUrl}ticket/gold`},
          {bgImgClass:"/static/images/personal/help.png",name:'帮助中心',path:'weixin'},
          {bgImgClass:"/static/images/personal/contact.png",name:'联系我们',path:`${hostUrl}ticket/contact`},
          {bgImgClass:"/static/images/personal/setUp.png",name:'设置',path:`/setUp`},
      ],
  }),
  methods:{
      pageJump(path){
        if(path.includes('setUp')){
          this.$router.push({path:'/setUp'})
        }else if(path.includes('weixin')){
          window.location.href = 'https://mp.weixin.qq.com/s/YjTWs8Ep1lpIYeSXJTH03Q';
        }else{
          window.location.href = path;
        }
      },
  }
}
</script>
<style lang='scss'>
.inquire{
  width: 92%;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  color: #333333;
  margin-bottom: 0.9rem;
  ul{
    li{
      display: flex;
      align-items: center;
      justify-content: start;
      height: 1.04rem;
      p{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        flex: 1;
        margin-left: 6px;
        border-bottom: 1px solid #F4F4F4;
        height: 100%;
      }
    }
  }
  .jumpIcon{
    width: 0.42rem;
    height: 0.42rem;
    margin-left:0.24rem;
  }
}
</style>
