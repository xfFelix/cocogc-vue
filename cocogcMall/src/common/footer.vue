<template>
    <footer class="tabs" v-show="hideShow">
        <div v-for="(item,index) in tableList" @click="selectNav(item.name)" :key='index' class="navTabWrap">
            <router-link :to="item.path" class="navTab">
                <span class="navImg" :class="isSelect == item.name ? item.iconGreen : item.icon"></span>
                <span :class="isSelect == item.name ? 'active' : ''">
                    {{item.title}}
                </span>
                <span v-if="item.name === 'shopCart' && token && num" class="num">{{num}}</span>
            </router-link>
        </div>
    </footer>
</template>
<script>
import {mapGetters} from 'vuex';
import { getToken } from '@/util/common'
export default {
    data() {
        return {
            tableList: [
                { title: '首页', path: 'home', icon: 'navGo01', iconGreen: 'navGo11', name: 'home' },
                { title: '商城', path: 'shopMall', icon: 'navGo02', iconGreen: 'navGo12', name: 'shopMall' },
                { title: '分类', path: 'classify', icon: 'navGo03', iconGreen: 'navGo13', name: 'classify' },
                { title: '购物车', path: 'shopCart', icon: 'navGo04', iconGreen: 'navGo14', name: 'shopCart' },
                { title: '我的', path: 'account', icon: 'navGo05', iconGreen: 'navGo15', name: 'account' },
            ],
            isSelect: 'home',
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hideShow:true,
            token: getToken()
        }
    },
    created() {

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
        selectNav(title) {
            var isThis = this;
            isThis.isSelect = title; //当点击或啥返回上一页时都可以获取当前的名称
            sessionStorage.setItem('isSelect', this.isSelect);
        },
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
        if (this.$route.name == "home" || this.$route.name == 'shopMall' || this.$route.name == 'classify' || this.$route.name == 'shopCart' || this.$route.name == 'account') {
            this.selectNav(this.$route.name);
        }
    },
}
</script>
<style lang="less">
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
            .navImg {
                width: 0.42rem;
                height: 0.42rem;
                display: inline-block;
                background-image: url(/static/images/banner.png?_=1);
                background-repeat: no-repeat;
                background-size: 4.82rem 1.97rem;
                position: relative;
                color: #000000; // border: 1px solid #000;
                margin: 0 auto;
            }
            .num {
              position: absolute;
              right: 17px;top: 1px;
              padding: 1px 3px;
              background: #fb5c5c;
              color: #fff;
              border-radius: 50%;
              font-size: 0.22rem;
            }
            .navGo01 {
                background-position: -0.1rem -0.73rem;
            }
            .navGo02 {
                background-position: -0.65rem -0.73rem;
            }
            .navGo03 {
                background-position: -1.17rem -0.73rem;
            }
            .navGo04 {
                background-position: -1.71rem -0.73rem;
            }
            .navGo05 {
                background-position: -2.24rem -0.73rem;
            }
            .navGo11 {
                background-position: -0.1rem -1.29rem;
            }
            .navGo12 {
                background-position: -0.65rem -1.29rem;
            }
            .navGo13 {
                background-position: -1.17rem -1.29rem;
            }
            .navGo14 {
                background-position: -1.71rem -1.29rem;
            }
            .navGo15 {
                background-position: -2.24rem -1.29rem;
            }
        }
    }
}
</style>
<style>
@media screen and (min-width: 600px) {
  .tabs {
    max-width: 450px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

