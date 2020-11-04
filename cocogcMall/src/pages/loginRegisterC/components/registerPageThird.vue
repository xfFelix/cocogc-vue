<template>
  <div class="bg" v-if="show">
    <div class="pageW">
      <div class="header">
        <span class="back" @click="goBack"></span>
      </div>
      <div class="titleW">
        <div class="dotW">
          <li class="item"></li>
          <li class="item"></li>
          <li class="item item-active"></li>
        </div>
        <p class="title">请设置登录密码 · <span>注册 3/3</span></p>
        <p class="sub-title">密码为6-20位字母、数字的组合，不含空格</p>
      </div>
      <div class="numberW">
        <div class="pw-input">
          <div class="icon-pw"></div>
          <input v-if="pwOpen" type="tel" class="inp-pw" @click="inputClick($event)" v-model="password" placeholder="请输入密码"/>
          <input v-if="!pwOpen" type="password" class="inp-pw" @click="inputClick($event)" v-model="password" placeholder="请输入密码"/>
          <div class="icon-eye" :class="[pwOpen?'icon-eye-open':'']" @click="changePW"></div>
          <div v-if="password" class="icon-close" @click="password=''"></div>
        </div>
      </div>
      <div class="sms-btnW">
        <button class="sms-btn" @click="submit" >完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import { IsEmpty, CheckPass } from "@/util/common"
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    failText: {
      type: String,
      default: ''
    }
  },
  data: ()=>({
    password:'',
    pwOpen:false,
  }),
  methods: {
    goBack() {
      this.password = ''
      this.$emit('register-third-close',false)
    },
    inputClick(e) {
      e.target.focus();
    },
    changePW() {
      this.pwOpen = !this.pwOpen
    },
    submit() {
      if (IsEmpty(this.password)) {
          this.Toast("密码不能为空")
        }
      if (!CheckPass(this.password)) {
        this.Toast("密码请输入6-20位数字与字母的组合")
        return false;
      }
      this.$emit('handle-get-password',this.password)
    }
  },
  components: {
    Code: () => import('@/components/Code')
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
      .dotW {
        li {
          display: inline-block;
          margin-right: 0.06rem;
          width: 0.12rem;
          height: 0.12rem;
          background: #D8D8D8;
          border-radius: 50%;
        }
        .item-active {
          width: 0.48rem;
          height: 0.12rem;
          background: $theme;
          border-radius: 0.06rem;
        }
      }
      .title {
        margin-top: 0.4rem;
        font-size: 0.48rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #2C2C2C;
        span {
          color: $theme;
        }
      }
      .sub-title {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #AAAAAA;
      }
    }
    .numberW {
      padding: 0px 0.52rem;
      margin-top: 0.6rem;
      .pw-input {
        margin-top: 0.26rem;
        height: 0.84rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
        .icon-pw {
          margin-right: 0.32rem;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url(/static/images/logo/icon_pw.png);
          background-size: 100% 100%;
        }
        .inp-pw {
          width: 3.8rem;
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
