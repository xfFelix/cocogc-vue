<template>
  <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
    <div id="register">

      <head>
        <div class="registHead" @click="$router.back(-1)">
          <span class="triangleUp"></span>
          <span class="triangleDown"></span>
        </div>
      </head>

      <section>
        <ul class="loginUl">
          <li>
            <div class="loginLileft">
              <span></span>
              <div style="position:relative;display: flex;align-items: center;height: 100%;">
                <select style="border:none;background:#fff;height:100%;appearance: none;" v-on:change="indexSelect($event)">
                  <option :value="item.telRealVal" v-for="(item,index) in telList" :key="index">{{item.telShowVal}}</option>
                </select>
                <img src="../../../static/images/select-down.png" style="width: 10px;height:5px;" alt="">
              </div>
              <input @blur="scrollTop()" type="number" placeholder="请输入手机号码" v-model.trim="register.userName" style="width:60%">
            </div>
          </li>

          <li>
            <div class="loginLileft" style="width:100%;justify-content: space-between;">
              <div style="display: flex; width: 100%;align-items: center;height:100%;">
                <span></span>
                <input @blur="scrollTop()" type="text" name="captcha" id="captcha" maxlength="4" placeholder="验证码" v-model.trim="register.captcha">
              </div>
              <div>
                <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
              </div>
            </div>
          </li>

          <li>
            <div class="loginLileft">
              <span></span>
              <input @blur="scrollTop()" type="text" placeholder="请输入验证码" v-model.trim="register.msgValidate">
            </div>
            <div class="loginLiRight">
              <span class="validate" @click="validateCli()">{{validate}}</span>
            </div>
          </li>

          <li>
            <div class="loginLileft" style="width:92%;">
              <span></span>
              <input @blur="scrollTop()" type="password" placeholder="请设置6-20位数字+字母密码" v-model.trim="register.inputPass" v-if="passShow == false" style="width:86%;">
              <input @blur="scrollTop()" type="text" placeholder="请设置6-20位数字+字母密码" v-model.trim="register.inputPass" v-if="passShow == true" style="width:86%;">
            </div>
            <div class="loginLiRight">
              <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
              <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
            </div>
          </li>
        </ul>
      </section>

      <div class="loginBntWrap">
        <span id="loginBnt" @click="registerBnt()">注册</span>
      </div>
      <p class="forgetPass">
        <router-link to="/login">已有账号</router-link>
      </p>

    </div>
  </transition>
</template>


<script>
import api from "@/service/api";
import blurMix from '@/util/blurMix'
import { IsEmpty, IsMobile, CheckPass, IsHKMobile, IsChinaMobile } from "@/util/common"

export default {
  mixins: [blurMix],
  data() {
    return {
      eyeImgState: false,
      passShow: false,
      validate: "获取验证码",
      validateFlag: 1,
      validateImgSrc: '',
      register: {
        userName: '',
        captcha: '',
        msgValidate: '',
        inputPass: ""
      },
      telList: [
        {
          telRealVal: 86,
          telShowVal: '+86　中国',
        },
        {
          telRealVal: 852,
          telShowVal: '+852 香港',
        }
      ],
      telPlace: 86
    };
  },
  methods: {
    indexSelect(event) {
      this.telPlace = event.target.value;
    },
    /*
        注册接口
    */
    regist: function() {
      let _this = this;
      this.axios(infoURl + api.register, {
        mobile: this.register.userName,
        passwd: this.register.inputPass,
        confirm_passwd: this.register.inputPass,
        verify_code: this.register.msgValidate,
        captcha: this.register.captcha
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            this.$router.push('/login');
          } else {
            this.Toast(data.message)
          }
        })
    },
    /*
        短信验证码接口
    */
    regsms: function() {
      let _this = this;
      this.axios(infoURl + api.regsms, {
        mobile: this.register.userName,
        captcha: this.register.captcha,
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            this.validateFlag = 0;
            this.validate = "120s 重新获取"
            let _this = this;
            let timeInit = 120;
            let countDown = setInterval(function() {
              let i = 1;
              timeInit = timeInit - i;
              if (timeInit > 0) {
                _this.validate = timeInit + 's 重新获取'
              } else {
                _this.validate = "重新获取"
                _this.validateFlag = 1;
                clearInterval(countDown)
              }
            }, 1000)
          } else {
              MessageBox.alert(data.error_code==3?'图片验证码输入错误':data.message).then(action => {
                    this.validateImgClick();
                    this.register.captcha = ''
              });
          }
        })
        .catch((data) => {
          this.Toast(data.message)
        })
    },

    // 图片验证码
    validateImgClick: function() {
      this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
    },

    eyeImgClose: function() {
      this.eyeImgState = false;
      this.passShow = false;

    },
    eyeImgOpen: function() {
      this.eyeImgState = true;
      this.passShow = true;
    },

    /*
        注册按钮
    */
    registerBnt: function() {
      if (IsEmpty(this.register.userName)) {
        this.MessageBox("提示", "手机号码不能为空")
        return false;
      }

      if (this.telPlace == '86' && !IsChinaMobile(this.register.userName)) {
        this.MessageBox("提示", "手机号码输入错误");
        return false;
      }
      if (this.telPlace == '852' && !IsHKMobile(this.register.userName)) {
        this.MessageBox("提示", "香港手机号码输入错误");
        return false;
      }
      if (IsEmpty(this.register.captcha)) {
        this.MessageBox("提示", "请输入图片验证码。")
        return false;
      }
      if (this.register.captcha.length < 4) {
        this.MessageBox("提示", "图片验证码输入错误。")
        return false;
      }
      if (IsEmpty(this.register.msgValidate)) {
        this.MessageBox("提示", "请输入短信验证码。")
        return false;
      }
      if (this.register.msgValidate.length < 4) {
        this.MessageBox("提示", "短信验证码输入错误")
        return false;
      }
      if (!CheckPass(this.register.inputPass)) {
        this.MessageBox("提示", "请输入6-20位数字与字母的组合。")
        return false;
      }
      this.regist();
    },

    /*
      短信验证码按钮
    */
    validateCli: function() {
      var that = this;
      if (IsEmpty(this.register.userName)) {
        this.MessageBox("提示", "手机号码不能为空")
        return false;
      }

      if (this.telPlace == '86' && !IsChinaMobile(this.register.userName)) {
        this.MessageBox("提示", "手机号码输入错误");
        return false;
      }

      if (this.telPlace == '852' && !IsHKMobile(this.register.userName)) {
        this.MessageBox("提示", "香港手机号码输入错误");
        return false;
      }
      if (IsEmpty(this.register.captcha)) {
        this.MessageBox("提示", "请输入图片验证码。")
        return false;
      }
      if (this.register.captcha.length < 4) {
        this.MessageBox("提示", "图片验证码输入错误")
        return false;
      }
      if (this.validateFlag == 1) {
        this.regsms();
      }
    }
  },
  mounted() {
    this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
  },
  components: {

  }
};
</script>


