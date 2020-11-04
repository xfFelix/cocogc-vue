<template>
  <div class="registerW">
    <div class="header">
      <span class="back" @click="goBack"></span>
    </div>
    <div class="titleW">
      <div class="dotW">
        <li class="item item-active"></li>
        <li class="item"></li>
        <li class="item"></li>
      </div>
      <p>请输入手机号 · <span>注册 1/3</span></p>
    </div>
    <div class="register-main">
      <div class="sms-input">
          <div class="icon-phone"></div>
          <div class="area-num"  @click="pickerShow">
            <span>+ {{value}}</span>
            <span class="icon-arrow"></span>
          </div>
          <div class="pickerW" :class="[areaShow?'':'pickerW-hide']">
            <li v-for="(item,index) in telList" :key="index" @click="changeArea(item.telRealVal,index)" :id="'pickerItem'+index">
              <span>{{item.telShowValLeft}}</span>
              <span>{{item.telShowValRight}}</span>
            </li>
          </div>
          <input type="tel" pattern="\d*" class="inp-phone" @click="inputClick($event)" v-model="formMsg.userName" maxlength="11" placeholder="请输入手机号码"/>
          <div class="icon-close" v-if="formMsg.userName" @click="formMsg.userName=''"></div>
        </div>
        <div class="register-btnW">
          <button class="register-btn" :disabled="disabled" @click="showSmsDialog">获取验证码</button>
        </div>
    </div>
    <div class="register-footer">
      <p>为保障您的个人隐私权益，请在注册/登录前认真阅读<span @click="$router.push('/serviceProtocol')">《用户服务协议》</span>和<span @click="$router.push('/privateProtocol')">《隐私政策》</span></p>
    </div>
    <sms-dialog :show.sync="smsDialogShow" v-if="smsDialogShow" @handle-sms-dialog="smsClose" @get-sms-validate="getValidate" ref="smsDialogDom"></sms-dialog>
    <!-- <sms-page :show="smsPageShow" @handle-sms-close="smsPageClose" :userName="formMsg.userName" @get-sms-failText='getFailText' :failText="failText" @get-sms-code='getCode'></sms-page> -->
    <register-dialog :show="registerDialogShow" v-if="registerDialogShow" @handle-register-dialog="registerClose"></register-dialog>
    <registerPageSecond :show="registerPageSecondShow" v-if="registerPageSecondShow" @get-other-code='getOtherCode' @handle-second-close="handleSecondClose" :userName="formMsg.userName" @get-sms-failText='getFailText' :failText="failText" @get-sms-code='getCode'></registerPageSecond>
    <registerPageThird :show="registerPageThirdShow" v-if="registerPageThirdShow" @handle-get-password="getPassword" @register-third-close="registerThirdClose"></registerPageThird>
  </div>
</template>
<script>
import api from "@/service/api";
import { IsEmpty, CheckPass, setToken, IsChinaMobile, IsHKMobile } from "@/util/common";
export default {
  data: ()=>({
    formMsg: {
        userName: '',
        imgValid: '',
        smsValid: '',
        passWord: ""
      },
    smsFlag: false,
    smsDialogShow: false,
    registerDialogShow:false,
    registerPageSecondShow: false,
    registerPageThirdShow: false,
    code:'',
    telList: [
      {
        telRealVal: 86,
        telShowValLeft: '+86',
        telShowValRight: '中国'
      },
      {
        telRealVal: 852,
        telShowValLeft: '+852',
        telShowValRight: '香港'
      }
    ],
    value: 86,
    areaShow: false,
    disabled: true,
    smsPageShow:false,
    failText:'',
    token: ''
  }),
  watch: {
    'formMsg.userName': {
        handler: function(val) {
          if(val) {
            if(this.value == 86 && IsChinaMobile(val)) {
              this.disabled = false
            }else if(this.value == 852 && IsHKMobile(val)){
              this.disabled = false
            }else {
              this.disabled = true
            }
          }else {
            this.disabled = true
          }
        }
     },
  },
  methods: {
    inputClick(e) {
      e.target.focus();
    },
    goBack() {
      this.$router.back();
    },
    pickerShow() {
      this.areaShow = !this.areaShow
    },
    changeArea(e,index) {
      let dom = document.getElementById('pickerItem'+index)
      dom.style.background = '#F1F1F1'
      if(e==86 && IsChinaMobile(this.formMsg.userName)) {
        this.disabled = false
      }else if(e==852 && IsHKMobile(this.formMsg.userName)) {
        this.disabled = false
      }else {
        this.disabled = true
      }
      setTimeout(()=>{
        dom.style.background = '#ffffff'
        this.areaShow = false
        this.value = e
      },200)
    },
    smsClose(val) {
      this.smsDialogShow = val
    },
    registerClose(val) {
      this.smsDialogShow = val
      this.registerDialogShow = val
    },
    getValidate(val) {
      this.formMsg.imgValid = val
      this.getSmsCode()
    },
    showSmsDialog() {
      this.smsDialogShow = true
    },
    getValidate(val) {
      this.formMsg.imgValid = val
      this.getSmsCode()
    },
    getFailText(val) {
      this.failText = val
    },
    smsPageClose(val) {
      this.smsPageShow = val
    },
    registerThirdClose(val) {
      this.registerPageThirdShow = false
      this.registerPageSecondShow = true
    },
    handleSecondClose(val) {
      this.registerPageSecondShow = val
    },
    // 获取注册短信验证码
    getSmsCode() {
      let _this = this;
            this.axios(infoURl + api.regsms, {
                mobile: _this.formMsg.userName,
                captcha:_this.formMsg.imgValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      this.smsDialogShow = false
                      this.registerPageSecondShow = true
                    } else if(data.error_code==2) {
                      this.smsDialogShow = false
                      this.$refs.smsDialogDom.clearValidate()
                      this.registerDialogShow = true
                    }else if(data.error_code==3) {
                      // 图形验证码错误
                      this.$refs.smsDialogDom.ValidateImgError()
                    }else {
                      this.Toast(data.message);
                    }
                })
                .catch((data) => {
                    this.Toast(data.message);
                })
    },
    getOtherCode() {
      this.getSmsCode()
    },
    getCode(val) {
      this.formMsg.smsValid = val
      this.getSmsValid()
    },
    getSmsValid() {
      let _this = this;
            this.axios(infoURl + api.validSms, {
                mobile: _this.formMsg.userName,
                verify_code:_this.formMsg.smsValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      this.registerPageSecondShow = false
                      this.registerPageThirdShow = true
                    }else {
                      this.failText = data.message
                      // this.Toast(data.message);
                    }
                })
                .catch((data) => {
                    this.Toast(data.message);
                })
    },
    getPassword(val) {
      this.formMsg.passWord = val
      this.regist()
    },
    regist() {
      let _this = this;
      this.axios(infoURl + api.register, {
        mobile: this.formMsg.userName,
        passwd: this.formMsg.passWord,
        confirm_passwd: this.formMsg.passWord,
        verify_code: this.formMsg.smsValid,
        captcha: this.formMsg.imgValid
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            _this.Toast("恭喜您，注册成功！")
            this.token = data.data.token;
            setToken(this.token);
            setTimeout(()=>{
              _this.$router.replace('/layout/home');
            },3000)
          } else {
            _this.Toast(data.message)
          }
        })
    },
   },
  components: {
    Code: () => import('@/components/Code'),
    smsDialog: () => import('./components/smsDialog'),
    registerDialog: () => import('./components/registerDialog'),
    registerPageSecond: () => import('./components/registerPageSecond'),
    registerPageThird: () => import('./components/registerPageThird'),
  }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/color.scss';
