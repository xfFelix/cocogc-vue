<template>
  <div class="bg" v-if="show">
    <div class="exists-dialogW">
      <div class="exists-dialog">
        <div class="contentW">该手机号码已绑定商户账号，不可用于商城登录，请使用其他手机号码！</div>
        <button class="exists-btn" @click="existsClose">确定</button>
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
    existsClose() {
      this.$emit('handle-exists-dialog',false)
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
  .exists-dialogW {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -2.12rem;
    margin-left: -2.88rem;
    width: 5.76rem;
    height: 3.66rem;
    // padding: 0 0.88rem;
    box-sizing: border-box;
    .exists-dialog {
      width: 100%;
      height: 100%;
      padding: 0 0.52rem;
      padding-top: 0.6rem;
      border-radius: 0.2rem;
      background-color: #fff;
      box-sizing: border-box;
      .contentW {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2C2C2C;
        text-align: center;
        line-height: 0.44rem;
      }
      .exists-btn {
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
    }
  }
}
</style>
