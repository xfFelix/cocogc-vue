<template>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <div id="passSetSucess">
            <div class="registHead" @click="$router.back(-1)">
                <span class="triangleUp"></span>
                <span class="triangleDown"></span>
            </div>
            <div class="sucessLogo">
                <span></span>
            </div>
            <div class="sucessInfo">恭喜您！密码设置成功。</div>
            <p class="bnt" @click="$router.push('/login')">立即登录</p>
        </div>

    </transition>
</template>


<script>


</script>


<style lang="scss">
#passSetSucess {
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    .registHead {
        position: absolute;
        left: 0.5rem;
        top: 0.7rem;
    }

     .sucessLogo {
        width: 45px;
        height: 45px;
        border: 2px solid #19ad6a;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2.42rem auto 0.56rem auto;
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

    .sucessInfo {
        font-size: 15px;
        color: #333333;
        margin-bottom: 0.8rem;
        text-align: center;
    }
}


</style>

