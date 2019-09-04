<template>
    <div class="pay-password-wrapper">
      <header>
        <i class="close" @click="goBack()"></i>
      </header>
      <h1>修改密码</h1>
      <h3>{{userinfo.payPwd?(num?'请设置新支付密码':'请输入原密码确认本人操作'):(num?'请确认支付密码':'请设置支付密码')}}</h3>
      <six-password class="password" v-model="code"></six-password>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { getToken } from '@/util/common'

export default {
  components: {
    SixPassword: () => import(/* webpackPreload: true */ '@/common/SixPassword')
  },
    data: () => ({
      num: 0,
      code: '',
      password: '',
      newPassword: '',
      redirect: ''
    }),
    created () {
      if (Object.keys(this.$route.query).length && this.$route.query.path) {
        this.redirect = this.$route.query.path
      }
    },
    watch: {
      code (val) {
        if (val.length === 6) {
          this.num++
          if (this.num === 1) {
            this.password = this.code
            this.code = ''
          } else {
            this.newPassword = this.code
            this.changePwd()
          }
        }
      }
    },
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
        if (error_code) {
          this.initData()
          return this.Toast(message)
        }
        this.Toast(message)
        this.setUserInfo(data)
        if (this.redirect) {
          window.location.href = this.redirect
        } else {
          this.$router.go(-1)
        }
      },
      initData() {
        this.num = 0
        this.code = ''
      },
      async goBack() {
        if (this.num === 1) {
          const res = await this.MessageBox({
            message: '密码未输入完成',
            showCancelButton: true,
            confirmButtonText: '离开'
          })
          if (/confirm/.test(res)){
            if (this.redirect) {
              window.location.href = this.redirect
            } else {
              this.$router.go(-1)
            }
          }
        } else {
          if (this.redirect) {
            window.location.href = this.redirect
          } else {
            this.$router.go(-1)
          }
        }
      }
    }
};
</script>
<style lang="scss" scoped>
.pay-password-wrapper{
  min-height: 100%;
  header{
    padding-top: 20px;
    .close{
      margin-left: 15px;
      display: block;
      width: 0.22rem;
      height: 0.38rem;
      background-image: url(/static/images/jl.png);
      background-repeat: no-repeat;
      background-size: 5.8rem 1.86rem;
      background-position: -0.2rem -0.74rem;
      transform: rotate(180deg);
    }
  }
  h1{
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
  }
  h3{
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  .password{
    margin-top: 35px;
  }
}
</style>


