<template>
    <div id="passSetUp">

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
                        <input type="text" placeholder="手机号" v-model.trim="passSet.userName" @input="phoneInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="phoneClean()" v-if="phoneCleanShow"></span>
                    </div>
                </li>

                <li>
                    <div class="loginLileft">
                        <input type="password" placeholder="设置新密码" v-model.trim="passSet.passWord">

                    </div>

                    <div class="loginLiRight">

                    </div>
                </li>

                <li>
                    <div class="loginLileft">
                        <input type="password" placeholder="确认密码" v-model.trim="passSet.passConfirm">
                    </div>
                </li>
                <li>
                    <div class="loginLileft">
                        <input type="text" placeholder="请输入验证码" v-model.trim="passSet.inputValid">
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
import api from "@/service/api";

export default {
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
            this.axios(api.forget, {
                mobile: _this.passSet.userName,
                passwd: _this.passSet.passWord,
                confirm_passwd: _this.passSet.passConfirm,
                verify_code: _this.passSet.inputValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        this.$router.push('/passSetUp')
                    } else {
                        this.$toast(data.message);
                    }
                })
                .catch((data) => {
                    this.$toast(data.message);
                })
        },
        // 忘记密码短信接口
        sms: function() {
            let _this = this;
            this.axios(api.forget, {
                mobile: _this.passSet.userName,
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
                        this.$toast(data.message);
                    }
                })
                .catch((data) => {
                    this.$toast(data.message);
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
                this.$toast("手机号码错误");
                return false;
            }
            if (!CheckPass(this.passSet.passWord)) {
                this.$toast("密码格式错误");
                return false;
            }
            if (this.passSet.passWord !== this.passSet.passConfirm) {
                this.$toast("密码设置不一致");
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
                this.$toast("手机号码错误");
                return false;
            }
            if (!CheckPass(this.passSet.passWord)) {
                this.$toast("密码格式错误");
                return false;
            }
            if (this.passSet.passWord !== this.passSet.passConfirm) {
                this.$toast("密码设置不一致");
                return false;
            }
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

.loginUl {
    padding: 1.25rem 1rem 0 1rem;
    margin-bottom: 0.2rem;
}

.loginUl li {
    border-bottom: 1px solid #dfdfdf;
    height: 0.48rem;
    padding: 0.18rem 0;
    display: flex;
    justify-content: space-between;
}

.loginLileft span {
    background-image: url(/static/images/login.png);
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 172px 32px;
}

.loginUl li:nth-of-type(1) .loginLileft span {
    background-position: -74px -2px;
}

.loginUl li:nth-of-type(2) .loginLileft span {
    background-position: -50px -2px;
}

.loginUl li:nth-of-type(3) .loginLileft span {
    background-position: -100px -2px;
}

.loginUl li:last-of-type {
    border: none;
}

.loginLileft {
    display: flex;
    width: 80%;
}

.loginLileft input {
    height: 0.47rem;
    font-size: 15px;
    width: 80%;
    padding-left: 0.1rem;
}

.loginLiRight {
    display: flex;
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
</style>

