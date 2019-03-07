<template>
    <footer class="tabs one-top-px" v-show="hidshow">
        <div v-for="(item,index) in tableList" @click="selectNav(item.name)" :key='index' class="navTabWrap">
            <router-link :to="item.path" class="navTab">
                <span class="navImg" :class="isSelect == item.name ? item.iconGreen : item.icon"></span>
                <span :class="isSelect == item.name ? 'active' : ''">
                    {{item.title}}
                </span>
            </router-link>
        </div>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            tableList: [
                { title: '首页', path: '/index', icon: 'navGo01', iconGreen: 'navGo11', name: 'index' },
                { title: '商城', path: '/shopMall', icon: 'navGo02', iconGreen: 'navGo12', name: 'shopMall' },
                { title: '分类', path: '/classify', icon: 'navGo03', iconGreen: 'navGo13', name: 'classify' },
                { title: '购物车', path: '/shopCart', icon: 'navGo04', iconGreen: 'navGo14', name: 'shopCart' },
                { title: '我的', path: '/account', icon: 'navGo05', iconGreen: 'navGo15', name: 'account' },
            ],
            isSelect: 'index',
            screenHeight: document.body.clientHeight,// 这里是给到了一个默认值 （这个很重要），默认屏幕高度
            originHeight: document.body.clientHeight,//默认高度在watch里拿来做比较，实时屏幕高度
            hidshow: true  //显示或者隐藏footer
        }
    },
    created() {

    },
    watch: {
        screenHeight(val) {
            // this.screenHeight = val;
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function() {
                    // that.screenWidth = that.$store.state.canvasWidth
                    console.log(that.screenWidth)
                    // that.init()
                    that.timer = false
                }, 400)
            }
        },


    },
    methods: {
        selectNav(title) {
            var isThis = this;
            isThis.isSelect = title; //当点击或啥返回上一页时都可以获取当前的名称
            sessionStorage.setItem('isSelect', this.isSelect);  //sessionStorage(会话储存)储存名称为isSelect的变量  this.isSelect为值
        },




    },
    components: {

    },
    mounted() {

        // window.onresize监听页面高度的变化
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenHeight = document.body.clientHeight;
                that.screenHeight = window.screenHeight;
            })()
        }



        this.isSelect = sessionStorage.getItem('isSelect');   //sessionStrorage(会话储存)获取之前储存的内容
        if (this.$route.name == "index" || this.$route.name == 'shopMall' || this.$route.name == 'classify' || this.$route.name == 'shopCart' || this.$route.name == 'account') {
            this.selectNav(this.$route.name);   //当前页面为index或者notice或者activity或者my时执行获取当前url的name  
        }



    },
}
</script>
<style lang="less">
.tabs {
    width: 100%;
    height: 49px; // position: absolute!important;
    background: #fff; // position: fixed;
    bottom: 0;
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

            .navImg {
                width: 0.42rem;
                height: 0.42rem;
                display: inline-block;
                background-image: url(/static/images/banner.png);
                background-repeat: no-repeat;
                background-size: 4.82rem 1.97rem;
                position: relative;
                color: #000000; // border: 1px solid #000;
                margin: 0 auto;
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
