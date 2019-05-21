<template>
    <div id="login">

        <head>
            <div class="headLogin">
                <span class="back" @click="$router.go(-1)"></span>
            </div>
        </head>

        <section>
            <ul class="loginUl">
                <li>
                    <div class="loginLileft">
                        <span class="passWordIcon"></span>
                        <input type="password" placeholder="请输入原密码" v-model.trim="password" :maxlength="6" pattern="[0-9]*">
                    </div>
                </li>
                <li>
                    <div class="loginLileft">
                        <span class="passWordIcon"></span>
                        <input type="password" :placeholder="userinfo.payPwd ? '请输入新密码' : '请输入支付密码'" v-model.trim="newPassword" :maxlength="6" pattern="[0-9]*">
                    </div>
                </li>
            </ul>
        </section>

        <p class="bntWrap">
            <span class="bnt" @click="changePwd">提交</span>
        </p>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { getToken } from '@/util/common'

export default {
    data: () => ({
      password: '',
      newPassword: ''
    }),
    computed: {
      ...mapGetters({
        userinfo: 'userinfo/getUserInfo'
      })
    },
    methods: {
      ...mapActions({
        setUserInfo: 'userinfo/setUserInfo'
      }),
      async changePwd() {
        let validate = this.password.length === 6 && this.newPassword === this.password
        if (!validate) return this.Toast('密码错误')
        const { default: { checkPayPwd }} = await import('@/service/api')
        let config = {
          token: getToken(),
          passwd: this.userinfo.payPwd ? this.password : undefined,
          new_passwd: this.newPassword
        }
        const {error_code, data, message} = await this.axios(infoURl + checkPayPwd, config, 'post')
        if (error_code) return this.Toast(message)
        this.Toast(message)
        this.setUserInfo(data)
        this.$router.go(-1)
      }
    }
};
</script>


<style lang="less">
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
                padding-left: 10px;
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

