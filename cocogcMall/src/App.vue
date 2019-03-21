<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { IsEmpty, getToken } from "@/util/common";
import api from '@/service/api';
import { mapActions } from 'vuex';


export default {
    name: 'App',
    created() {

    },
    components: {

    },
    watch: {

    },
    methods: {
        // getToken: function() {
        //     let _this = this;
        //     var token = getToken();
        //     if (IsEmpty(token)) {
        //         this.$router.push('/login');
        //     } else {
        //         _this.info()
        //     }
        // },

        //地址列表，拿地址id
        addressMag: function(token) {
            let _this = this;
            var token = localStorage.getItem("yeyun_token");
            this.axios(testUrl + api.selectAddresses, {
                "token": token
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.addressList = data.data;
                        localStorage.setItem("addressId", data.data[0].id);
                    } else {
                        this.Toast(data.message);
                    }
                })
                .catch((err) => {
                    this.Toast(err.message)
                })
        },
        ...mapActions({
          setNum: 'cart/setNum'
        }),
        getCarInfo(callback) {
            this.axios(testUrl + api.totalCarts,
                {
                    token: getToken()
                },
                'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        if (callback)
                            callback(data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        info: function() {
            let _this = this;
            var token = localStorage.getItem("yeyun_token");
            this.axios(infoURl + api.info, {
                "token": token
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        localStorage.setItem('userName', data.data.userName);
                        localStorage.setItem('score', data.data.score);
                        localStorage.setItem('isRealCert', data.data.isRealCert);
                        this.$router.push('/layout/home');
                        _this.addressMag(token);
                    } else {
                        localStorage.setItem('score', '');
                        this.$router.push('/login');
                        localStorage.removeItem("yeyun_token");
                        this.delCookie("yeyun_token");
                    }
                })
                .catch((err) => {
                    localStorage.setItem('score', '');
                    this.$router.push('/login');
                    localStorage.removeItem("yeyun_token");
                    this.delCookie("yeyun_token");
                })
        },



    },
    beforeMounted() {

    },
    mounted() {
        // this.getToken();
        this.getCarInfo(data => {
          this.setNum(data)
        })
    }
}


</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%; // background: #eef1f6;
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


