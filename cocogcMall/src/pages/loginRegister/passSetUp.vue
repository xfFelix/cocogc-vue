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
                        <span class="identImg telIcon"></span>
                         <div class="select-wrap">
                            <select class="select-index" v-on:change="indexSelect($event)">
                              <option :value="item.telRealVal" v-for="(item,index) in telList" :key="index">{{item.telShowVal}}</option>
                            </select>
                            <img src="../../../static/images/select-down.png" style="width: 10px;height:5px;" alt="">
                          </div>
                        <input @blur="scrollTop()" type="tel" placeholder="请输入手机号" v-model.trim="formMsg.userName" @input="telInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="telClean()" v-if="clean.telCleanShow"></span>
                    </div>
                </li>

                <li>
                    <div class="loginLileft">
                        <span class="identImg passWordIcon"></span>
                        <input @blur="scrollTop()" type="password" placeholder="设置新密码" v-model.trim="formMsg.passWord"  v-if="passInpShow == false" @input="passInp($event)">
                        <input @blur="scrollTop()" type="text" placeholder="设置新密码" v-model.trim="formMsg.passWord" v-if="passInpShow == true"  @input="passInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="passClean()" v-if="clean.passCleanShow"></span>
                        <span class="eyeImgClose" v-if="eyeImgState == false" @click="eyeImgOpen"></span>
                        <span class="eyeImgOpen" v-if="eyeImgState == true" @click="eyeImgClose"></span>
                    </div>
                </li>

                 <li>
                    <div class="loginLileft">
                        <span class="identImg passWordIcon"></span>
                        <input @blur="scrollTop()" type="password" placeholder="确认密码" v-model.trim="formMsg.passConfirm" v-if="passInpConShow == false" @input="passConfirmInp($event)">
                        <input @blur="scrollTop()" type="text" placeholder="确认密码" v-model.trim="formMsg.passConfirm" v-if="passInpConShow == true"  @input="passConfirmInp($event)">
                    </div>
                    <div class="loginLiRight">
                        <span class="clean" @click="passConfirmClean()" v-if="clean.passConfirmShow"></span>
                        <span class="eyeImgClose" v-if="eyeImgConState == false" @click="eyeImgConOpen"></span>
                        <span class="eyeImgOpen" v-if="eyeImgConState == true" @click="eyeImgConClose"></span>
                    </div>
                </li>
                <li>
                    <div class="loginLileft">
                        <span class="identImg smsIcon"></span>
                        <input @blur="scrollTop()" type="text" placeholder="请输入验证码" v-model.trim="formMsg.smsValid" @input="smsValidInp($event)">
                    </div>

                    <div class="loginLiRight">
                        <span class="clean" @click="smsClean()" v-if="clean.smsCleanShow"></span>
                        <span class="validate" @click="validateCli()" :class="sendSmsColor?'validateCan':'validateNo'">{{validate}}</span>
                    </div>
                </li>
            </ul>
        </section>

        <p class="bnt" @click="passSetBnt()" :class="forgerBntColor?'canBnt':'noBnt'">
            下一步
        </p>

    </div>
</template>


<script>
import { IsEmpty, IsMobile, CheckPass ,IsHKMobile, IsChinaMobile } from "@/util/common"
import blurMix from '@/util/blurMix';
import loginMix from '@/util/loginMix'
import api from "@/service/api";

export default {
    mixins: [blurMix,loginMix],
    data() {
        return {
            telCleanShow: false,
            validate: "获取验证码",
            validateFlag: 1,
            formMsg: {
                userName: '',
                passWord: '',
                passConfirm: '',
                smsValid: '',
            }
        };
    },
     computed: {
       sendSmsColor:function(){
          let comFalg = this.computFalg()
          if(this.validateFlag==0){
            return false
          }else{
            return comFalg
          }
      },
      forgerBntColor:function(){
        let forgetCloFlag = false;
        let smsCloFlag = false;
        let comFalg = this.computFalg()
        if (!IsEmpty(this.formMsg.smsValid)) {
            smsCloFlag = true;
        }
        forgetCloFlag = smsCloFlag && comFalg
        return forgetCloFlag
      }
     },
    methods: {
        computFalg:function(){
          let passColFlag = false;
          let passConCloFlag = false;
          let telCloFlag = false;
          if (!IsEmpty(this.formMsg.userName)) {
             telCloFlag = true;
          }
          if (!IsEmpty(this.formMsg.passWord)) {
            passColFlag = true;
          }
          if (!IsEmpty(this.formMsg.passConfirm)) {
              passConCloFlag = true;
          }
          return  passColFlag && passConCloFlag && telCloFlag
      },
        // 忘记密码接口
        passSetUp: function() {
            let _this = this;
            this.axios(infoURl + api.forget, {
                mobile: _this.formMsg.userName,
                passwd: _this.formMsg.passWord,
                confirm_passwd: _this.formMsg.passConfirm,
                verify_code: _this.formMsg.smsValid
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
                mobile: _this.formMsg.userName,
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

        /*
          短信验证码按钮
        */
        validateCli: function() {
            if (this.telPlace == '86' && !IsChinaMobile(this.formMsg.userName)) {
              this.MessageBox("提示", "手机号码输入错误");
              return false;
            }
            if (this.telPlace == '852' && !IsHKMobile(this.formMsg.userName)) {
              this.MessageBox("提示", "香港手机号码输入错误");
              return false;
            }
            if (!CheckPass(this.formMsg.passWord)) {
                this.MessageBox("密码格式错误", "请输入6-20位数字与字母的组合。")
                return false;
            }
            if (this.formMsg.passWord !== this.formMsg.passConfirm) {
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
            if (this.telPlace == '86' && !IsChinaMobile(this.formMsg.userName)) {
              this.MessageBox("提示", "手机号码输入错误");
              return false;
            }
            if (this.telPlace == '852' && !IsHKMobile(this.formMsg.userName)) {
              this.MessageBox("提示", "香港手机号码输入错误");
              return false;
            }
            if (!CheckPass(this.formMsg.passWord)) {
                this.MessageBox("密码格式错误", "请输入6-20位数字与字母的组合。")
                return false;
            }
            if (this.formMsg.passWord !== this.formMsg.passConfirm) {
                this.MessageBox("密码错误", "密码设置不一致")
                return false;
            }
            if (!this.formMsg.smsValid) return this.MessageBox("验证码错误", "验证码为空")
            this.passSetUp();
        }
    },
    mounted() {

    },
    components: {

    }
};
</script>

<style lang="scss" scoped>
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
        margin-bottom: 0.66rem;
        li {
            border-bottom: 1px solid #dfdfdf;
            height:1.12rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .loginLileft {
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                .identImg {
                  background-repeat: no-repeat;
                  display: inline-block;
                  background-size:100% 100%;
                }
                input {
                    height: 100%;
                    font-size: 15px;
                    padding-left:15px;
                    flex: 1;
                    width: 100%;
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
             .loginLiRight {
                display: flex;
                align-items: center;
              }
        }
        li:last-of-type {
            .loginLiRight {
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
    left: 0.5rem;
    top: 0.6rem;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}

</style>

