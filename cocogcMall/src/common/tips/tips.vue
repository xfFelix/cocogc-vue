<template>
  <transition name="fade">
    <div class="tipBg" v-show="show">

      <div class="toast" v-if="showType==1">
        <p>手机号码错误:</p>
        <p>请输入有效的11位手机号码。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==2">
        <p>验证码格式错误:</p>
        <p>请输入有效的4位验证码。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==3">
        <p>短信验证码错误：</p>
        <p>请输入有效的4位短信验证码。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==4">
        <p>密码格式错误：</p>
        <p>请输入6-20位数字与字母的组合。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==5">
        <p>账户名错误：</p>
        <p>账户名为有效的11位数字</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==6">
        <p>密码错误：</p>
        <p>密码为6-20位数字与字母的组合。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toast" v-if="showType==7">
        <p>密码错误：</p>
        <p>设置的密码不一致。</p>
        <p @click="confirmHide" class="confirmHide">确定</p>
      </div>

      <div class="toastA" v-if="showType==10">
        <p class="alertMsg">{{showMsg}}</p>
        <p @click="confirmHide" class="confirmHideA">确定</p>
      </div>

      <!--
                <div class="passSetFail" v-if="showType==3">
                  <p>请填写正确的手机号码;</p>
                  <p>请填写正确的短信验证码;</p>
                  <p>密码格式有误，请输入6-20位数字与字母的组合;</p>
                  <p @click="confirmHide()" class="confirmHide">确定</p>
                </div>

                <div class="toast" v-if="showType==3">
                  <p style="text-align:center"> {{showMsg}}</p>
                  <p></p>
                  <p @click="confirmHide" class="confirmHide">确定</p>
                </div> -->
    </div>

  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showType: '',
      showMsg: ''
    };
  },
  methods: {
    confirmHide() {
      this.show = false;
    }

  },
};
</script>

<style lang="scss">
.passSetFail {
  background: #fff;
  width: 76%;
  height: 20%;
  border-radius: 5px;
  font-size: 14px;
  padding: 15px 15px;
  margin-top: -30%;
}

.passSetFail p {
  font-size: 15px;
  color: #333333;
  line-height: 0.52rem;
}

.passSetFail .confirmHide {
  color: #1685e9;
  text-align: center;
  margin-top: 0.15rem;
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
    .alertMsgA {
      color: #999999;
      font-size: 15px;
      margin: 0.3rem;
    }
    .confirmHide {
      color: #1685e9;
      text-align: center;
      margin-top: 0.1rem;
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

  .toastA {
    background: #fff;
    width: 65%;
    height: 15%;
    border-radius: 5px;
    font-size: 14px;
    padding: 15px 25px;
    p {
      line-height: 25px;
    }
    .alertMsg {
      color: #333;
      font-size: 15px;
      margin: 0.3rem 0;
    }
    .confirmHideA {
      color: #1685e9;
      text-align: center;
      margin-top: 0.1rem;
    }
  }
}
</style>
