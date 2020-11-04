<template>
  <div class="bg" v-if="show">
    <div class="dialogW">
      <div class="dialog">
        <div class="contentW">
          <p>该手机号已存在，是否继续登录操作？</p>
        </div>
        <div class="btnW">
          <div class="line" @click="Close">更换手机</div>
          <div class="black" @click="toLogin">直接登录</div>
        </div>
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
      this.$emit('handle-register-dialog',false)
    },
    toLogin() {
      this.$router.push('/login')
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
    top: 50%;
    left: 0;
    margin-top: -1.16rem;
    width: 100%;
    height: 2.36rem;
    padding: 0 0.88rem;
    box-sizing: border-box;
    .dialog {
      width: 100%;
      // height: 100%;
      border-radius: 0.2rem;
      background-color: #fff;
      box-sizing: border-box;
      .contentW {
        padding: 0.54rem 0.34rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2C2C2C;
        text-align: center;
        line-height: 0.44rem;
        border-bottom: 1px solid #F0F0F0;
        box-sizing: border-box;
      }
      .btnW {
        display: flex;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.28rem;
        color: #AAAAAA;
        letter-spacing: 1px;
        div {
          display: inline-block;
          flex: 1;
          text-align: center;
          box-sizing: border-box;
        }
        .line {
          border-right: 1px solid #F0F0F0;
        }
        .black {
          color: #2C2C2C;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
