<template>
    <div class="guesslike">
        <div class="home-integralW">
            <div class="home-rHM">
                <h3>猜你喜欢</h3>
            </div>
            <div class="home-interWrap">
                <div class="home-iGoodsW">
                    <div class="home-iGoods">
                        <img src="static/images/goos_01.png" alt="" />
                        <span class="home-iTags">
                            <span class="iGoods"></span>
                            <span class="iDrop">直降</span>
                            <span class="iSelf">自营</span>
                        </span>
                    </div>
                    <p class="home-iNmame">
                        联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                    </p>
                    <div class="home-iMoneyW">
                        <span class="home-iMoneyL"></span>
                        <span class="home-iMoney">6848.00</span>
                    </div>
                </div>

                <div class="home-iGoodsW">
                    <div class="home-iGoods">
                        <img src="static/images/goos_01.png" alt="" />
                        <span class="home-iTags"></span>
                    </div>
                    <p class="home-iNmame">
                        联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                    </p>
                    <div class="home-iMoneyW">
                        <span class="home-iMoneyL"></span>
                        <span class="home-iMoney">6848.00</span>
                    </div>
                </div>

                <div class="home-iGoodsW">
                    <div class="home-iGoods">
                        <img src="static/images/goos_01.png" alt="" />
                        <span class="home-iTags"></span>
                    </div>
                    <p class="home-iNmame">
                        联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                    </p>
                    <div class="home-iMoneyW">
                        <span class="home-iMoneyL"></span>
                        <span class="home-iMoney">6848.00</span>
                    </div>
                </div>

                <div class="home-iGoodsW">
                    <div class="home-iGoods">
                        <img src="static/images/goos_01.png" alt="" />
                        <span class="home-iTags"></span>
                    </div>
                    <p class="home-iNmame">
                        联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                    </p>
                    <div class="home-iMoneyW">
                        <span class="home-iMoneyL"></span>
                        <span class="home-iMoney">6848.00</span>
                    </div>
                </div>

                <div class="home-iGoodsW">
                    <div class="home-iGoods">
                        <img src="static/images/goos_01.png" alt="" />
                        <span class="home-iTags"></span>
                    </div>
                    <p class="home-iNmame">
                        联想ThinkPad 14英寸轻 薄窄边框笔记本电脑新...
                    </p>
                    <div class="home-iMoneyW">
                        <span class="home-iMoneyL"></span>
                        <span class="home-iMoney">6848.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>


<style lang="less">
.guesslike {
    .home-integralW {
        width: 100%;
        background: #fff;
        border-top: 1px solid transparent;
        margin-bottom: 0.8rem;
        .home-rHM {
            h3 {
                font-size: 0.3rem;
                font-weight: 100;
                margin: 0.43rem 0 0.05rem 0.32rem;
            }
        }
        .home-interWrap {
            width: 100%;
            overflow: auto;
            padding-bottom: 80px;
        }
        .home-iGoodsW {
            float: left;
            width: 50%;
            padding: 0 0.32rem;
            box-sizing: border-box;
            .home-iGoods {
                width: 100%;
                text-align: center;
                border-bottom: 1px solid #e6e6e6;
                height: 3.16rem;
                position: relative;
                img {
                    width: 100%;
                }
                .home-iTags {
                    position: absolute;
                    bottom: 0.05rem;
                    left: 0;
                    font-size: 0.18rem;
                    display: flex;
                    align-items: flex-end;
                    .iGoods {
                        width: 0.9rem;
                        height: 0.32rem;
                        display: inline-block;
                        background-image: url(/static/images/jl.png);
                        background-repeat: no-repeat;
                        background-position: -3.67rem -0.26rem;
                        background-size: 5.8rem 1.86rem;
                        margin-right: 0.08rem;
                    }
                    .iDrop {
                        margin-right: 0.08rem;
                        background: #000000;
                        color: #fff; // padding: 0.04rem 0.07rem 0.01rem 0.07rem;
                        display: inline-block;
                        padding: 0.04rem 0.07rem 0.02rem 0.07rem;
                    }
                    .iSelf {
                        background: #30ce84;
                        color: #fff;
                        padding: 0.04rem 0.07rem 0.02rem 0.07rem;
                        display: inline-block;
                    }
                }
            }
            .home-iNmame {
                color: #333333;
                font-size: 0.26rem;
                line-height: 0.36rem;
                margin-top: 0.12rem;
            }
            .home-iMoneyW {
                display: flex;
                align-items: center;
                .home-iMoneyL {
                    width: 0.26rem;
                    height: 0.28rem;
                    display: inline-block;
                    background-image: url(/static/images/jl.png);
                    background-repeat: no-repeat;
                    background-position: -2.57rem -0.78rem;
                    background-size: 5.8rem 1.86rem;
                    margin-right: 0.03rem;
                }
            }
        }
    }
}
</style>