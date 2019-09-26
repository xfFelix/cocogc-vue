<template>
    <div class="home-integralW">
        <div class="home-rHM">
            <h3>积分区间</h3>
            <!-- <span class="home-rMore" @click="$router.push('/goodsList')"></span> -->
        </div>
        <p class="home-hSE">INTEGRAL DIMENSION</p>
        <div class="home-iSelectW">
            <ul class="home-iSelect">
                <li v-for="(item,index) in homeSel" :key="index" v-show="item.homeSelShow" @click="iSelect(item,index)" :class="item.id==iSelectAct?'iSelectCla':'iSelectNo'">
                    {{item.integralInfo}}
                </li>
            </ul>

            <span class="home-iMore" @click="integraM()">
                <span class="home-iMoreGo j1Png" :class="homeSelFlag?'home-iMoreGob':'home-iMoreGoa'"></span>
            </span>
        </div>

        <div class="home-interWrap">
            <div class="home-iGoodsW" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
                <div class="home-iGoods one-bottom-px">
                    <img v-lazy="item.image" alt="" />
                </div>
                <p class="home-iNmame">
                    {{item.name}}
                </p>
                <div class="home-iMoneyW">
                    <img :src="logoImg" alt="" class="logo-black-img">
                    <span class="home-iMoney">{{item.currentPrice|toDecimal2}}</span>
                    <span class="home-iMoneymar" v-if="item.currentPrice!=item.marketPrice">{{item.marketPrice|toDecimal2}}</span>
                </div>
            </div>
        </div>
        <no-data :data="goodsList" v-if="!showLoading"></no-data>
        <circle-arc v-else></circle-arc>
        <div class="spinWrap" v-if="tenFlag&&goodsList.length"><mt-spinner :size="12"  type="snake"></mt-spinner>&nbsp;&nbsp;正在加载中...</div>
        <div class="spinWrap" v-if="!tenFlag&&goodsList.length">没有更多数据了~~</div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import api from '../../service/api';
import { mapGetters } from 'vuex';
import { getToken } from '@/util/common'
import CircleArc from '@/common/loading/CircleArc'

