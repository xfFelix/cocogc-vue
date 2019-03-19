<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { IsEmpty, getToken } from "@/util/common";
import api from '@/service/api';


export default {
    name: 'App',
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
.active {
    color: #30CE84;
}

</style>


