<template>
    <div id="login">

        <head>
            <div class="headLogin">
                <div class="close">
                    <span></span>
                    <span></span>
                </div>
                <router-link class="register" to="/register">
                    注册
                </router-link>
            </div>
        </head>

        <section>
            <ul class="loginUl">
                <li>
                    <div class="loginLileft">
                        <span></span>
                        <input type="number" placeholder="请输入注册手机号码" v-model.trim="loginForm.userName" @input="phoneInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="phoneClean()" v-if="phoneCleanShow"></span>
                    </div>
                </li>
                <li>
                    <div class="loginLileft">
                        <span></span>
                        <input type="password" placeholder="请输入密码" v-model.trim="loginForm.passWord" @input="passInp($event)" v-if="passShow == false">
                        <input type="text" placeholder="请输入密码" v-model.trim="loginForm.passWord" @input="passInp($event)" v-if="passShow == true">
                    </div>

                    <div class="loginLiRight">
                        <span class="clean" @click="passwordClean()" v-if="passCleanShow"></span>
                        <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
                        <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
                    </div>
                </li>
            </ul>
        </section>

        <p class="bntWrap" @click="loginBnt()">
            <span class="bnt">登录</span>
        </p>
        <p class="forgetPass" @click="forgerPass()">忘记密码？</p>

        <div class="tipBg" v-if="tipBgShow">
            <div class="toast">
                <p>登录失败： </p>
                <p>手机号或登录密码错误。</p>
                <p class="failNext">
                    <span @click="forgerPass()">忘记密码</span>
                    <span @click="reInput()">重新输入</span>
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import api from "@/service/api";
import { IsEmpty, IsMobile, CheckPass } from "@/util/common";

export default {
    data() {
        return {
            eyeImgState: false,
            passShow: false,
            tipBgShow: false,
            phoneCleanShow: false,
            passCleanShow: false,
            vaildCleanShow: false,
            loginForm: {
                userName: '',
                passWord: ''
            }
        };
    },
    computed: {


    },
    methods: {
        // 登录
        login: function() {
            let _this = this;
            this.axios(infoURl+api.login, {
                mobile: _this.loginForm.userName,
                passwd: _this.loginForm.passWord,
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.$router.push('/layout/home');
                        let token = data.data.token;
                        localStorage.setItem("yeyun_token", token);
                        this.$cookies.set("yeyun_token", token, 30)
                    } else {
                        this.tipBgShow = true;
                    }
                })
                .catch((err) => {
                    this.tipBgShow = true;
                })
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
            if (IsEmpty(this.loginForm.userName) || !IsMobile(this.loginForm.userName)) {
                this.MessageBox("手机号码错误", "请输入有效的11位手机号码。")
                return false;
            }
            if (IsEmpty(this.loginForm.passWord) || !CheckPass(this.loginForm.passWord)) {
                this.MessageBox("密码错误", "请输入正确的密码。")
                return false;
            }
            this.login()
        },

        //弹出框按钮
        forgerPass: function() {
            this.$router.push('/passSetUp');
        },
        reInput: function() {
            this.tipBgShow = false;
            this.loginForm.passWord = '';

        },
    },
    mounted() {

    },
    components: {

    }
};
</script>


<style lang="less">
#login {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: #fff;
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
    font-size: 0.3rem;
}

.loginUl {
    padding: 1.25rem 1rem 0 1rem;
    background: #fff;
    li {
        border-bottom: 1px solid #dfdfdf;
        height: 24px;
        padding: 0.18rem 0;
        display: flex;
        justify-content: space-between;
        .loginLileft {
            display: flex;
            width: 80%;
            span {

                background-image: url(/static/images/login.png);
                background-repeat: no-repeat;
                width: 26px;
                height: 25px;
                display: inline-block;
                background-size: 172px 32px;
            }
            input {
                height: 23px;
                font-size: 15px;
                width: 80%;
                padding-left: 0.1rem;
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
    li:nth-of-type(1) .loginLileft span {
        background-position: -80px -3px;
    }
    li:nth-of-type(2) .loginLileft span {
        background-position: -52px -3px;
    }
    li:nth-of-type(3) .loginLileft span {
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

