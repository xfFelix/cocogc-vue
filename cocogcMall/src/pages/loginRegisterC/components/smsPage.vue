<template>
  <div class="bg" v-if="show">
    <div class="pageW">
      <div class="header">
        <span class="back" @click="goBack"></span>
      </div>
      <div class="titleW">
        <p class="title">请输入短信验证码</p>
        <p class="sub-title">已发送验证码至{{userName}}</p>
      </div>
      <div class="numberW">
        <Code v-model="code" ></Code>
      </div>
      <div class="noticeW">
        <div class="fail-text">{{failText}}</div>
        <div class="sms-time" v-if="validateFlag==0">
          {{time}}s 重新发送
        </div>
        <div class="sms-time sms-time-color" v-if="validateFlag==1" @click="getOtherCode">
          重新发送
        </div>
      </div>
      <div class="sms-btnW">
        <button class="sms-btn" @click="submit" :disabled="disabledSms">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    failText: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data: ()=>({
    code:'',
    validateFlag: 1,
    time: 59,
    disabledSms:true
  }),
  methods: {
    goBack() {
      this.$emit('handle-sms-close',false)
    },
    getCode() {
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
    submit() {
      if(this.code.length < 4){
        this.$emit('get-sms-failText','短信验证码错误！')
        // this.failText = '验证码错误'
        return false;
      }
      this.$emit('get-sms-code',this.code)
    },
    getOtherCode() {
      this.code = ''
      this.getCode()
      this.$emit('get-other-code')
    },
  },
  watch: {
    code: function(val){
      if(val) {
        this.disabledSms = false
      }else {
        this.disabledSms = true
      }
    }
  },
  components: {
    Code: () => import('@/components/Code')
  },
  mounted() {
    this.getCode()
  }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/color.scss';
.bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: #ffffff;
  .pageW {
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
      padding: 0.88rem 0.52rem 0px;
      .title {
        margin-top: 0.9rem;
        font-size: 0.48rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #2C2C2C;
      }
      .sub-title {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #AAAAAA;
      }
    }
    .numberW {
      padding: 0px 1.14rem;
      margin-top: 0.74rem;
    }
    .noticeW {
      padding: 0px 0.52rem;
      margin-top: 0.54rem;
      .fail-text {
        float: left;
        font-size: 0.24rem;
        color: #FF5200;
      }
      .sms-time {
        float: right;
        font-size: 0.24rem;
        color: #AAAAAA;
      }
      .sms-time-color {
        color: $theme;
      }
    }
    .sms-btnW {
      padding: 0 0.52rem;
      margin-top: 1.8rem;
      .sms-btn {
        width: 100%;
        height: 0.88rem;
        color: #ffffff;
        font-size: 0.32rem;
        background: $theme;
        border: none;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
