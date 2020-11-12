<template>
    <div class="setUp">
        <header-top></header-top>
        <div class="setUp-contentW">
          <div class="aboutW">
            <img src="/static/images/me/setup/logo.png" alt="">
            <p class="title">竞技积分兑换商城</p>
            <p class="sub-title">当前版本号：V2.1.2</p>
          </div>
          <ul class="setUp-content">
            <div class="main" @click="passupJump()">
                  <li>
                    <div class="rightW one-bottom-px">
                      <span class="label">帮助中心</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
              <div class="main" @click="$router.push({name: 'serviceProtocol'})">
                  <li>
                    <div class="rightW one-bottom-px">
                      <span class="label">用户服务协议</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
              <div class="main" @click="$router.push({name: 'privateProtocol'})">
                  <li>
                    <div class="rightW one-bottom-px">
                      <span class="label">隐私政策</span>
                      <span class="arrow"></span>
                    </div>
                  </li>
              </div>
          </ul>
        </div>

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
        // this.cards()
    },
    methods: {
      passupJump() {
        window.location.href = 'https://mp.weixin.qq.com/s/YjTWs8Ep1lpIYeSXJTH03Q';
      }
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
  .aboutW {
    text-align: center;
    img {
      padding-top: 0.72rem;
      margin: 0 auto;
      width: 1.6rem;
      height: 1.6rem;
    }
    .title {
      margin-top: 0.32rem;
      font-size: 0.36rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #1A1A1A;
    }
    .sub-title {
      margin-top: 0.12rem;
      margin-bottom: 0.72rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: #9D9D9D;
    }
  }
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
                // margin-left: 0.6rem;
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
                  font-size: 0.32rem;
                  font-weight: 400;
                }
              }
            }
          }
  }
}

</style>



