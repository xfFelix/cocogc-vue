<template>
    <div id="passSetUp">

        <head>
            <div class="registHead" @click="$router.back(-1)">

            </div>
        </head>

        <section>
            <ul class="loginUl">
                <li>
                    <div class="loginLileft">
                        <input @blur="scrollTop()" type="text" placeholder="请输入手机号" v-model.trim="passSet.userName" @input="phoneInp($event)">
                    </div>
                </li>

                <li>
                    <div class="loginLileft">
                        <input @blur="scrollTop()" type="password" placeholder="设置新密码" v-model.trim="passSet.passWord">

                    </div>
                </li>

                <li>
                    <div class="loginLileft">
                        <input @blur="scrollTop()" type="password" placeholder="确认密码" v-model.trim="passSet.passConfirm">
                    </div>
                </li>
                <li>
                    <div class="loginLileft">
                        <input @blur="scrollTop()" type="text" placeholder="请输入验证码" v-model.trim="passSet.inputValid">
                    </div>

                    <div class="loginLiRight">
                        <span class="validate" @click="validateCli()">{{validate}}</span>
                    </div>

                </li>
            </ul>
        </section>

        <p class="bnt" @click="passSetBnt()">
            下一步
        </p>

    </div>
</template>


<script>
import { IsEmpty, IsMobile, CheckPass } from "@/util/common"
import blurMix from '@/util/blurMix'
import api from "@/service/api";

export default {
    mixins: [blurMix],
    data() {
        return {
            phoneCleanShow: false,
            validate: "获取验证码",
            validateFlag: 1,
            passSet: {
                userName: '',
                passWord: '',
                passConfirm: '',
                inputValid: '',
            }
        };
    },

    methods: {
        // 忘记密码接口
        passSetUp: function() {
            let _this = this;
            this.axios(infoURl + api.forget, {
                mobile: _this.passSet.userName,
                passwd: _this.passSet.passWord,
                confirm_passwd: _this.passSet.passConfirm,
                verify_code: _this.passSet.inputValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.$router.push('/passSetSucess')
                    } else {
                        this.MessageBox("提示", data.message)
                    }
                })
                .catch((data) => {
                    this.MessageBox("提示", data.message)
                })
        },
        // 忘记密码短信接口
        sms: function() {
            let _this = this;
            this.axios(infoURl + api.sms, {
                mobile: _this.passSet.userName,
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
                        this.MessageBox("提示", data.message)
                    }
                })
                .catch((data) => {
                    this.MessageBox("提示", data.message)
                })
        },

        phoneClean: function() {
            this.passSet.userName = ''
        },
        phoneInp: function(ev) {
            this.phoneCleanShow = true;
        },
        /*
          短信验证码按钮
        */
        validateCli: function() {
            if (IsEmpty(this.passSet.userName) || !IsMobile(this.passSet.userName)) {
                this.MessageBox("手机号码错误", "请输入有效的11位手机号码。")
                return false;
            }
            if (!CheckPass(this.passSet.passWord)) {
                this.MessageBox("密码格式错误", "请输入6-20位数字与字母的组合。")
                return false;
            }
            if (this.passSet.passWord !== this.passSet.passConfirm) {
                this.MessageBox("密码错误", "密码设置不一致")
                return false;
            }

            if (this.validateFlag == 1) {
                this.sms();
            }
        },

        /*
            设置成功下一步
        */
        passSetBnt: function() {
            if (IsEmpty(this.passSet.userName) || !IsMobile(this.passSet.userName)) {
                this.MessageBox("手机号码错误", "请输入有效的11位手机号码。")
                return false;
            }
            if (!CheckPass(this.passSet.passWord)) {
                this.MessageBox("密码格式错误", "请输入6-20位数字与字母的组合。")
                return false;
            }
            if (this.passSet.passWord !== this.passSet.passConfirm) {
                this.MessageBox("密码错误", "密码设置不一致")
                return false;
            }
            if (!this.passSet.inputValid) return this.MessageBox("验证码错误", "验证码为空")
            this.passSetUp();
        }
    },
    mounted() {

    },
    components: {

    }
};
</script>

<style lang="less">
#passSetUp {
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    max-width: 450px;
    right: 0;
    margin: 0 auto;
    head {
        background: url(/static/images/regist.png) no-repeat;
        width: 100%;
        height: 3.5rem;
        display: block;
        background-size: 100% 100%;
        position: relative;
    }

    .loginUl {
        padding: 1.25rem 1rem 0 1rem;
        margin-bottom: 0.2rem;
        li {
            border-bottom: 1px solid #dfdfdf;
            height: 0.48rem;
            padding: 0.18rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .loginLileft {
                display: flex;
                width: 100%;
                span {
                    background-image: url(/static/images/login.png);
                    background-repeat: no-repeat;
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    background-size: 172px 32px;
                }
                input {
                    height: 0.47rem;
                    font-size: 15px;
                    width: 100%;
                    padding-left: 0.1rem;
                }
            }
        }
        li:last-of-type {
            .loginLileft {
                width: 68%;
            }
            .loginLiRight {
                .validate {
                    padding: 1px 6px;
                    font-size: 12px;
                    border: 1px solid #19ad6a;
                    border-radius: 30px;
                    text-align: center;
                    color: #19ad6a;
                }
            }
        }
    }
}


.registHead {
    width: 0.22rem;
    height: 0.38rem;
    background-image: url(/static/images/jl.png);
    background-repeat: no-repeat;
    background-size: 5.8rem 1.86rem;
    background-position: -0.2rem -0.74rem;
    position: absolute;
    left: 0.32rem;
    top: 0.56rem;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}


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
</style>

