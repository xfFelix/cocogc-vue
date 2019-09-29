<template>
  <div class="wrapper" v-if="show">
    <div class="banner">
      <img :src="data.data[0].src" alt="" class="link" @click="goLinkUrl">
    </div>
    <div class="show-dialog">
      <img :src="`/static/images/home/check${checked ? '-active': ''}.png`" alt="" class="checkbox" @click="toggleChecked">
      <span class="text">不再提示</span>
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
    },
    data: '',
  },
  computed: {
    showBanner: {
      get() {
        return this.$store.getters['shopMall/getShowBanner']
      },
      set(val) {
        let time = this.expireTime
        this.$store.dispatch('shopMall/setShowBanner', {expireTime: time, val})
      }
    }
  },
  data: () => ({
    checked: false,
    expireTime: 0
  }),
  methods: {
    toggleChecked() {
      this.checked = !this.checked
      if (this.checked) {
        this.expireTime = Date.parse(new Date((this.data.title).trim()))
        this.showBanner = !this.showBanner
        this.$emit('click', false)
      }
    },
    goLinkUrl() {
      window.location.href = this.data.data[0].url
    },
    onClose() {
      this.show = false
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
  .show-dialog{
    width: px2rem(255);
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .checkbox{
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 3px;
    }
    .text{
      font-size: 14px;
      color: #fff;
    }
  }
  .close{
    margin: -16px auto;
    width: px2rem(40);
    height: px2rem(40);
  }
}
</style>
