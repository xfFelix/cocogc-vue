<template>
  <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
    <div id="register">

      <head>
        <div class="registHead" @click="$router.back(-1)">
          <span class="triangleUp"></span>
          <span class="triangleDown"></span>
        </div>
      </head>

        <ul class="loginUl">
          <li>
            <div class="loginLileft">
              <span class="telIcon"></span>
              <div class="select-wrap">
                <select class="select-index" v-on:change="indexSelect($event)">
                  <option :value="item.telRealVal" v-for="(item,index) in telList" :key="index">{{item.telShowVal}}</option>
                </select>
                <img src="../../../static/images/select-down.png" style="width: 10px;height:5px;margin:0 5px;" alt="">
              </div>
              <input @blur="scrollTop()"  @input="telInp($event)"  type="tel" placeholder="请输入手机号码" v-model.trim="formMsg.userName">
            </div>
            <div class="loginLiRight">
              <span class="clean" @click="telClean()" v-if="clean.telCleanShow"></span>
            </div>
          </li>
          <li>
            <div class="loginLileft" style="width:100%;justify-content: space-between;">
              <div style="display: flex; width: 100%;align-items: center;height:100%;">
                <span class="vailIcon"></span>
                <input @blur="scrollTop()" type="text" name="captcha" id="captcha" maxlength="4" placeholder="验证码" v-model.trim="formMsg.imgValid"  @input="imgValidInp($event)">
              </div>
            </div>
             <div class="loginLiRight">
                <span class="clean" @click="imgValidClean()" v-if="clean.imgValidCleanShow"></span>
                <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
              </div>
          </li>

          <li>
            <div class="loginLileft">
              <span class="smsIcon"></span>
              <input @blur="scrollTop()" type="text" placeholder="请输入验证码" v-model.trim="formMsg.smsValid" @input="smsValidInp($event)">
            </div>
            <div class="loginLiRight">
              <span class="clean" @click="smsClean()" v-if="clean.smsCleanShow"></span>
              <span class="validate" @click="validateCli()" :class="sendSmsColor?'validateCan':'validateNo'" >{{validate}}</span>
            </div>
          </li>
          <li>
            <div class="loginLileft" style="width:92%;">
              <span class="passWordIcon"></span>
              <input @blur="scrollTop()" type="password" placeholder="请设置6-20位数字+字母密码" v-model.trim="formMsg.passWord" v-if="passInpShow == false" style="width:86%;"  @input="passInp($event)">
              <input @blur="scrollTop()" type="text" placeholder="请设置6-20位数字+字母密码" v-model.trim="formMsg.passWord" v-if="passInpShow == true" style="width:86%;"  @input="passInp($event)">
            </div>
            <div class="loginLiRight">
              <span class="clean" @click="passClean()" v-if="clean.passCleanShow"></span>
              <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
              <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
            </div>
          </li>
        </ul>


      <div class="loginBntWrap">
        <span id="loginBnt" class="bnt"  @click="registerBnt()" :class="registBntColor?'canBnt':'noBnt'">注册</span>
      </div>
      <p class="forgetPass">
        <router-link to="/login">已有账号</router-link>
      </p>

    </div>
  </transition>
</template>


<script>
import api from "@/service/api";
import blurMix from '@/util/blurMix';
import loginMix from '@/util/loginMix';
import { IsEmpty, CheckPass, IsHKMobile, IsChinaMobile } from "@/util/common"

