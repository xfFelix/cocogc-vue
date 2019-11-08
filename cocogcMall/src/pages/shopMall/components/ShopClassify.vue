<template>
  <div class="classify">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="jumpPath(item.path)">
          <p class="iconBg iconNorms" :style="`background-image:url('${item.img}');display:block;`">
            <span class="iconBg iconSpecial" v-if="item.flagImg" :style="`background-image:url('${item.flagImg}')`"></span>
          </p>
          {{item.name}}
        </li>
      </ul>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data:()=>({
    list:[
      {name:'京东商城',img:'/static/images/superMark/jingdong.png',flagImg:'',path:'channel?typeId=1'},
      {name:'小椰超市',img:'/static/images/logo/superMark.png',flagImg:'',path:'channel?typeId=2'},
      {name:'网易严选',img:'/static/images/superMark/wangyi.png',flagImg:'',path:'channel?typeId=3'},
      {name:'天涯严选',img:'/static/images/superMark/tianya.png',flagImg:'',path:'classfyId=118608'},
      {name:'手机通讯',img:'/static/images/superMark/community.png',flagImg:'',path:'quickItem=9987'},
      {name:'3C数码',img:'/static/images/superMark/3c.png',flagImg:'',path:'quickItem=652'},
      {name:'家用电器',img:'/static/images/superMark/appliances.png',flagImg:'/static/images/superMark/new.png',path:'quickItem=737'},
      {name:'美妆护肤',img:'/static/images/superMark/makeup.png',flagImg:'/static/images/superMark/hot.png',path:'quickItem=1316'},
    ]
  }),
  methods:{
     ...mapActions({
        setTypeId: 'channel/setTypeId'
    }),
    jumpPath(way){
      if(way.includes('quickItem')||way.includes('classfyId')){
        this.$router.push({path:`/goodsList?${way}`})
      }else if(way.includes('channel')){
        this.$router.push({path:`/layout/channel`});
        let queryId = way.split('?')[1].split('=')[1];
        this.setTypeId(queryId);
      }
    }
  }
}
</script>
<style lang="scss">
.classify{
  background: #fff;
  padding-top: 0.28rem;
  ul{
    li{
      text-align: center;
      width: 25%;
      display: inline-block;
      font-size: 0.22rem;
      color: #333333;
      margin-bottom: 0.28rem;
    }
  }
}

.iconNorms{
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
  margin-bottom: 0.18rem;
  display: block;
  position: relative;
}
.iconSpecial{
   width: 0.38rem;
  height: 0.22rem;
  position: absolute;
  right: -0.1rem;
}

</style>
