<template>
  <div class="wrapper" v-if="show">
    <div class="banner">
      <img :src="data.src" alt="" class="link" @click="goLinkUrl">
    </div>
    <img src="/static/images/home/close.png" alt="" class="close" @click="onClose">
  </div>
</template>
<script>
import api from '@/service/api'
export default {
  model: {
    prop: 'show',
    event: 'click'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    data: ''
  }),
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.getBanner()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getBanner() {
      try {
        const { data, error_code, message } = await this.axios(testUrl + api.goodsGroups, {id: "e284f81c03a5421e9f923b553ae0ae2b"}, 'post')
        this.data = data.data[0]
      } catch(e) {
        this.Toast(e)
      }
    },
    goLinkUrl() {
      this.$emit('click', false)
      window.location.href = this.data.url
    },
    onClose() {
      this.$emit('click', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../scss/mixin.scss';
.wrapper{
  position: fixed;
  z-index: 100;
  background: rgba(35,24,21,.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .banner{
    width: px2rem(255);
    height: px2rem(340);
    margin: px2rem(100) auto 0;
    .link{
      width: 100%;
      height: 100%;
    }
  }
  .close{
    margin: 20px auto;
    width: px2rem(40);
    height: px2rem(40);
  }
}
</style>