.registerW {
  position: relative;
  background: #ffffff;
  height: 100%;
  min-height: 100vh;
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
    padding: 0 0.52rem;
    padding-top: 1.08rem;
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
    p {
      margin-top: 0.3rem;
      font-size: 0.48rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #2C2C2C;
      letter-spacing: 1px;
      span {
        color: $theme;
      }
    }
  }
  .register-main {
    margin-top: 1.28rem;
    padding: 0 0.52rem;
    .sms-input {
      position: relative;
      height: 0.84rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #F0F0F0;
      .pickerW {
          position: absolute;
          top: 0.74rem;
          left: 0.56rem;
          background: #fff;
          border-radius: 0.1rem;
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
          li {
            padding: 0 0.16rem;
            width: 2.3rem;
            height: 0.68rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:first-child {
              border-top-left-radius: 0.1rem;
              border-top-right-radius: 0.1rem;
            }
            &:last-child {
              border-bottom-left-radius: 0.1rem;
              border-bottom-right-radius: 0.1rem;
            }
            span {
              font-size: 0.28rem;
              font-weight: bold;
              color: #2C2C2C;
              &:last-child {
                font-weight: 400;
              }
            }

          }
          .picker-gray {
            background: #F5F5F5;
          }
        }
        .pickerW-hide {
          display: none;
        }
      .icon-phone {
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(/static/images/logo/icon_phone.png);
        background-size: 100% 100%;
      }
      .area-num {
          margin-left: 0.32rem;
          width: 1.04rem;
          font-size: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            display: inline-block;
            height: 0.28rem;
            font-size: 0.28rem;
            color: #2C2C2C;
            font-weight: bold;
            // &:first-child {
            //   width: 0.7rem;
            // }
          }
          .icon-arrow {
            width: 0.28rem;
            height: 0.28rem;
            background-image: url(/static/images/logo/icon_down.png);
            background-size: 100% 100%;
          }
        }
      .inp-phone {
        margin-left: 0.32rem;
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
      .icon-close {
        display: inline-block;
        width: 0.28rem;
        height: 0.28rem;
        background-image: url(/static/images/logo/icon_close.png);
        background-size: 100% 100%;
      }
    }
    .register-btnW {
      margin-top: 0.9rem;
      .register-btn {
        width: 100%;
        height: 0.88rem;
        background: $theme;
        border-radius: 0.2rem;
        border: none;
        color: #ffffff;
        font-size: 0.32rem;
      }
    }
  }
  .register-footer {
    // position: absolute;
    // left: 0;
    // bottom: 0.32rem;
    margin-top: 5.74rem;
    padding: 0 0.94rem;
    text-align: center;
    p {
      font-size: 0.24rem;
      color: #AAAAAA;
      line-height: 0.36rem;
      span {
        color: $theme;
      }
    }
  }
}
</style>
