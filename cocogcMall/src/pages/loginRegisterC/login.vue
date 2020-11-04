<template>
  <div class="loginW">
    <div class="login-header">
      <img class="logo" src="/static/images/logo/logo.png" alt="">
      <p class="title">欢迎来到椰子竞技积分</p>
      <p class="sub-title">COCONUT  SPORTS  POINTS</p>
    </div>
    <div class="login-main">
      <div class="login-sms" v-if="smsFlag">
        <div class="sms-input">
          <div class="icon-phone"></div>
          <div class="area-num" @click="pickerShow">
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
          <div v-if="formMsg.userName" class="icon-close" @click="formMsg.userName=''"></div>
        </div>
        <p class="sms-tips">未注册手机验证后即可完成注册</p>
        <button class="sms-btn" :disabled="disabled" @click="showSmsDialog">获取验证码</button>
        <p class="switch" @click="changeSmsFlag">密码登录</p>
      </div>
      <div class="login-pw" v-if="!smsFlag">
        <div class="sms-input">
          <div class="icon-phone"></div>
          <div class="area-num" @click="pickerShow">
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
          <div v-if="formMsg.userName" class="icon-close" @click="formMsg.userName=''"></div>
        </div>
        <div class="pw-input">
          <div class="icon-pw"></div>
          <input v-if="pwOpen" type="text" class="inp-pw" @click="inputClick($event)" v-model="formMsg.passWord"  placeholder="请输入密码"/>
          <input v-if="!pwOpen" type="password" class="inp-pw" @click="inputClick($event)" v-model="formMsg.passWord" placeholder="请输入密码"/>
          <div class="icon-eye" :class="[pwOpen?'icon-eye-open':'']" @click="changePW"></div>
          <div v-if="formMsg.passWord" class="icon-close" @click="formMsg.passWord=''"></div>
        </div>
        <button class="login-btn" :disabled="disabledPw" @click="login">登录</button>
        <div class="switchW">
          <p class="switch" @click="changeSmsFlag">短信登录</p>
          <p class="forget-pw" @click="toPassSetUp">忘记密码？</p>
        </div>

      </div>
    </div>
    <div class="login-footer" >
      <div class="title">
        <p class="line"></p>
        <p class="text">还没有账号？</p>
        <p class="line"></p>
      </div>
      <div class="register-btnW">
        <button class="register-btn" @click="toRegister">注册</button>
      </div>
      <div class="protocolW" :class="[smsFlag?'':'protocolW-pw']">
        <p>为保障您的个人隐私权益，请在注册/登录前认真阅读</p>
        <p><span @click="$router.push('/serviceProtocol')">《用户服务协议》</span>和<span @click="$router.push('/privateProtocol')">《隐私政策》</span></p>
      </div>
    </div>
    <sms-dialog :show.sync="smsDialogShow" v-if="smsDialogShow" @handle-sms-dialog="smsClose" @get-sms-validate="getValidate" ref="smsDialogDom" ></sms-dialog>
    <exists-dialog :show.sync="existsDialogShow" @handle-exists-dialog="existsClose"></exists-dialog>
    <sms-page :show.sync="smsPageShow" v-if="smsPageShow" @handle-sms-close="smsPageClose" :userName="formMsg.userName" @get-sms-failText='getFailText' :failText="failText" @get-sms-code='getCode' @get-other-code="getOtherCode"></sms-page>
    <registerPageThird :show.sync="registerPageThirdShow" @handle-get-password="getPassword"></registerPageThird>
  </div>
