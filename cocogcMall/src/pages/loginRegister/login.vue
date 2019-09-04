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

        <section>
            <ul class="loginUl">
                <li>
                    <div class="loginLileft" style="width:100%;">
                        <span class="loginIcon"></span>
                        <div class="mobile-wrapper">
                            <select style="height:100%;border:none;background:#fff;appearance:none;" v-on:change="indexSelect($event)">
                                <option :value="item.telRealVal" v-for="(item,index) in telList" :key="index">{{item.telShowVal}}</option>
                            </select>
                            <img src="../../../static/images/select-down.png" style="width: 10px;height: 5px;" alt="">
                        </div>
                        <input type="number" @blur="scrollTop()" placeholder="请输入注册手机号码" v-model.trim="loginForm.userName" @input="phoneInp($event)" style="width:60%;">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="phoneClean()" v-if="phoneCleanShow"></span>
                    </div>
                </li>
                <li v-if="smsFlag===false">
                    <div class="loginLileft">
                        <span class="passWordIcon"></span>
                        <input type="password" @blur="scrollTop()" placeholder="请输入密码" v-model.trim="loginForm.passWord" @input="passInp($event)" v-if="passShow == false">
                        <input type="text" @blur="scrollTop()" placeholder="请输入密码" v-model.trim="loginForm.passWord" @input="passInp($event)" v-if="passShow == true">
                    </div>

                    <div class="loginLiRight">
                        <span class="clean" @click="passwordClean()" v-if="passCleanShow"></span>
                        <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
                        <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
                    </div>
                </li>

                <li v-if="smsFlag">
                    <div class="loginLileft" style="width:100%;justify-content: space-between;">
                        <div style="display: flex; width: 100%;align-items: center;height: 100%;">
                            <span class="pictureIcon"></span>
                            <input @blur="scrollTop()" type="text" name="captcha" id="captcha" maxlength="4" placeholder="验证码" v-model.trim="loginForm.captcha">
                        </div>
                        <div>
                            <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
                        </div>
                    </div>
                </li>

                <li v-if="smsFlag">
                    <div class="loginLileft">
                        <span class="smsIcon"></span>
                        <input type="number" @blur="scrollTop()" placeholder="请输入短信验证码" v-model.trim="loginForm.smsCode">
                    </div>
                    <div class="loginLiRight">
                        <span class="validate" @click="validateCli()">{{validate}}</span>
                    </div>
                </li>
            </ul>
        </section>

        <p class="bntWrap">
            <span class="bnt" style="width: 6rem;" @click="loginBnt()">登录</span>
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
import blurMix from '@/util/blurMix'
import { IsEmpty, IsMobile, CheckPass, setToken, IsChinaMobile, IsHKMobile } from "@/util/common";