<style lang="less">
#register {
  background: #fff; // position: absolute;
  // bottom: 0;
  // left: 0;
  width: 100%;
  height: 100%; // z-index: 2;
  position: relative;
  head {
    background: url(/static/images/regist.png) no-repeat;
    width: 100%;
    height: 3.5rem;
    display: block;
    background-size: 100% 100%;
  }
}


.registHead {
  position: absolute;
  left: 0.5rem;
  top: 0.7rem;
}

.headLogin {
  padding: 0.7rem 0.5rem;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.close {
  width: 35px;
  height: 35px;
}

.close span {
  width: 28px;
  height: 35px;
}

.close span:first-of-type {
  transform: rotate(45deg);
  top: -12px;
  left: 14px;
}

.close span:last-of-type {
  transform: rotate(-45deg);
  top: -12px;
  left: -11px;
}

.register {
  line-height: 0.7rem;
  color: #333333;
  font-size: 15px;
}

.loginUl {
  padding: 0.75rem 0.7rem 0;
  margin-bottom: 0.2rem;
}

.loginUl li {
  border-bottom: 1px solid #dfdfdf;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#register .loginUl li{
  .loginLileft {
    width: 100%;
    height: 100%;
    span {
      background-image: url(/static/images/login.png);
      background-repeat: no-repeat;
      width: 26px;
      height: 25px;
      display: inline-block;
      background-size: 172px 32px;
    }
  }
}



.loginUl li:nth-of-type(1) .loginLileft span {
  background-position: -79px -3px;
}

.loginUl li:nth-of-type(2) .loginLileft span {
  background-position: -133px -3px;
}

.loginUl li:nth-of-type(3) .loginLileft span {
  background-position: -106px -3px;
}

.loginUl li:nth-of-type(4) .loginLileft span {
  background-position: -52px -2px;
}

.loginUl li:last-of-type {
  border: none;
}

.loginLileft {
  display: flex; // width: 60%;
  align-items: center;
}

.loginLileft input {
  height: 100%;
  font-size: 15px;
  width: 80%;
  padding-left: 0.1rem;
}

.loginLiRight {
  display: flex;
}


.eyeImgClose,
.eyeImgOpen {
  background-image: url(/static/images/login.png);
  background-repeat: no-repeat;
  width: 23px;
  height: 23px;
  display: inline-block;
  background-size: 172px 32px;
}

.eyeImgClose {
  background-position: -1px -8px;
}

.eyeImgOpen {
  background-position: -27px -8px;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #cecece;
  font-size: 13px;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cecece;
  font-size: 13px;
  ;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cecece;
  font-size: 13px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #cecece;
  font-size: 13px;
}

#loginBnt {
  background: #19ad6a;
  color: #fff;
  line-height: 45px;
  width: 80%;
  margin: 0 auto;
  border-radius: 0.6rem;
  font-size: 18px;
  box-shadow: #d1efe1 4px 6px 15px 0px;
  display: block;
}

.loginBntWrap {
  text-align: center;
}

.forgetPass {
  text-align: center;
  font-size: 15px;
  color: #999999;
  margin: 0.5rem 0;
}

.forgetPass a {
  color: #999999;
}

.validate {
  font-size: 12px;
  border: 1px solid #19ad6a;
  border-radius: 30px;
  line-height: 20px;
  color: #19ad6a;
  height: 20px;
  width: 1.8rem;
  text-align: center;
}

.img_captcha {
  width: 75px;
  height: 30px;
  margin-top: 6px;
}
</style>