export default {
  mixins: [blurMix,loginMix],
  data() {
    return {
      validate: "获取验证码",
      validateFlag: 1,
      validateImgSrc: '',
      formMsg: {
        userName: '',
        imgValid: '',
        smsValid: '',
        passWord: ""
      },
    };
  },
    computed: {
      sendSmsColor:function(){
          let computedFalg = false;
          computedFalg = this.computFalg();
          if(this.validateFlag==0){
            return false
          }else{
            return computedFalg
          }
      },
      registBntColor:function(){
        let registCloFlag = false;
        let smsCloFlag = false;
        let passCloFlag = false;
        let computedFalg = false;

        computedFalg = this.computFalg();
        if (!IsEmpty(this.formMsg.smsValid)) {
            smsCloFlag = true;
        }
        if (!IsEmpty(this.formMsg.passWord)) {
            passCloFlag = true;
        }
        registCloFlag = computedFalg && smsCloFlag && passCloFlag;
        return registCloFlag
      }
    },
  methods: {
      computFalg:function(){
        let captchaColFlag = false;
        let telCloFlag = false;
        if (!IsEmpty(this.formMsg.userName)) {
            telCloFlag = true;
        }
        if (!IsEmpty(this.formMsg.imgValid)) {
          captchaColFlag = true;
        }
        return  telCloFlag && captchaColFlag
    },
    indexSelect(event) {
      this.telPlace = event.target.value;
    },
    /*
        注册接口
    */
    regist: function() {
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
            this.MessageBox("","注册成功，去登录").then(action => {
                this.$router.push('/login');
            })
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
        mobile: this.formMsg.userName,
        captcha: this.formMsg.imgValid,
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
                    this.formMsg.imgValid = ''
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

    /*
        注册按钮
    */
    registerBnt: function() {
      if (IsEmpty(this.formMsg.userName)) {
        this.MessageBox("提示", "手机号码不能为空")
        return false;
      }

      if (this.telPlace == '86' && !IsChinaMobile(this.formMsg.userName)) {
        this.MessageBox("提示", "手机号码输入错误");
        return false;
      }
      if (this.telPlace == '852' && !IsHKMobile(this.formMsg.userName)) {
        this.MessageBox("提示", "香港手机号码输入错误");
        return false;
      }
      if (IsEmpty(this.formMsg.imgValid)) {
        this.MessageBox("提示", "请输入图片验证码。")
        return false;
      }
      if (this.formMsg.imgValid.length < 4) {
        this.MessageBox("提示", "图片验证码输入错误。")
        return false;
      }
      if (IsEmpty(this.formMsg.smsValid)) {
        this.MessageBox("提示", "请输入短信验证码。")
        return false;
      }
      if (this.formMsg.smsValid.length < 4) {
        this.MessageBox("提示", "短信验证码输入错误")
        return false;
      }
      if (!CheckPass(this.formMsg.passWord)) {
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
      if (IsEmpty(this.formMsg.userName)) {
        this.MessageBox("提示", "手机号码不能为空")
        return false;
      }

      if (this.telPlace == '86' && !IsChinaMobile(this.formMsg.userName)) {
        this.MessageBox("提示", "手机号码输入错误");
        return false;
      }

      if (this.telPlace == '852' && !IsHKMobile(this.formMsg.userName)) {
        this.MessageBox("提示", "香港手机号码输入错误");
        return false;
      }
      if (IsEmpty(this.formMsg.imgValid)) {
        this.MessageBox("提示", "请输入图片验证码。")
        return false;
      }
      if (this.formMsg.imgValid.length < 4) {
        this.MessageBox("提示", "图片验证码输入错误")
        return false;
      }
      if (this.validateFlag == 1) {
        this.regsms();
      }
    },
  },
  mounted() {
    this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
  },
  components: {

  }
};
</script>


<style lang="scss" scoped>
#register {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    z-index: 2;
    background: #fff;
    right: 0;
    margin: 0 auto;
    max-width: 450px;
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
  margin-bottom: 0.8rem;
}

.loginUl li {
  border-bottom: 1px solid #dfdfdf;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#register .loginUl li{
  .loginLileft {
    width: 100%;
    height: 100%;
    span {
      background-repeat: no-repeat;
      display: inline-block;
      background-size:100% 100%;
    }
    .select-wrap{
      position:relative;
      display: flex;
      align-items: center;
      height: 100%;
      .select-index{
        border:none;
        background:#fff;
        height:100%;
        appearance: none;
        margin-left:16px;
      }
      &::after{
        height: 22px;
        width: 1px;
        margin-left: 10px;
        content: '';
        background: #E0E0E0;
        display: inline-block;
      }
    }
  }
}


.loginLileft {
  display: flex; // width: 60%;
  align-items: center;
}

.loginLileft input {
  height: 100%;
  font-size: 15px;
  width: 100%;
  padding-left: 15px;
  flex: 1;
}

.loginLiRight {
  display: flex;
}

#loginBnt {
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


.img_captcha {
  width: 75px;
  height: 30px;
  margin-left: 8px;
}

.validate {
    font-size: 13px;
    border-radius: 30px;
    line-height: 0.58rem;
    width: 1.8rem;
    text-align: center;
    margin-left: 8px;
}
.validateNo{
  border: #414141;
  color: #fff;
  background: #D3D3D3;
}
.validateCan{
  border: 1px solid #19ad6a;
  color: #19ad6a;
}

.loginLiRight {
  display: flex;
  align-items: center;
}
</style>

