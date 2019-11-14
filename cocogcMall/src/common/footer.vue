<template>
    <footer class="tabs" v-show="hideShow">
        <div v-for="(item,index) in tableList" @click="selectNav(item.name)" :key='index' class="navTabWrap">
            <router-link :to="item.path" class="navTab">
                <!-- <span class="navImg" :class="isSelect == item.name ? item.iconGreen : item.icon"></span> -->
                <img :src="item.id == 2 ? setIcon(item) : (`/static/images/home/${item.icon}${isSelect == item.name ? '-actived': ''}.png`)" alt="" class="icon">
                <span :class="isSelect == item.name ? 'active' : ''">
                    {{item.title}}
                </span>
                <span v-if="item.name === 'shopCart' && token && num" class="num">{{num}}</span>
            </router-link>
        </div>
    </footer>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import { getToken } from '@/util/common'
export default {
    data() {
        return {
            tableList: [
                { id: '1', title: '首页', path: 'home', icon: 'home', iconGreen: 'navGo11', name: 'home' },
                { id: '2', title: '超市', path: 'shopMall', icon: 'supermarket', iconGreen: 'navGo12', name: 'shopMall' },
                { id: '3', title: '分类', path: 'classify', icon: 'classify', iconGreen: 'navGo13', name: 'classify' },
                { id: '4', title: '购物车', path: 'shopCart', icon: 'cart', iconGreen: 'navGo14', name: 'shopCart' },
                { id: '5', title: '我的', path: 'account', icon: 'mine', iconGreen: 'navGo15', name: 'account' },
            ],
            isSelect: 'home',
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hideShow:true,
            token: getToken()
        }
    },

    computed: {
      ...mapGetters({
        num: 'cart/getNum',
        // tableList: 'tab/getList'
      })
    },
    watch: {
      showHeight:function() {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        if (isAndroid) {
            if(this.docmHeight > this.showHeight){
                this.hideShow = false
            }else{
                this.hideShow = true
            }
        }
      },
      '$route': {
          handler(val) {
              this.isSelect = val.name
          },
          immediate: true
      }
    },
    methods: {
      ...mapActions({
        initConfig:'channel/initConfig'
      }),
        selectNav(title) {
            this.initConfig();
            var isThis = this;
            isThis.isSelect = title; //当点击或啥返回上一页时都可以获取当前的名称
            sessionStorage.setItem('isSelect', this.isSelect);
        },
        setIcon(item) {
          return item.id == 2 && `${LOGO_PACKAGE_URL}/${item.icon}${this.isSelect == item.name ? '-actived': ''}.png`
        }
    },
    components: {

    },

    mounted() {
        // window.onresize监听页面高度的变化
        const that = this;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.onresize = () => {
              return (() => {
                  this.showHeight = document.body.clientHeight;
              })()
          }
        }
        this.isSelect = sessionStorage.getItem('isSelect');
        if (this.$route.name == "home" || this.$route.name == 'shopMall' || this.$route.name == 'classify' || this.$route.name == 'shopCart' || this.$route.name == 'account' ||this.$route.name == 'channel') {
            this.selectNav(this.$route.name);
        }
    },
}
</script>
<style lang="scss" scoped>
@import '../scss/mixin.scss';
.tabs {
    width: 100%;
    height: 49px; // position: absolute!important;
    background: #fff; // position: fixed;
    bottom: -1px;
    left: 0;
    display: flex;
    font-size: 16px;
    box-shadow: 4px -3px 5px 0px rgba(225, 235, 255, 0.64);
    z-index: 11;
    font-size: 0.24rem; // position: absolute!important;
    position: fixed;
    .navTabWrap {
        width: 25%;
        .navTab {
            text-align: center;
            flex-direction: column;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: relative;
            .icon{
              width: px2rem(24);
              height: px2rem(24);
              margin: px2rem(3) auto px2rem(1);
            }
            .num {
              position: absolute;
              right: 17px;top: 1px;
              padding: 2px 5px;
              background: #fb5c5c;
              color: #fff;
              border-radius: 50%;
              font-size: 12px;
              transform: scale(.73);
            }
        }
    }
}
</style>
<style>
@media screen and (min-width: 600px) {
  .tabs {
    max-width: 450px;
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>

