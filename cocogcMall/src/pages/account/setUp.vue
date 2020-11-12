<template>
    <div class="setUp">
        <header-top></header-top>
        <div class="setUp-contentW">
          <ul class="setUp-content">
            <div class="main" @click="$router.push({name: 'about'})">
                  <li>
                    <div class="leftW">
                      <img src="/static/images/me/setup/icon_guanyu.png" alt="">
                    </div>
                    <div class="rightW one-bottom-px">
                      <span class="label">关于椰云</span>
                      <span class="arrow"></span>
                      <span class="edition">V2.1.2</span>
                    </div>
                  </li>
              </div>
              <div class="main" @click="contact">
                  <li>
                    <div class="leftW">
                      <img src="/static/images/me/setup/icon_contact.png" alt="">
                    </div>
                    <div class="rightW one-bottom-px">
                      <span class="label">联系我们</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
            <!-- <li class="one-bottom-px" @click="certJump()">
                <div>
                    实名认证
                </div>
                <div>
                    <span v-if="identFlag">未认证</span>
                    <span class="redCircle" v-if="identFlag"></span>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li> -->
              <!-- <li class="one-bottom-px" @click="cardsJump()">
                  <div>
                      信用卡管理
                  </div>
                  <div>
                      <span v-if="cardsFlag">未绑定信用卡</span>
                      <span class="redCircle" v-if="cardsFlag"></span>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li> -->
              <!-- <li class="one-bottom-px" v-if="platform !== 1" @click="passupJump()">
                  <div>
                      修改登录密码
                  </div>
                  <div>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li>
              <li class="one-bottom-px" v-if="userinfo.payValidType === 1" @click="goPayPwd()">
                  <div>
                      修改支付密码
                  </div>
                  <div>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li> -->
          </ul>
          <ul class="setUp-content">
            <div class="main" v-if="platform !== 1" @click="passupJump()">
                  <li>
                    <div class="leftW">
                      <img src="/static/images/me/setup/icon_mima.png" alt="">
                    </div>
                    <div class="rightW one-bottom-px">
                      <span class="label">登录密码</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
              <div class="main" v-if="userinfo.payValidType === 1" @click="goPayPwd()">
                  <li>
                    <div class="leftW">
                      <img src="/static/images/me/setup/icon_key.png" alt="">
                    </div>
                    <div class="rightW one-bottom-px">
                      <span class="label">支付密码</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
            <!-- <li class="one-bottom-px" @click="addressJump()">
                <div>
                    地址管理
                </div>
                <div>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li> -->
            <!-- <li class="one-bottom-px" @click="certJump()">
                <div>
                    实名认证
                </div>
                <div>
                    <span v-if="identFlag">未认证</span>
                    <span class="redCircle" v-if="identFlag"></span>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li> -->
              <!-- <li class="one-bottom-px" @click="cardsJump()">
                  <div>
                      信用卡管理
                  </div>
                  <div>
                      <span v-if="cardsFlag">未绑定信用卡</span>
                      <span class="redCircle" v-if="cardsFlag"></span>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li> -->
              <!-- <li class="one-bottom-px" v-if="platform !== 1" @click="passupJump()">
                  <div>
                      修改登录密码
                  </div>
                  <div>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li>
              <li class="one-bottom-px" v-if="userinfo.payValidType === 1" @click="goPayPwd()">
                  <div>
                      修改支付密码
                  </div>
                  <div>
                      <span class="j1Png setUp-go"></span>
                  </div>
              </li> -->
          </ul>
        </div>



        <p class="setUp-goback" @click="loginOut()">退出登录</p>
    </div>
</template>
<script>
import headerTop from "../../common/header.vue";
import api from "@/service/api";
import { IsEmpty, getToken,delToken } from "@/util/common";
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            identFlag: true,
            cardsFlag: true
        };
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo',
            platform: 'platform/getPlatform'
        })
    },
    mounted() {
        if (this.$store.getters['userinfo/getUserInfo'].isRealCert == 0) {
            this.identFlag = true;
        }else{
            this.identFlag = false;
        }
        this.cards()
    },
    methods: {
        addressJump() {
          this.$router.push("/addressMag")
        },
        certJump() {
          window.location.href = hostUrl + "ticket/realName?token=" + getToken();
        },
        cardsJump() {
          window.location.href = hostUrl + "ticket/creditCard/home?token=" + getToken();
        },
        passupJump() {
          this.$router.push('/passSetUp')
        },
        goPayPwd() {
          this.$router.push('/payPassword')
        },
        loginOut(){
            delToken();
            this.$router.push("/login")
        },
        contact() {
          window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
        },
        cards: function() {
            let _this = this;
            var token = getToken();
            this.axios(infoURl + api.cards, {
                "token": token
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        if (data.data.length > 0) {
                            _this.cardsFlag = false;
                        } else {
                            _this.cardsFlag = true;
                        }
                    } else {
                        _this.cardsFlag = false;
                    }
                })
                .catch((err) => {
                    _this.cardsFlag = false;
                })
        },

    },
    components: {
        "header-top": headerTop
    }
};
</script>
<style lang="scss">
.setUp-contentW {
  padding: 0.32rem;
  padding-top: 0.08rem;
  color: #1A1A1A;
  font-weight: bold;
  position: relative;
  .setUp-content {
    padding: 0 0.32rem;
    background: #fff;
    margin-top: 0.24rem;
    border-radius: 10px;
    .main {
            position: relative;
            li {
              height: 1.04rem;
              font-size: 0.30rem;
              .leftW {
                position: absolute;
                top: 0.32rem;
                img {
                    display: inline-block;
                    width: 0.4rem;
                    height: 0.4rem;
                  }
              }

              .rightW {
                margin-left: 0.6rem;
                line-height: 1.04rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .arrow {
                  display: inline-block;
                  width: 0.4rem;
                  height: 0.4rem;
                  background-image: url(/static/images/me/setup/icon_go.png);
                  background-size: 100% 100%;
                }
                .edition {
                  position: absolute;
                  right: 0.4rem;
                  color: #9D9D9D;
                  font-size: 16px;
                  font-weight: 400;
                }
              }
            }
          }
    // li {
    //     display: flex;
    //     justify-content: space-between;
    //     padding: 0.38rem 0;
    //     .setUp-go {
    //         width: 0.16rem;
    //         height: 0.24rem;
    //         display: inline-block;
    //         background-position: -3.29rem -0.77rem;
    //     }
    //     .redCircle {
    //         width: 0.16rem;
    //         height: 0.16rem;
    //         background: #ff5a4c;
    //         border-radius: 50%;
    //         display: block;
    //         margin: 0 0.06rem 0 0.18rem;
    //     }
    //     div:nth-of-type(1) {}
    //     div:nth-of-type(2) {
    //         color: #999999;
    //         display: flex;
    //         align-items: center;
    //     }
    // }
  }
}


.setUp-goback {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    margin-left: -3.43rem !important;
    width: 6.86rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff;
    text-align: center;
    color: #1A1A1A !important;
    font-size: 0.32rem;
    font-weight: bold;
    border-radius: 10px;
}
</style>



