<template>
  <div class="passSetW">
    <div class="header">
      <span class="back" @click="goBack"></span>
    </div>
    <div class="titleW">
      <p>第一步</p>
      <p class="sub-title">请填写需要找回密码的账号</p>
    </div>
    <div class="register-main">
      <div class="sms-input">
          <div class="icon-phone"></div>
          <div class="area-num"  @click="pickerShow">
            <span>+ {{value}}</span>
            <span class="icon-arrow"></span>
          </div>
          <div class="pickerW" :class="[areaShow?'':'pickerW-hide']">
            <li v-for="(item,index) in telList" :key="index"  @click="changeArea(item.telRealVal,index)" :id="'pickerItem'+index">
              <span>{{item.telShowValLeft}}</span>
              <span>{{item.telShowValRight}}</span>
            </li>
          </div>
          <input type="tel" pattern="\d*" class="inp-phone" @click="inputClick($event)" v-model="formMsg.userName" maxlength="11" placeholder="请输入手机号码"/>
          <div class="icon-close" v-if="formMsg.userName" @click="formMsg.userName=''"></div>
        </div>
        <div class="pw-input">
          <div class="icon-pw"></div>
          <input type="text" class="inp-pw" @click="inputClick($event)" v-model="formMsg.imgValid" maxlength="4"  placeholder="请输入图形验证码"/>
          <div class="photoW" @click="changeValidateImg">
             <img :src="validateImgSrc" alt="">
           </div>
        </div>
        <div class="pw-input">
          <div class="icon-sms"></div>
          <input type="tel" class="inp-pw" @click="inputClick($event)" v-model="formMsg.smsValid" maxlength="4"  placeholder="请输入短信验证码"/>
          <div class="noticeW">
            <div class="sms-time" v-if="validateFlag==0">
              {{time}}s
            </div>
            <div class="sms-time" v-if="validateFlag==1">
              <span v-if="validateStatus==0 && !formMsg.imgValid" >获取验证码</span>
              <span v-if="validateStatus==0 && formMsg.imgValid" @click="getSmsCode" class="sms-time-color">获取验证码</span>
              <span v-if="validateStatus==1" @click="getMesCode" class="sms-time-color">重新发送</span>
            </div>
          </div>
        </div>
        <div class="register-btnW">
          <button class="register-btn" @click="nextPage">下一步</button>
        </div>
    </div>
    <passSetUpSecond :show.sync="passSetUpSecondShow" v-if="passSetUpSecondShow" @handle-close="handleClose" @get-passWord="getPassWord"></passSetUpSecond>
  </div>
