<template>
  <div class="bg" v-if="show">
    <div class="sms-dialogW">
      <div class="sms-dialog">
        <div class="title">请输入图形验证码</div>
        <div class="photo-input">
           <input type="text" @click="inputClick($event)" v-model="validate" maxlength="4" placeholder="请输入"/>
           <div class="photoW" @click="changeValidateImg">
             <img :src="validateImgSrc" alt="">
           </div>
        </div>
        <p class="sms-tips">{{failText}}</p>
        <button class="sms-btn" @click="submit">确定</button>
        <div class="close" @click="smsClose"></div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/service/api";
import { IsEmpty } from "@/util/common";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: ()=>({
    validateImgSrc: '',
    validate: '',
    failText: ''
  }),
  methods: {
    inputClick(e) {
      e.target.focus();
    },
    smsClose() {
      this.$emit('handle-sms-dialog',false)
    },
    changeValidateImg() {
      this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
    },
    submit() {
      if (IsEmpty(this.validate)) {
        this.failText = '请输入图片验证码'
        return false;
      }
      if(this.validate.length < 4){
        this.failText = '图片验证码输入错误'
        return false;
      }
      this.$emit('get-sms-validate',this.validate)
    },
    // 输入图片验证码错误
    ValidateImgError() {
      this.changeValidateImg()
      this.failText = '图片验证码输入错误'
      this.validate = ''
    },
    clearValidate() {
      this.validate = ''
      this.failText = ''
    }
  },
  created() {
    this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
  },
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
  z-index: 4;
  background:rgba(0,0,0,0.8);
  .sms-dialogW {
    position: fixed;
    top: 50%;
    left: 0;
    margin-top: -2.12rem;
    width: 100%;
    height: 4.26rem;
    padding: 0 0.88rem;
    box-sizing: border-box;
    .sms-dialog {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 0.52rem;
      padding-top: 0.6rem;
      border-radius: 0.2rem;
      background-color: #fff;
      box-sizing: border-box;
      .title {
        font-size: 0.36rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #2C2C2C;
        text-align: center;
      }
      .photo-input {
        margin-top: 0.52rem;
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
        input {
          width: 2.8rem;
          font-size: 0.36rem;
          color: #2C2C2C;
          font-weight: bold;
          &::placeholder {
            font-size: 0.28rem;
            color:#AAAAAA;
            font-weight: 400;
          }
        }
        .photoW{
          width: 1.6rem;
          height: 0.64rem;
          background: #F0F0F0;
          border-radius: 0.1rem;
        }
      }
      .sms-tips {
        position: absolute;
        top: 2.48rem;
        left: 0.52rem;
        font-size: 0.24rem;
        color: #FF5200;
      }
      .sms-btn {
        margin-top: 0.52rem;
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
