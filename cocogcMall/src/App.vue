<template>
    <div id="app">
        <router-view></router-view>
        <v-footer v-if="footerShow"></v-footer>
    </div>
</template>

<script>
import { IsEmpty, getToken } from "@/util/common";
import Footer from '@/common/footer.vue';
import api from '@/service/api';


export default {
    name: 'App',
    data() {
        return {
            footerShow: true
        }
    },
    created() {

    },
    components: {

    },
    watch: {
        //以路径来判断是否需要底部
        // '$route'(to, from) {
        //     if (to.path == '/shopMall' ||to.path == '/account' ||to.path == '/index'||to.path == '/classify'||to.path == '/shopCart' || to.path == '/addressMag' || to.path == '/addressEdit' || to.path =='/orderManage') {
        //         this.footerShow = true;
        //     } else {
        //         this.footerShow = false;
        //     }
        // },
    },
    methods: {
        getToken: function() {
            var token = getToken();
            console.log(token)
            if (IsEmpty(token)) {
                this.$router.push('/login');
            } else {
                this.addressMag(token)
            }
        },

        //地址列表，拿地址id
        addressMag: function(token) {
            let _this = this;
            var token = localStorage.getItem("token");
            this.axios(testUrl + api.selectAddresses, {
                "token": token
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.addressList = data.data;
                        localStorage.setItem("addressId", data.data[0].id)
                    } else {

                    }
                })
                .catch((err) => {
                })
        },

        // 退出登录的时候才需{要
        // delToken: function() {
        //     localStorage.removeItem("token");
        //     this.delCookie("yeyun_token");
        // },

    },
    beforeMounted() {

    },
    mounted() {
        this.getToken();
        this.$cookies.set("yeyun_token",'hhf7512935295b36d9b469e672c531d4c8');
        // localStorage.setItem("token", 'hhf7512935295b36d9b469e672c531d4c8');

    },
    components: {
        "v-footer": Footer,
    }
}


</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
    // background: #eef1f6;
}

.order-head {
    height: 1.48rem;
    background: #fff;
    text-align: center;
    line-height: 1.48rem;
    font-size: 0.28rem;
    color: #000000;
    font-weight: 100;
    .goBack {
        width: 0.22rem;
        height: 0.38rem;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-size: 5.8rem 1.86rem;
        background-position: -0.2rem -0.74rem;
        position: absolute;
        left: 0.32rem;
        top: 0.56rem;
        transform: rotate(180deg);
    }
}

// .router-link-active {
//     text-decoration: none;
// }
// .navImgWrap {
//     display: flex;
//     justify-content: space-around;
//     font-size: 0.24rem;
//     height: 49px;
//     .navTab {
//         text-align: center;
//         flex-direction: column;
//         display: flex;
//         justify-content: center;
//         margin: 0 auto;
//         .navImg {
//             width: 0.42rem;
//             height: 0.42rem;
//             display: inline-block;
//             background-image: url(/static/images/banner.png);
//             background-repeat: no-repeat;
//             background-size: 4.82rem 1.97rem;
//             position: relative;
//             color: #000000; // border: 1px solid #000;
//             margin: 0 auto;
//         }
//         .navGo01 {
//             background-position: -0.1rem -0.73rem;
//         }
//         .navGo02 {
//             background-position: -0.65rem -0.73rem;
//         }
//         .navGo03 {
//             background-position: -1.17rem -0.73rem;
//         }
//         .navGo04 {
//             background-position: -1.71rem -0.73rem;
//         }
//         .navGo05 {
//             background-position: -2.24rem -0.73rem;
//         }
//         .navGo11 {
//             background-position: -0.1rem -1.29rem;
//         }
//         .navGo12 {
//             background-position: -0.65rem -1.29rem;
//         }
//         .navGo13 {
//             background-position: -1.17rem -1.29rem;
//         }
//         .navGo14 {
//             background-position: -1.71rem -1.29rem;
//         }
//         .navGo15 {
//             background-position: -2.24rem -1.29rem;
//         }
//     }
// }
.active {
    color: #30CE84;
}

// .navTabWrap {
//     display: flex;
//     align-items: center;
//     width: 25%;
// }
</style>