export default {
    data() {
        return {
            homeSel: [
                { id: 0, integral: '0~' + parseInt(this.$store.getters['userinfo/getUserInfo'].score), homeSelShow: true, integralInfo: '我能兑换', args: '0-' + parseInt(this.$store.getters['userinfo/getUserInfo'].score) },
                { id: 1, integral: "0~50", homeSelShow: true, integralInfo: '0~50', args: '0-50' },
                { id: 2, integral: "51~200", homeSelShow: true, integralInfo: '51~200', args: '51-200' },
                { id: 3, integral: "201~1000", homeSelShow: true, integralInfo: '201~1000', args: '201-1000' },
                { id: 4, integral: "1001~5000", homeSelShow: true, integralInfo: '1001~5000', args: '1001-5000' },
                { id: 5, integral: "5001~*", homeSelShow: true, integralInfo: '5000以上', args: '5001-*' },
            ],
            logoImg: LOGO_PACKAGE_URL + 'logo-black.png',
            homeSelFlag: 0,
            iSelectAct: 0,
            iSintegra: '',
            goodsList: [],
            token: getToken(),
            page: 0,
            rows: 10,
            allLoaded: false,
            tenFlag:false,
            showLoading: false
        }
    },
    components: {
      CircleArc
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo/getUserInfo'
        }),
        offset() {
          return this.page * this.rows + 1
        }
    },
    mounted() {
        //积分列表展示
        this.homeSel.forEach((item, index) => {
            if (index > 4) {
                item.homeSelShow = false
            }
        })

        if (this.token && this.userinfo.score > 0) {
            this.iSelectAct = 0
            this.price(this.homeSel[0].args, 'first');
            this.iSintegra = this.homeSel[0].args
        } else {
            this.iSelectAct = 1
            this.price(this.homeSel[1].args, 'first');
            this.iSintegra = this.homeSel[1].args
        }

        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
     		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
     		//变量windowHeight是可视区的高度
     		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
     		//变量scrollHeight是滚动条的总高度
     		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        if (this.allLoaded) {
          return
        }
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          if (this.offset) {
            this.price(this.iSintegra)
          }
         	console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        }
      },
        //带积分到列表页
        toGoodsList() {
            this.$router.push({ path: '/goodsList', query: { integra: this.iSintegra } })
        },
        // 积分区间
        integraM() {
            if (this.homeSelFlag == 0) {
                this.homeSel.forEach((item, index) => {
                    if (index > 4) {
                        item.homeSelShow = true;
                    }
                })
                this.homeSelFlag = 1;
            } else {
                this.homeSel.forEach((item, index) => {
                    if (index > 4) {
                        item.homeSelShow = false;
                    }
                })
                this.homeSelFlag = 0;
            }
        },
        goDetail(item) {
            this.$router.push({
                path: '/goodsDetail/' + item.id
            })
        },
        iSelect(item, index) {
            if (item.integral == '0~NaN') {
                MessageBox.confirm('', {
                    message: '<div>登录后查看您可兑换的商品</div><div>立即登录?</div>',
                    title: '提示',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                        this.$router.push({ path: '/login' })
                    }
                })
                return
            } else {
                this.init()
                this.iSelectAct = index;
                this.price(item.integral, 'first');
                this.iSintegra = item.integral.replace('~', '-');
            }
        },
        init() {
          this.page = 1
          this.goodsList = []
        },
        price(integral, first) {
            this.showLoading = true
            let integrals = this.charReplace(integral)
            this.axios(jdTestUrl + api.price, {
                "price": integrals,
                "offset": this.offset,
                "rows": this.rows
            }, 'get')
                .then((data) => {
                    this.showLoading = false
                    if (data.code == 0) {
                        if (first) {
                          this.goodsList = data.list
                        } else {
                          this.goodsList.push(...data.list)
                        }
                        this.allLoaded = !(data.list.length === this.rows)
                        this.page ++
                        if(data.list.length>9){
                          this.tenFlag = true;
                        }else{
                          this.tenFlag = false;
                        }

                    } else {
                        this.Toast(data.message)
                    }
                }).catch((e) => {
                    this.showLoading = false
                })
        },
        charReplace(data){
          if (data) {
            return data.replace('~', '-')
          }
        }
    }

}
</script>
<style lang="scss" scoped>
.home-integralW {
    width: 100%;
    background: #fff;
    margin-top: 0.3rem;
    border-top: 1px solid transparent;
    .home-iSelectW {
        color: #333333;
        font-size: 0.2rem;
        overflow: auto;
        display: flex;
        justify-content: space-around; // margin-bottom: 0.2rem;
        .home-iSelect {
            width: 6.90rem;
            li {
                width: 17.54%; // height: 0.56rem;
                line-height: 0.65rem;
                text-align: center; // border: 1px solid #ccc;
                float: left;
                margin: 0 0 0.15rem 1.77%;
                padding: 3px 0;
                border-radius: 2rem;
            }
        }
        .home-iMore {
            width: 5.4%;
            height: 0.58rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dfdfdf;
            border-radius: 1rem; // margin-right: 0.09rem;
            text-align: center;
            .home-iMoreGo {
                background-position: -3.24rem -0.76rem; // transform: rotate(90deg);
                width: 0.25rem;
                height: 0.25rem;
                display: inline-block;
                transition: all 0.4s;
            }
            .home-iMoreGoa {
                transform: rotate(90deg);
            }
            .home-iMoreGob {
                transform: rotate(-90deg);
            }
        }
        .iSelectNo {
            border: 1px solid rgba(0, 0, 0, 0.06);
            color: #333333;
        }
        .iSelectCla {
            color: #fff;
            background: #30ce84;
            border: none;
            border: 1px solid #30ce84;
        }
    }
    .home-interWrap {
        width: 100%;
        overflow: auto;
        &::after{
          content: '';
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
    }
    .home-iGoodsW {
        float: left;
        width: 50%;
        padding: 0 0.32rem;
        box-sizing: border-box;
        margin: 0.2rem 0;
        .home-iGoods {
            width: 100%;
            text-align: center; // border-bottom: 1px solid #e6e6e6; // height: 3.16rem;
            position: relative;
            img {
                width: 100%; // margin-top: 0.5rem;
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
            font-weight: bold;
            margin-top: 0.12rem;
            position: relative;
            line-height: 1.5em;
            height: 2.9em;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
            text-align: left;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                padding: 0 5px;
                background-color: #fff;
            }
        }
        .home-iMoneyW {
            display: flex;
            align-items: center;
            margin: 0.1rem 0;
            text-align: left;
            .logo-black-img{
              width: 20px;
              height: 20px;
            }
        }
    }
    .home-integralM {
        padding: 0.33rem 0;
        text-align: center;
        font-size: 0.3rem; // margin-bottom: 49px;
    }
    .spinWrap{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      line-height: 32px;
      font-size: 14px;
    }
}
.home-rank,
.home-integralW {
  .home-hSE {
    font-size: 0.24rem;
    color: #999999;
    margin: 0 0 0.49rem 0.35rem;
  }
  .home-rHM {
    margin: 0.44rem 0 0.12rem 0.35rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 0.36rem;
    }
    .home-rMore {
      background-image: url(/static/images/jl.png);
      background-repeat: no-repeat;
      background-position: -4.81rem -0.26rem;
      background-size: 6rem 1.86rem;
      width: 0.34rem;
      height: 0.27rem;
      margin-right: 0.44rem;
    }
  }
}
.chaos-loading {
	overflow: hidden;
	position: relative;
	border-radius: 100%;
	width: 200px;
	height: 200px;
	&::after {
		display: block;
		filter: drop-shadow(2px 4px 6px #000);
		line-height: 200px;
		text-align: center;
		font-weight: bold;
		font-size: 30px;
		color: #fff;
		content: "Loading...";
	}
	li {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 100%;
		width: 100px;
		height: 100px;
		filter: blur(25px);
		animation: move 2s linear infinite;
		&:nth-child(1) {
			background-color: #f66;
		}
		&:nth-child(2) {
			background-color: #66f;
			animation-delay: -500ms;
		}
		&:nth-child(3) {
			background-color: #f90;
			animation-delay: -1s;
		}
		&:nth-child(4) {
			background-color: #09f;
			animation-delay: -1.5s;
		}
	}
}
@keyframes move {
	0%,
	100% {
		transform: translate3d(0, 0, 0);
	}
	25% {
		transform: translate3d(100%, 0, 0);
	}
	50% {
		transform: translate3d(100%, 100%, 0);
	}
	75% {
		transform: translate3d(0, 100%, 0);
	}
}
</style>
