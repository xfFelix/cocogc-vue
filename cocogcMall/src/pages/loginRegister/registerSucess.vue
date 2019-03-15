<template>
    <!-- <transition enter-active-class="slideInRight" leave-active-class="slideOutRight"> -->
    <div id="registerSucess">

        <head>
            <router-link to="/login">跳过</router-link>
        </head>

        <div class="successInfo">
            <div class="sucessLogo">
                <span>

                </span>
            </div>
            <div class="sucessWord">
                <p>恭喜您成功注册</p>
                <p>欢迎您加入椰子竞技积分</p>
            </div>
        </div>

        <p class="realNameBnt" @click="show()">
            立即实名认证
        </p>
        <p class="lookPersonBnt">
            查看个人中心
        </p>
    </div>
</template>


<script>
// import api from "@/service/urlApi";

export default {
    data() {
        return {

        };
    },
    methods: {
        show() {
            this.$router.push('/certified')
            // this.$tips('register')
        }
    },
    mounted() {

    },
    components: {

    }
};
</script>


<style lang="less">
#registerSucess {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: #fff;
    head {
        background: url(/static/images/register_01.png) no-repeat;
        width: 100%;
        height: 232px;
        display: block;
        background-size: 100% 100%;
        a {
            font-size: 15px;
            color: #fff;
            margin: 0.72rem 0.43rem;
            float: right;
        }
    }
}

.successInfo {
    display: flex;
    justify-content: center;
    margin-top: 0.65rem;
    align-items: center
}

.sucessLogo {
    width: 45px;
    height: 45px;
    border: 2px solid #19ad6a;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.14rem;
    span {
        width: 24px;
        height: 33px;
        display: inline-block;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -71px -31px;
        background-size: 288px 93px;
    }
}

.sucessWord p:first-of-type {
    font-size: 18px;
    color: #333333;
}

.sucessWord {
    font-size: 12px;
    color: #999999;
}

.realNameBnt,
.lookPersonBnt {
    width: 5.4rem;
    height: 45px;
    text-align: center;
    border: 1px solid #4a4c5b;
    font-size: 15px;
    line-height: 45px;
    border-radius: 50px;
    margin: 0 auto;
}

.realNameBnt {
    background: #4a4c5b;
    color: #fff;
    margin-top: 0.8rem;
}

.lookPersonBnt {
    background: #fff;
    color: #4a4c5b;
    margin-top: 0.3rem;
}
</style>