</template>
<script>
import api from "@/service/api";
import { IsEmpty, CheckPass, setToken, IsChinaMobile, IsHKMobile } from "@/util/common";
export default {
  data: ()=>({
    smsFlag: true,
    telList: [
      {
        telRealVal: 86,
        telShowValLeft: '+ 86',
        telShowValRight: '中国'
      },
      {
        telRealVal: 852,
        telShowValLeft: '+ 852',
        telShowValRight: '香港'
      }
    ],
    value: 86,
    formMsg: {
      userName: '',
      passWord: '',
      smsValid: '',
      imgValid: '',
    },
    disabled: true,
    disabledPw: true,
    pwOpen:false,
    smsDialogShow: false,
    existsDialogShow: false,
    smsPageShow: false,
    areaShow: false,
    registerPageThirdShow:false,
    failText: '',
    token: ''
  }),
  watch: {
    'formMsg.userName': {
        handler: function(val) {
          if(val) {
            if( this.value == 86 && IsChinaMobile(val)) {
              this.disabled = false
            }else if (this.value == 852 && IsHKMobile(val)){
              this.disabled = false
            } else {
              this.disabled = true
              this.disabledPw = true
            }
          }else {
            this.disabled = true
            this.disabledPw = true
          }
        }
     },
     'formMsg.passWord': {
        handler: function(val) {
          if(val && !this.disabled) {
            this.disabledPw = false
          }else {
            this.disabledPw = true
          }
        }
     }
  },
  methods:{
    inputClick(e) {
      e.target.focus();
    },
    changePW() {
      this.pwOpen = !this.pwOpen
    },
    smsClose(val) {
      this.smsDialogShow = val
    },
    existsClose(val) {
      this.existsDialogShow = val
      this.smsPageShow = val
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
      if(!this.smsFlag) {
        if(!this.disabled && this.formMsg.passWord) {
          this.disabledPw = false
        }else {
          this.disabledPw = true
        }
      }
      setTimeout(()=>{
        dom.style.background = '#ffffff'
        this.areaShow = false
        this.value = e
      },200)
    },
    changeSmsFlag() {
      this.smsFlag = !this.smsFlag
    },
    smsPageClose(val) {
      this.smsPageShow = val
    },
    toRegister() {
      this.$router.push('/register')
    },
    showSmsDialog() {
      // this.$refs.smsDialogDom.clearValidate()
      this.smsDialogShow = true
    },
    getValidate(val) {
      this.formMsg.imgValid = val
      this.getSmsCode()
    },
    getFailText(val) {
      this.failText = val
    },
    getOtherCode() {
      this.formMsg.imgValid=""
      this.getSmsCode()
    },
    // 获取短信验证码
    getSmsCode() {
      let _this = this;
            this.axios(infoURl + api.sms, {
                mobile: _this.formMsg.userName,
                captcha:_this.formMsg.imgValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      this.smsDialogShow = false
                      this.smsPageShow = true
                    } else if(data.error_code==1) {
                      // this.Toast(data.message);
                      this.$refs.smsDialogDom.ValidateImgError()
                    }else if(data.error_code==3) {
                      this.Toast(data.message);
                      this.$refs.smsDialogDom.clearValidate()
                      this.smsDialogShow = false
                    }else {
                      this.Toast(data.message);
                    }
                })
                .catch((data) => {
                    this.Toast(data.message);
                })
    },
    getCode(val) {
      this.formMsg.smsValid = val
      this.login()
    },
    getPassword(val) {
      this.formMsg.passWord = val
      this.regist()
    },
    login() {
      let _this = this;
            this.axios(infoURl + api.login, {
                mobile: _this.formMsg.userName,
                passwd: _this.formMsg.passWord,
                verify_code: _this.formMsg.smsValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.token = data.data.token;
                        setToken(this.token);
                        if (this.$route.query.redirect) {
                            this.$router.replace(this.$route.query.redirect)
                        } else {
                            this.$router.replace('/layout/home');
                        }
                    }else if (data.error_code == 1) {
                        if(this.smsFlag) {
                          this.failText = data.message
                        }
                      }else if(data.error_code == 2) {
                        // 密码错误
                        this.Toast('手机号或登录密码错误。')
                      }else if(data.error_code == 3) {
                        this.existsDialogShow = true
                      }else if(data.error_code == 4) {
                        // 未注册
                        // this.notDialogShow = true
                        this.token = data.data.token;
                        setToken(this.token);
                        this.registerPageThirdShow = true
                        // 跳转注册页设置密码
                      }else if(data.error_code == 5) {
                        // 黑名单
                        this.Toast('该账号已被冻结，请联系客服')
                        this.smsPageShow = false
                      }else {
                        this.Toast(data.message)
                        return;
                    }
                })
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
            setTimeout(()=>{
              _this.$router.replace('/layout/home');
            },3000)
          } else {
            _this.Toast(data.message)
          }
        })
    },
    toPassSetUp() {
      this.$router.push('/passSetUp')
    }
  },
  components: {
    smsDialog: () => import('./components/smsDialog'),
    existsDialog: () => import('./components/existsDialog'),
    smsPage: () => import('./components/smsPage'),
    registerPageThird: () => import('./components/registerPageThird'),
  }

}
</script>
<style lang="scss" scoped>
@import '~@/scss/color.scss';
@import '~@/scss/mixin.scss';
.loginW {
  min-height: 100vh;
  background: #ffffff;
  .login-header {
    // padding-top: 60px / 50 = 1.2rem;
    padding-top: 1.2rem;
    text-align: center;
    .logo {
      margin: 0 auto;
      width: 1.2rem;
      height: 1.2rem;
    }
    .title {
      margin-top: 0.36rem;
      font-size: 0.44rem;
      font-weight: bold;
      color: #444444;
      font-family: PingFangSC-Semibold;
    }
    .sub-title {
      margin-top: 0.1rem;
      font-size: 0.24rem;
      color: rgba($color: #2C2C2C, $alpha: 0.4);
    }
  }
  .login-main {
    .login-sms {
      margin-top: 1.2rem;
      padding: 0 0.52rem;
      .sms-input {
        position: relative;
        height: 0.84rem;
        display: flex;
        justify-content: start;
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
          // .picker-gray {
          //   background: #F5F5F5;
          // }
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
          margin-left: 0.28rem;
          width: 3.95rem;
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
      .sms-tips {
        margin-top: 0.16rem;
        font-size: 0.28rem;
        color: #AAAAAA;
      }
      .sms-btn {
        margin-top: 0.56rem;
        width: 100%;
        height: 0.88rem;
        border-radius: 0.2rem;
        border: none;
        background: $theme;
        color: #ffffff;
        font-size: 0.32rem;
      }
      .switch {
        margin-top: 0.4rem;
        color: #2C2C2C;
        font-size: 0.28rem;
      }
    }
    .login-pw {
      margin-top: 1.18rem;
      padding: 0 0.52rem;
      .sms-input {
        position: relative;
        height: 0.84rem;
        display: flex;
        justify-content: start;
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
          // .picker-gray {
          //   background: #F5F5F5;
          // }
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
          margin-left: 0.28rem;
          width: 3.95rem;
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
      .login-btn {
        margin-top: 0.56rem;
        width: 100%;
        height: 0.88rem;
        border-radius: 0.2rem;
        border: none;
        background: $theme;
        color: #ffffff;
        font-size: 0.32rem;
      }
      .switchW {
        display: flex;
        justify-content: space-between;
        margin-top: 0.4rem;
        color: #2C2C2C;
        font-size: 0.28rem;
      }
    }
  }
  .login-footer {
    margin-top: 0.64rem;
    .title {
      padding: 0 0.84rem;
      display: flex;
      align-items: center;
      text-align: center;
      .text {
        margin: 0 0.22rem;
        font-size: 0.24rem;
        color: #AAAAAA;
      }
      .line {
        width: 1.94rem;
        height: 1px;
        background: #F0F0F0;
      }
    }
    .register-btnW {
      margin-top: 0.4rem;
      text-align: center;
      .register-btn {
        margin: 0 auto;
        width: 6.46rem;
        height: 0.88rem;
        border: 1px solid $theme;
        box-sizing: border-box;
        border-radius: 0.2rem;
        color: $theme;
        font-size: 0.32rem;
        background: #ffffff;
      }
    }
    .protocolW {
      margin-top: 1.52rem;
      text-align: center;
      p {
        font-size: 0.24rem;
        color:#AAAAAA;
        line-height: 0.36rem;
        span {
          color: $theme;
        }
      }
    }
    .protocolW-pw {
      margin-top: 0.86rem;
    }
  }
}
</style>