</template>
<script>
import api from "@/service/api";
import { IsEmpty, CheckPass, setToken, IsChinaMobile, IsHKMobile } from "@/util/common";
export default {
  data: ()=>({
    formMsg: {
        userName: '',
        imgValid: '',
        smsValid: '',
        passWord: ""
      },
    telList: [
      {
        telRealVal: 86,
        telShowValLeft: '+86',
        telShowValRight: '中国'
      },
      {
        telRealVal: 852,
        telShowValLeft: '+852',
        telShowValRight: '香港'
      }
    ],
    value: 86,
    areaShow: false,
    validateImgSrc:'',
    validateFlag: 1,
    validateStatus:0,
    time: 59,
    passSetUpSecondShow: false,
    // disabled: true
  }),
  methods: {
    inputClick(e) {
      e.target.focus();
    },
    goBack() {
      this.$router.back();
    },
    pickerShow() {
      this.areaShow = !this.areaShow
    },
    changeArea(e,index) {
      let dom = document.getElementById('pickerItem'+index)
      dom.style.background = '#F1F1F1'
      setTimeout(()=>{
        dom.style.background = '#ffffff'
        this.areaShow = false
        this.value = e
      },200)
    },
    changeValidateImg() {
      this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
    },
    handleClose(val) {
      this.passSetUpSecondShow = val
    },
    getMesCode() {
      this.validateFlag = 0;
      // this.validate = "120s 重新获取";
      let _this = this;
      let timeInit = 59;
      let countDown = setInterval(function() {
          let i = 1;
          timeInit = timeInit - i;
          if (timeInit > 0) {
            _this.time = timeInit
              // _this.validate = timeInit + 's 重新获取'
          } else {
              // _this.validate = "重新获取"
              _this.time = 59
              _this.validateFlag = 1;
              clearInterval(countDown)
          }
      }, 1000)
    },


    // 获取设置密码短信验证码
    getSmsCode() {
      if (IsEmpty(this.formMsg.userName)) {
        this.Toast('手机号码不能为空')
        return false;
      }
      if ( this.value == 86 && !IsChinaMobile(this.formMsg.userName)) {
        this.Toast('手机号码格式有误')
        return false;
      }
      if ( this.value == 852 && !IsHKMobile(this.formMsg.userName)) {
        this.Toast('手机号码格式有误')
        return false;
      }
      let _this = this;
            this.axios(infoURl + api.sms, {
                mobile: _this.formMsg.userName,
                captcha:_this.formMsg.imgValid
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                      this.getMesCode()
                    } else if(data.error_code==1) {
                      this.Toast('图形验证码错误');
                      this.formMsg.imgValid = ''
                      this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
                    }else {
                      this.Toast(data.message);
                    }
                })
                .catch((data) => {
                    this.Toast(data.message);
                })
    },
    nextPage() {
      if (IsEmpty(this.formMsg.userName)) {
        this.Toast('手机号码不能为空')
        return false;
      }
      if ( this.value == 86 && !IsChinaMobile(this.formMsg.userName)) {
        this.Toast('手机号码格式有误')
        return false;
      }
      if ( this.value == 852 && !IsHKMobile(this.formMsg.userName)) {
        this.Toast('手机号码格式有误')
        return false;
      }
      if (IsEmpty(this.formMsg.imgValid)) {
        this.Toast('图形验证码不能为空')
        return false;
      }
      if (IsEmpty(this.formMsg.smsValid)) {
        this.Toast('短信验证码不能为空')
        return false;
      }
      this.getSmsValid()
    },
    getSmsValid() {
      let _this = this;
      this.axios(infoURl + api.validSms, {
          mobile: _this.formMsg.userName,
          verify_code:_this.formMsg.smsValid
      }, 'post')
          .then((data) => {
              if (data.error_code == 0) {
                this.passSetUpSecondShow = true
              }else {
                this.Toast(data.message);
              }
          })
          .catch((data) => {
              this.Toast(data.message);
          })
    },
    getPassWord(val) {
      this.formMsg.passWord = val
      // 提交修改密码
      this.passSetUp()
    },
    // 忘记密码接口
    passSetUp() {
        let _this = this;
        this.axios(infoURl + api.forget, {
            mobile: _this.formMsg.userName,
            passwd: _this.formMsg.passWord,
            confirm_passwd: _this.formMsg.passWord,
            verify_code: _this.formMsg.smsValid
        }, 'post')
            .then((data) => {
                if (data.error_code == 0) {
                    this.Toast('密码设置成功，请重新登录');
                    this.$router.push('/login')
                } else {
                    this.Toast(data.message);
                }
            })
            .catch((data) => {
                this.Toast(data.message);
            })
    },
   },
  components: {
    passSetUpSecond: () => import('./components/passSetUpSecond'),
  },
  created() {
    this.validateImgSrc = infoURl + 'user/captcha?' + (new Date());
  },
  mounted() {
    // this.getMesCode()
  }

}
</script>
<style lang="scss" scoped>
@import '~@/scss/color.scss';
.passSetW {
  position: relative;
  background: #ffffff;
  height: 100%;
  .header {
    padding: 0.2rem 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    .back {
      display: inline-block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(/static/images/logo/btn_back.png);
      background-size: 100% 100%;
    }
  }
  .titleW {
    padding: 0 0.52rem;
    padding-top: 1.8rem;
    p {
      font-size: 0.48rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #2C2C2C;
      letter-spacing: 1px;
    }
    .sub-title {
      margin-top: 0.2rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #AAAAAA;
      letter-spacing: 0px;
    }
  }
  .register-main {
    margin-top: 0.72rem;
    padding: 0 0.52rem;
    .sms-input {
      position: relative;
      height: 0.84rem;
      display: flex;
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
          .picker-gray {
            background: #F5F5F5;
          }
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
        margin-left: 0.32rem;
        width: 3.8rem;
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
          background-image: url(/static/images/logo/icon_duanxin.png);
          background-size: 100% 100%;
        }
        .icon-sms {
          margin-right: 0.32rem;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url(/static/images/logo/icon_tuxing.png);
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
        .photoW{
          margin-left: auto;
          margin-right: 0;
          width: 1.6rem;
          height: 0.64rem;
          background: #F0F0F0;
          border-radius: 0.1rem;
          img {
            border-radius: 0.1rem;
          }
        }
        .noticeW {
          margin-left: auto;
          margin-right: 0.1rem;
          height: 0.28rem;
          line-height: 0.28rem;
          .sms-time {
            font-size: 0.28rem;
            color: #AAAAAA;
            .sms-time-color {
              color: $theme;
            }
          }
        }
      }
    .register-btnW {
      margin-top: 0.9rem;
      .register-btn {
        width: 100%;
        height: 0.88rem;
        background: $theme;
        border-radius: 0.2rem;
        border: none;
        color: #ffffff;
        font-size: 0.32rem;
      }
    }
  }
  .register-footer {
    position: absolute;
    left: 0;
    bottom: 0.32rem;
    padding: 0 0.94rem;
    text-align: center;
    p {
      font-size: 0.24rem;
      color: #AAAAAA;
      line-height: 0.36rem;
      span {
        color: $theme;
      }
    }
  }
}
</style>
