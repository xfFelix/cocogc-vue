<template>
  <div class="bg" v-if="show">
    <div class="pageW">
      <div class="header">
        <span class="back" @click="goBack"></span>
      </div>
      <div class="titleW">
        <p class="title">第二步</p>
        <p class="sub-title">请填写需要设置的新密码(6-20位字母、数字的组合)</p>
      </div>
      <div class="mainW">
        <div class="pw-input">
          <div class="icon-pw"></div>
          <input v-if="pwOpen" type="text" class="inp-pw" @click="inputClick($event)" v-model="passWord"  placeholder="设置新密码"/>
          <input v-if="!pwOpen" type="password" class="inp-pw" @click="inputClick($event)" v-model="passWord" placeholder="设置新密码"/>
          <div class="icon-eye" :class="[pwOpen?'icon-eye-open':'']" @click="changePW"></div>
          <div v-if="passWord" class="icon-close" @click="passWord=''"></div>
        </div>
        <div class="pw-input">
          <div class="icon-cpw"></div>
          <input v-if="cpwOpen" type="text" class="inp-pw" @click="inputClick($event)" v-model="confirmPassWord"  placeholder="再次输入新密码"/>
          <input v-if="!cpwOpen" type="password" class="inp-pw" @click="inputClick($event)" v-model="confirmPassWord" placeholder="再次输入新密码"/>
          <div class="icon-eye" :class="[cpwOpen?'icon-eye-open':'']" @click="changeCPW"></div>
          <div v-if="confirmPassWord" class="icon-close" @click="confirmPassWord=''"></div>
        </div>
      </div>

      <div class="sms-btnW">
        <button class="sms-btn" @click="submit">完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import { IsEmpty, CheckPass } from "@/util/common";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data: ()=>({
    passWord: '',
    confirmPassWord: '',
    pwOpen: false,
    cpwOpen: false,
  }),
  methods: {
    goBack() {
      this.$emit('handle-close',false)
    },
    changePW() {
      this.pwOpen = !this.pwOpen
    },
    changeCPW() {
      this.cpwOpen = !this.cpwOpen
    },
    inputClick(e) {
      e.target.focus();
    },
    submit() {
      if (IsEmpty(this.passWord)) {
        this.Toast("密码不能为空")
        return false;
      }
      if (IsEmpty(this.confirmPassWord)) {
        this.Toast("确认密码不能为空")
        return false;
      }
      if (!CheckPass(this.passWord)) {
        this.Toast("密码请输入6-20位数字与字母的组合")
        return false;
      }
      if (this.passWord != this.confirmPassWord) {
        this.Toast("密码设置不一致")
        return false;
      }
      this.$emit('get-passWord',this.passWord)
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
  z-index: 3;
  background: #ffffff;
  .pageW {
    .header {
      padding: 0.2rem 0.32rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      .back {
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
        background: url(/static/images/logo/btn_back.png);
        background-size: 100% 100%;
      }
    }
    .titleW {
      padding: 0.88rem 0.52rem 0px;
      .title {
        margin-top: 0.9rem;
        font-size: 0.48rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #2C2C2C;
      }
      .sub-title {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #AAAAAA;
      }
    }
    .mainW {
      margin-top: 0.9rem;
      padding: 0 0.52rem;
      .pw-input {
        margin-top: 0.26rem;
        height: 0.84rem;
        display: flex;
        align-items: center;
        justify-content: start;
        border-bottom: 1px solid #F0F0F0;
        .icon-pw {
          margin-right: 0.32rem;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url(/static/images/logo/icon_mima.png);
          background-size: 100% 100%;
        }
        .icon-cpw {
          margin-right: 0.32rem;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url(/static/images/logo/icon_pw.png);
          background-size: 100% 100%;
        }
        .inp-pw {
          width: 3.9rem;
          font-size: 0.4rem;
          color: #2C2C2C;
          font-weight: bold;
          font-family: PingFangSC-Semibold;
          &::placeholder {
            font-size: 0.32rem;
            font-weight: 400;
            font-family: PingFangSC-Regular, PingFang SC;
          }
        }
        .icon-eye {
          display: inline-block;
          margin-left: 0.68rem;
          margin-right: 0.4rem;
          width: 0.28rem;
          height: 0.28rem;
          background-image: url(/static/images/logo/icon_eyes_close.png);
          background-size: 100% 100%;
        }
        .icon-eye-open {
          background-image: url(/static/images/logo/icon_eyes_open.png);
        }
        .icon-close {
          display: inline-block;
          width: 0.28rem;
          height: 0.28rem;
          background-image: url(/static/images/logo/icon_close.png);
          background-size: 100% 100%;
        }
      }
    }

    .sms-btnW {
      padding: 0 0.52rem;
      margin-top: 0.9rem;
      .sms-btn {
        width: 100%;
        height: 0.88rem;
        color: #ffffff;
        font-size: 0.32rem;
        background: $theme;
        border: none;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
