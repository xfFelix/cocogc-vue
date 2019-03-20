<template>
    <div class="setUp">
        <header-top></header-top>
        <ul class="setUp-content">
            <li class="one-bottom-px">
                <div>
                    地址管理
                </div>
                <div>
                    <span class="j1Png setUp-go" @click="$router.push('/addressMag')"></span>
                </div>
            </li>
            <li class="one-bottom-px">
                <div>
                    实名认证
                </div>
                <div>
                    <span v-if="identFlag">未认证</span>
                    <span class="redCircle" v-if="identFlag"></span>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li>
            <li class="one-bottom-px">
                <div>
                    信用卡管理
                </div>
                <div>
                    <span v-if="cardsFlag">未绑定信用卡</span>
                    <span class="redCircle" v-if="cardsFlag"></span>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li>
            <li class="one-bottom-px">
                <div>
                    登录密码
                </div>
                <div>
                    <span class="j1Png setUp-go"></span>
                </div>
            </li>
        </ul>

        <p class="button setUp-goback">退出</p>
    </div>
</template>
<script>
import headerTop from "../../common/header.vue";
import api from "@/service/api";
export default {
    data() {
        return {
            identFlag: true,
            cardsFlag:true
        };
    },
    mounted() {
        let isRealCert = localStorage.getItem("isRealCert");
        if (isRealCert) {
            this.identFlag = false;
        }

        this.cards()
    },
    methods: {
        cards: function() {
            let _this = this;
            var token = localStorage.getItem("yeyun_token");
            this.axios(infoURl + api.cards, {
                "token": token
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        if(data.data.length>0){
                            _this.cardsFlag = false;
                        }else{
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
<style lang="less">
.setUp-content {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0 0.34rem 0 0.56rem;
    li {
        display: flex;
        justify-content: space-between;
        padding: 0.38rem 0;
        .setUp-go {
            width: 0.16rem;
            height: 0.24rem;
            display: inline-block;
            background-position: -3.29rem -0.77rem;
        }
        .redCircle {
            width: 0.16rem;
            height: 0.16rem;
            background: #ff5a4c;
            border-radius: 50%;
            display: block;
            margin: 0 0.06rem 0 0.18rem;
        }
        div:nth-of-type(1) {}
        div:nth-of-type(2) {
            color: #999999;
            display: flex;
            align-items: center;
        }
    }
}

.setUp-goback {
    background: #30ce84;
    margin: 0.2rem 0.22rem 0 0.22rem;
}
</style>



