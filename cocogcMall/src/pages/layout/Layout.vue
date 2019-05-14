<template>
    <div :style="classifyFlag?'height:100%;':''">
        <router-view class="content"></router-view>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Footer from '@/common/footer'
export default {
  components: {
    "v-footer": Footer,
  },
  data:()=>({
    classifyFlag:false
  }),
  mounted(){
    if(this.$route.path=='/layout/classify'){
        this.classifyFlag = true;
    }else{
        this.classifyFlag = false;
    }
  }
}
</script>

<style>
.content{
  padding-bottom: 50px;
  background: #eef1f6;
  height: 100%;
}
</style>
