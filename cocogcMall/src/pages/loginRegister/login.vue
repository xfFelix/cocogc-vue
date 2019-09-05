<template>
    <div id="login">

        <head>
            <div class="headLogin">
                <span class="back" @click="goBack"></span>
                <router-link class="register" to="/register">
                    注册
                </router-link>
            </div>
        </head>

        <ul class="loginUl">
            <li>
                <div class="loginLileft" style="width:100%;">
                    <span class="telIcon"></span>
                    <div class="mobile-wrapper">
                        <select style="height:100%;border:none;background:#fff;appearance:none;" v-on:change="indexSelect($event)">
                            <option :value="item.telRealVal" v-for="(item,index) in telList" :key="index">{{item.telShowVal}}</option>
                        </select>
                        <img src="../../../static/images/select-down.png" style="width: 10px;height: 5px;" alt="">
                    </div>
                    <input type="tel" @blur="scrollTop()" placeholder="请输入注册手机号码" v-model.trim="formMsg.userName" @input="telInp($event)">
                </div>
                <div class="loginLiRight">
                    <span class="clean" @click="telClean()" v-if="clean.telCleanShow"></span>
                </div>
            </li>
            <li v-if="smsFlag===false">
                <div class="loginLileft">
                    <span class="passWordIcon"></span>
                    <input type="password" @blur="scrollTop()" placeholder="请输入密码" v-model.trim="formMsg.passWord" @input="passInp($event)" v-if="passInpShow == false">
                    <input type="text" @blur="scrollTop()" placeholder="请输入密码" v-model.trim="formMsg.passWord" @input="passInp($event)" v-if="passInpShow == true">
                </div>
                <div class="loginLiRight">
                    <span class="clean" @click="passClean()" v-if="clean.passCleanShow"></span>
                    <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
                    <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
                </div>
            </li>

            <li v-if="smsFlag">
                <div class="loginLileft" style="width:100%;justify-content: space-between;">
                    <div style="display: flex; width: 100%;align-items: center;height: 100%;">
                        <span class="vailIcon"></span>
                        <input @blur="scrollTop()" type="text" name="captcha" id="captcha" maxlength="4" placeholder="验证码" v-model.trim="formMsg.imgValid" @input="imgValidInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="imgValidClean()" v-if="clean.imgValidCleanShow"></span>
                        <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
                    </div>
                </div>
            </li>

              <li v-if="smsFlag">
                  <div class="loginLileft">
                      <span class="smsIcon"></span>
                      <input type="text" @blur="scrollTop()" placeholder="请输入短信验证码" v-model.trim="formMsg.smsValid" @input="smsValidInp($event)">
                  </div>
                  <div class="loginLiRight">
                      <span class="clean" @click="smsClean()" v-if="clean.smsCleanShow"></span>
                      <span class="validate" :class="sendSmsColor?'validateCan':'validateNo'" @click="validateCli()">{{validate}}</span>
                  </div>
              </li>
            </ul>

        <p class="bntWrap">
            <span class="bnt"  :class="loginBntColor?'canBnt':'noBnt'" @click="loginBnt()">登录</span>
        </p>

        <p class="forgetPass" v-if="smsFlag">
            <span @click="usePassWord()">使用密码登录</span>
        </p>
        <div class="code-hint" v-if="smsFlag===false">
            <span @click="smsFlag=true">使用短信登录</span>&nbsp;&nbsp;
            <span @click="forgerPass()">忘记密码？</span>
        </div>
    </div>
</template>


<script>
import api from "@/service/api";
import blurMix from '@/util/blurMix';
import loginMix from '@/util/loginMix';
import { IsEmpty, CheckPass, setToken, IsChinaMobile, IsHKMobile } from "@/util/common";

