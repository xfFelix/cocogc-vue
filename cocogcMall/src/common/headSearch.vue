<template>
    <div class="home-sm">
        <div class="j1Png home-back" @click="$router.go(-1)"></div>
        <div class="home-search">
            <div class="home-smInput">
                <span class="j1Png home-logo"></span>
                <span class="j1Png home-searchL"></span>
                <p class="home-searchI">
                    <input type="text" placeholder="请输入要搜索的内容" v-model="searchCont" />
                </p>
            </div>
            <span class="home-smdel" @click="cleanInp">
                <span class="j1Png home-smdelImg"></span>
            </span>
        </div>
        <div class="home-smClose">
            搜索
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchCont: ''
        }
    },
    methods:{
        cleanInp(){
            this.searchCont =""
        }
    }
}
</script>
<style lang="less">
.home-sm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .home-search {
        width: 78%; //   background: rgba(0, 0, 0, 0.25);
        border: 1px solid #dfdfdf;
        height: 0.6rem;
        border-radius: 0.6rem;
        display: flex;
        align-items: center; // margin: 0 auto;
        justify-content: space-between;
        .home-smInput {
            display: flex;
            align-items: center;
            width: 88%;
            height: 0.5rem;
            .home-logo {
                height: 0.38rem;
                width: 0.42rem;
                background-position: -2.16rem -0.18rem;
                margin: 0.1rem 0.12rem;
            }
            .home-searchL {
                height: 0.26rem;
                width: 0.26rem;
                background-position: -5.03rem -0.26rem;
                margin-right: 0.04rem;
            }
            .home-searchI {
                height: 100%;
                width: 80%;
                display: inherit;
                padding-left: 0.1rem;
                input {
                    width: 100%;
                    font-size: 0.26rem;
                    border: none;
                    background: transparent;
                    color: #333;
                }
                 ::-webkit-input-placeholder {
                    /* WebKit, Blink, Edge */
                    color: #dfdfdf;
                    font-size: 0.26rem;
                }

                 :-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: #dfdfdf;
                    font-size: 0.26rem;
                }

                 ::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #dfdfdf;
                    font-size: 0.26rem;
                }

                input:-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: #dfdfdf;
                    font-size: 0.26rem;
                }
            }
        }

        .home-smdel {
            width: 0.46rem;
            height: 0.46rem;
            border-radius: 50%;
            background: #efefef;
            margin-right: 0.07rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .home-smdelImg {
                height: 0.22rem;
                width: 0.2rem;
                background-position: -0.54rem -0.76rem;
            }
        }
    }
    .home-smClose {
        margin-right: 0.27rem;
    }
}

.home-back {
    width: 0.25rem;
    height: 0.36rem;
    background-position: -0.2rem -0.76rem;
    transform: rotate(180deg);
    margin: 0 0.19rem;
}
</style>
