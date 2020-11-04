<template>
  <div class="bg" v-if="show">
    <div class="dialogW">
      <div class="dialog">
        <div class="content">
          <p>该手机号码未注册</p>
          <p>继续验证成功后即可完成注册</p>
        </div>
        <button class="btn">确定</button>
        <div class="close" @click="Close"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: ()=>({
  }),
  methods: {
    Close() {
      this.$emit('handle-not-dialog',false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/color.scss';
.bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 33;
  background:rgba(0,0,0,0.8);
  .dialogW {
    position: fixed;
    bottom: 0.12rem;
    left: 0;
    width: 100%;
    height: 3.24rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    .dialog {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 0.52rem;
      padding-top: 0.6rem;
      border-radius: 0.2rem;
      background-color: #fff;
      box-sizing: border-box;
      .content {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2C2C2C;
        text-align: center;
        line-height: 0.44rem;
      }
      .btn {
        margin-top: 0.4rem;
        width: 100%;
        height: 0.88rem;
        border-radius: 0.2rem;
        background: $theme;
        border: none;
        font-size: 0.32rem;
        color: #fff;
        letter-spacing: 1px;
      }
      .close {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        width: 0.28rem;
        height: 0.28rem;
        background-image: url(/static/images/logo/icon_close.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