export default {
    data() {
        return {
            formMsg: {
                userName: '',
                passWord: '',
                smsValid: '',
                imgValid: '',
            },
            validate: "获取验证码",
            validateFlag: 1,
            smsFlag: true,
            validateImgSrc:''
        };
    },
    mixins: [blurMix,loginMix],
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
      loginBntColor:function(){
        let loginCloFlag = false;
        let smsCloFlag = false;
        let passCloFlag = false;
        let telCloFlag = false;
        let computedFalg = false;

        computedFalg = this.computFalg();
        if (!IsEmpty(this.formMsg.smsValid)) {
            smsCloFlag = true;
        }

        if (!IsEmpty(this.formMsg.userName)) {
            telCloFlag = true;
        }
        if (!IsEmpty(this.formMsg.passWord)) {
            passCloFlag = true;
        }

        if(!this.smsFlag){
          loginCloFlag = telCloFlag && passCloFlag;
        }else{
          loginCloFlag = computedFalg && smsCloFlag;
        }
        return loginCloFlag
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
        // 图片验证码
        validateImgClick: function() {
            this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
        },
        // 登录
        login: function() {
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
                    } else {
                        if (this.smsFlag === false) {
                            this.MessageBox.confirm('', {
                                message: '手机号或登录密码错误。',
                                title: '登录失败',
                                confirmButtonText: '忘记密码',
                                cancelButtonText: '重新输入'
                            }).then(action => {
                                this.$router.push('/passSetUp');
                            }).catch(action => {
                                this.formMsg.passWord = '';
                            })
                        } else {
                            this.MessageBox("提示", data.message)
                        }
                        return;
                    }
                })
        },
        goBack() {
            this.$router.back();
        },
        //登录按钮
        loginBnt: function() {
            if (IsEmpty(this.formMsg.userName)) {
                this.MessageBox("提示", "手机号码不能为空")
                return false;
            }
            if (this.telPlace == '86' && !IsChinaMobile(this.formMsg.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }
            if (this.telPlace == '852' && !IsHKMobile(this.formMsg.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }

            if (this.smsFlag === false) {
                if (IsEmpty(this.formMsg.passWord)){
                    this.MessageBox("提示", "请输入登录密码");
                    return false;
                }
                if (!CheckPass(this.formMsg.passWord)) {
                    this.MessageBox.confirm('', {
                        message: '手机号或登录密码输入错误。',
                        title: '登录失败',
                        confirmButtonText: '忘记密码',
                        cancelButtonText: '重新输入'
                    }).then(action => {
                        this.$router.push('/passSetUp');
                    }).catch(action => {
                        this.formMsg.passWord = '';
                    })
                    return false;
                }
                this.formMsg.smsValid = ''
            } else {
                if (IsEmpty(this.formMsg.imgValid)) {
                    this.MessageBox("提示", "请输入图片验证码");
                    return false;
                }
                if(this.formMsg.imgValid.length < 4){
                  this.MessageBox("提示", "图片验证码输入错误。")
                  return false;
                }
                if (IsEmpty(this.formMsg.smsValid)) {
                    this.MessageBox("提示", "请输入短信验证码")
                    return false;
                }
                this.formMsg.passWord = ''
            }
            this.login();
        },

        //弹出框按钮
        forgerPass: function() {
            this.$router.push('/passSetUp');
        },
        validateCli: function() {
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
            if (this.validateFlag == 1) {
                this.sms();
            }
        },

        // 短信验证码接口
        sms: function() {
            if (IsEmpty(this.formMsg.imgValid)) {
                this.MessageBox("提示", "请输入图片验证码。")
                return false;
            }
            if(this.formMsg.imgValid.length < 4){
              this.MessageBox("提示", "图片验证码输入错误。")
              return false;
            }
            let _this = this;
            this.axios(infoURl + api.sms, {
                mobile: _this.formMsg.userName,
                captcha:_this.formMsg.imgValid,
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.validateFlag = 0;
                        this.validate = "120s 重新获取";
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
                        MessageBox.alert(data.error_code==1?'图片验证码输入错误':data.message).then(action => {
                             this.validateImgClick();
                             this.formMsg.imgValid = '';
                        });
                    }
                })
                .catch((data) => {
                    this.MessageBox("提示", data.message)
                })
        },
        usePassWord() {
            this.smsFlag = false;
            this.formMsg.imgValid = '';
        }
    },
    beforeRouteLeave(to, from, next) {
        if (/\/setUp/.test(to.path)) {
            next({
                path: '/layout/home'
            })
            return
        }
        next()
    },
    mounted(){
      this.validateImgSrc=infoURl + 'user/captcha?' + (new Date())
    }
};
</script>


<style lang="scss" scoped>
.back {
    width: 0.22rem;
    height: 0.38rem;
    background-image: url(/static/images/jl.png);
    background-repeat: no-repeat;
    background-size: 5.8rem 1.86rem;
    background-position: -0.2rem -0.74rem;
    transform: rotate(180deg);
}

#login {
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
        .headLogin {
            padding: 0.44rem 0.5rem;
            font-size: 0.28rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .close {
                width: 0.7rem;
                height: 0.7rem;
                span {
                    width: 0.56rem;
                    height: 0.7rem;
                }
                span:first-of-type {
                    transform: rotate(45deg);
                    top: -12px;
                    left: 14px;
                }
            }
        }
    }
}

.register {
    line-height: 0.7rem;
    color: #333333;
    font-size: .34rem;
}

.loginUl {
    padding: 1.25rem .9rem 0;
    background: #fff;
    li {
        border-bottom: 1px solid #dfdfdf;
        height: 56px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .loginLileft {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            span {
                background-repeat: no-repeat;
                display: inline-block;
                background-size:100% 100%;
            }
            input {
                height: 100%;
                display: block;
                font-size: 16px;
                width: 100%;
                  flex: 1;
                padding-left: 15px;
            }
            .mobile-wrapper{
              position: relative;
              display: flex;
              align-items: center;
              height: 100%;
              margin-left: 16px;
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
        .loginLiRight {
            display: flex;
            align-items: center;

            .img_captcha{
                  width: 75px;
                height: 30px;
                margin-left: 8px;
            }
        }
    }
}

.bntWrap {
    background: #fff;
    padding-top: 0.8rem;
}

.forgetPass {
    text-align: center;
    font-size: 15px;
    color: #999999;
    margin: 0.5rem 0;
}
.code-hint{
  display: flex;
  justify-content: space-between;
  color: #999999;
  font-size: 15px;
  padding: 0 50px;
  margin: 0.5rem 0;
  span{
    white-space: nowrap;
  }
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



</style>