export default {
    data() {
        return {
            eyeImgState: false,
            passShow: false,
            phoneCleanShow: false,
            passCleanShow: false,
            vaildCleanShow: false,
            validateImgSrc: infoURl + 'user/captcha?' + (new Date()),
            loginForm: {
                userName: '',
                passWord: '',
                smsCode: '',
                captcha: '',
            },
            validate: "获取验证码",
            validateFlag: 1,
            smsFlag: true,
            telList: [
                {
                    telRealVal: 86,
                    telShowVal: '+86 中国',
                },
                {
                    telRealVal: 852,
                    telShowVal: '+852 香港',
                }
            ],
            telPlace: 86
        };
    },
    mixins: [blurMix],
    computed: {


    },
    methods: {
        // 图片验证码
        validateImgClick: function() {
            this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
        },
        indexSelect(event) {
            this.telPlace = event.target.value;
        },
        // 登录
        login: function() {
            let _this = this;
            this.axios(infoURl + api.login, {
                mobile: _this.loginForm.userName,
                passwd: _this.loginForm.passWord,
                verify_code: _this.loginForm.smsCode
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
                                this.loginForm.passWord = '';
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
        //眼睛和清空
        eyeImgClose: function() {
            this.eyeImgState = false;
            this.passShow = false;
        },
        eyeImgOpen: function() {
            this.eyeImgState = true;
            this.passShow = true;
        },
        phoneClean: function() {
            this.loginForm.userName = ''
        },
        passwordClean: function() {
            this.loginForm.passWord = ''
        },
        phoneInp: function(ev) {
            this.phoneCleanShow = true;
        },
        passInp: function(ev) {
            this.passCleanShow = true;
        },


        //登录按钮
        loginBnt: function() {
            if (IsEmpty(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码不能为空")
                return false;
            }
            if (this.telPlace == '86' && !IsChinaMobile(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }
            if (this.telPlace == '852' && !IsHKMobile(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }

            if (this.smsFlag === false) {
                if (IsEmpty(this.loginForm.passWord)){
                    this.MessageBox("提示", "请输入登录密码");
                    return false;
                }
                if (!CheckPass(this.loginForm.passWord)) {
                    this.MessageBox.confirm('', {
                        message: '手机号或登录密码输入错误。',
                        title: '登录失败',
                        confirmButtonText: '忘记密码',
                        cancelButtonText: '重新输入'
                    }).then(action => {
                        this.$router.push('/passSetUp');
                    }).catch(action => {
                        this.loginForm.passWord = '';
                    })
                    return false;
                }
                this.loginForm.smsCode = ''
            } else {
                if (IsEmpty(this.loginForm.captcha)) {
                    this.MessageBox("提示", "请输入图片验证码");
                    return false;
                }
                if(this.loginForm.captcha.length < 4){
                  this.MessageBox("提示", "图片验证码输入错误。")
                  return false;
                }
                if (IsEmpty(this.loginForm.smsCode)) {
                    this.MessageBox("提示", "请输入短信验证码")
                    return false;
                }
                this.loginForm.passWord = ''
            }
            this.login();
        },

        //弹出框按钮
        forgerPass: function() {
            this.$router.push('/passSetUp');
        },
        reInput: function() {
            this.loginForm.passWord = '';
        },

        validateCli: function() {
            if (IsEmpty(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码不能为空")
                return false;
            }
            if (this.telPlace == '86' && !IsChinaMobile(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }
            if (this.telPlace == '852' && !IsHKMobile(this.loginForm.userName)) {
                this.MessageBox("提示", "手机号码输入错误");
                return false;
            }
            if (this.validateFlag == 1) {
                this.sms();
            }
        },

        // 短信验证码接口
        sms: function() {
            if (IsEmpty(this.loginForm.captcha)) {
                this.MessageBox("提示", "请输入图片验证码。")
                return false;
            }
            if(this.loginForm.captcha.length < 4){
              this.MessageBox("提示", "图片验证码输入错误。")
              return false;
            }
            let _this = this;
            this.axios(infoURl + api.sms, {
                mobile: _this.loginForm.userName,
                captcha:_this.loginForm.captcha,
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
                             this.loginForm.captcha = '';
                        });
                    }
                })
                .catch((data) => {
                    this.MessageBox("提示", data.message)
                })
        },
        usePassWord() {
            this.smsFlag = false;
            this.loginForm.captcha = '';
        }
    },
    mounted() {
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
    components: {

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
    height: 100%;
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
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .loginLileft {
            display: flex;
            align-items: center;
            width: 80%;
            height: 100%;
            span {

                background-image: url(/static/images/login.png);
                background-repeat: no-repeat;
                width: 26px;
                height: 25px;
                display: inline-block;
                background-size: 172px 32px;
            }
            input {
                height: 100%;
                display: block;
                font-size: 16px;
                width: 80%;
                padding-left: 0.1rem;
            }
            .mobile-wrapper{
              position: relative;
              display: flex;
              align-items: center;
              height: 100%;
            }
        }
        .loginLiRight {
            display: flex;
            .clean {
                width: 20px;
                height: 20px;
                background: #ddd;
                display: inline-block;
                border-radius: 50%;
                position: relative;
            }

            .clean::before {
                content: "";
                transform: rotate(45deg);
                top: 10px;
                left: 3px;
                width: 14px;
                height: 1px;
                display: block;
                background: #fff;
                position: absolute;
            }

            .clean::after {
                content: "";
                transform: rotate(-45deg);
                top: 10px;
                left: 3px;
                width: 14px;
                height: 1px;
                display: block;
                background: #fff;
                position: absolute;
            }
            .eyeImgClose,
            .eyeImgOpen {
                background-image: url(/static/images/login.png);
                background-repeat: no-repeat;
                width: 23px;
                height: 23px;
                display: inline-block;
                background-size: 172px 32px;
                margin-left: 4px;
            }

            .eyeImgClose {
                background-position: -1px -8px;
            }

            .eyeImgOpen {
                background-position: -27px -8px;
            }
        }
    }
    .loginIcon {
        background-position: -80px -3px;
    }
    .passWordIcon {
        background-position: -52px -3px;
    }
    .pictureIcon {
        background-position: -133px -3px;
    }
    .smsIcon {
        background-position: -105px -3px;
    }
    li:last-of-type {
        border: none;
    }
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

.bntWrap {
    background: #fff;
    padding-top: 0.47rem;
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


.tipBg {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    .toast {
        background: #fff;
        width: 65%;
        height: 15%;
        border-radius: 5px;
        font-size: 14px;
        padding: 15px 25px;
        p {
            line-height: 25px;
        }
        p:nth-of-type(1) {
            color: #333333;
            font-size: 15px;
            font-weight: bolder;
        }
        p:nth-of-type(2) {
            color: #999999;
        }
        p:nth-of-type(3) {
            color: #1685e9;
            text-align: center;
            margin-top: 0.4rem;
        }
        .failNext {
            display: flex;
            justify-content: space-around;
        }
    }
}

.validate {
    font-size: 12px;
    border: 1px solid #19ad6a;
    border-radius: 30px;
    line-height: 0.4rem;
    color: #19ad6a;
    height: 0.4rem;
    width: 1.8rem;
    text-align: center;
}

.toastMsg {
    background: #fff;
    width: 65%;
    height: 15%;
    border-radius: 5px;
    font-size: 14px;
    padding: 15px 25px;
}

.fade-enter-active {
    transition: 0.1s ease-out;
}

.fade-enter {
    opacity: 0;
    transform: scale(1.2);
}

.fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>

