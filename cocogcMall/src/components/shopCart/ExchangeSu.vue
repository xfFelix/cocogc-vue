<template>
    <div class="changeSuccessW">
        <div class="changeSuccess">
            <p class="cs-bgImg">
                <img src="static/images/changeSuccess.jpg" alt="" />
            </p>
            <p class="cs-info">兑换成功</p>
            <p class="cs-money">{{chMessage}}</p>
            <router-link :to="{ name: 'orderDetails', params: { orderId: chOrderId } }" class="cs-bntGoDe">订单详情</router-link>
            <router-link to="/layout/home" class="cs-bntGoIndex">返回首页</router-link>
            <p class="cs-jumpIndex">{{this.numDown}}秒后自动进入首页</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        chOrderId: String,
        chMessage: String
    },
    data() {
        return {
            numDown:5
        };
    },
    mounted() {
        let countDown =  setInterval(()=>{
            this.numDown = this.numDown-1
            if(this.numDown<2){
                this.$router.push({ name: 'orderDetails', params: { orderId: this.chOrderId } });
                clearInterval(countDown)
            }
        },1000)
    }
}
</script>
<style lang="less" scoped>
.changeSuccessW {
    background: #fff;
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    .changeSuccess {
        color: #333333;
        .cs-bgImg {
            width: 1.06rem;
            height: 1.06rem;
            text-align: center;
            margin: 1.34rem auto 0.35rem auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .cs-info {
            font-size: 0.3rem;
            text-align: center;
        }
        .cs-money {
            font-size: 0.6rem;
            margin: 0.41rem 0 0.64rem 0;
            text-align: center;
        }
        .cs-bntGoDe,
        .cs-bntGoIndex {
            height: 45px;
            border-radius: 44px;
            line-height: 45px;
            text-align: center;
            margin: 0.3rem auto;
            width: 90%;
            display: block;
        }
        .cs-bntGoDe {
            background-color: #36d289;
            box-shadow: 8px 13px 10px 0px rgba(135, 248, 199, 0.2);
            color: #fff;
        }
        .cs-bntGoIndex {
            box-shadow: 8px 13px 10px 0px rgba(135, 248, 199, 0.2);
            border: solid 1px #31ce84;
            color: #31ce84;
        }
        .cs-jumpIndex {
            text-align: center;
        }
    }
}
</style>
