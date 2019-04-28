<template>
  <div class="goodsList">
    <div class="home-smWrap">
      <head-search @searchChild='parentChild' v-bind:kewWordC="keyWord"></head-search>
      <ul class="goodsList-order one-bottom-px">
        <li>
          <p @click="searchAll()" :class="{'hight-light': hightLight === 'all'}">全部</p>
        </li>
        <li>
          <div @click="goodsOrder()" :class="{'hight-light': hightLight === 'sell'}" style="display: flex;align-items: center;">
            <p>销量</p>
            <p>
              <span class="j1Png gl-orderBg gl-orderBga" ></span>
              <span class="j1Png gl-orderBg gl-orderBgc"></span>
            </p>
          </div>
        </li>
        <li>
          <div @click="goodsPrice()" :class="{'hight-light': hightLight === 'price'}" style="display: flex;align-items: center;">
            <p>价格</p>
            <p>
              <span class="j1Png gl-orderBg" :class="priceRange == 'asc'?'gl-orderBgb':'gl-orderBga'"></span>
              <span class="j1Png gl-orderBg" :class="priceRange == 'desc'?'gl-orderBgd':'gl-orderBgc'"></span>
            </p>
          </div>
        </li>
        <li>
          <p @click="intervalCli" :class="{'hight-light': hightLight === 'integral'}">积分区间</p>
        </li>
      </ul>

      <div class="home-iSelectW" v-if="intervalFlag">
        <ul class="home-iSelect">
          <li v-for="(item,index) in homeSel" :key="index" v-if="item.homeSelShow" @click="iSelect(item,index)"
            :class="checkColor(item.id)">
            {{item.integralInfo}}
          </li>
        </ul>
      </div>

    </div>
      <div class="goodList-interWrap" ref="wrapper" v-infinite-scroll="loadBottom" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
        <div class="home-iGoodsW" v-for="(item,index) in goodsList" :key="index">
          <!-- <router-link :to="{path:'goodsDetail/'+item.id}"> -->
          <div @click="goDetail(item.id)">
            <div class="home-iGoods">
              <img v-lazy="item.image" alt="" />
            </div>
            <p class="home-iNmame">
              {{item.name}}
            </p>
            <div class="home-iMoneyW">
              <span class="home-iMoneyL"></span>
              <span class="home-iMoney">{{item.currentPrice|toDecimal2(item.currentPrice)}}</span> 
              <span class="home-iMoneymar" v-if="item.currentPrice!=item.marketPrice">{{item.marketPrice|toDecimal2}}</span>
            </div>
          </div>
          <!-- </router-link> -->
        </div>
        <no-data :data="goodsList"></no-data>
      </div>
    <!-- <observer @intersect="intersected"></observer> -->
  </div>
</template>
<script>
  import headSearch from "../../common/headSearch.vue";
  // import Observer from '@/common/Observer'
  import {
    mapGetters, mapActions
  } from 'vuex';
  import api from '../../service/api';
  import {
    getToken
  } from '@/util/common'
  import {Loadmore} from 'mint-ui'

  export default {
    name: 'goodsList',
    data() {
      return {
        // observer: null,
        searchCont: '',
        homeSel: [{
            id: 0,
            integral: '0~' + parseInt(this.$store.getters['userinfo/getUserInfo'].score),
            homeSelShow: true,
            integralInfo: '我能兑换'
          },
          {
            id: 1,
            integral: "0~*",
            homeSelShow: true,
            integralInfo: '全部'
          },
          {
            id: 2,
            integral: "0~50",
            homeSelShow: true,
            integralInfo: '0~50'
          },
          {
            id: 3,
            integral: "51~200",
            homeSelShow: true,
            integralInfo: '51~200'
          },
          {
            id: 4,
            integral: "201~1000",
            homeSelShow: true,
            integralInfo: '201~1000'
          },
          {
            id: 5,
            integral: "1001~5000",
            homeSelShow: true,
            integralInfo: '1001~5000'
          },
          {
            id: 6,
            integral: "5001~*",
            homeSelShow: true,
            integralInfo: '5000以上'
          },
        ],
        iSelectAct: 0,
        intervalFlag: false,
        goodsList: [],
        pages: 1, //页数
        pages_size: 10, //每页显示页数
        price: '', //判断点击的积分区间
        moreShow: false,
        brandId: '', //分类id
        keyWord: '', //关键字
        priceRange: '', //判断价格的高低
        priceRangeFlag: true, //判断价格的高低
        salesVolume: "", //销量排序
        productTypeId: "",
        token: getToken(),
        hightLight: 'all',
        allLoaded: false
      };
    },
    computed: {
      ...mapGetters({
        userinfo: 'userinfo/getUserInfo',
        getScrollto: 'scrollto/getGoodsList'
      }),
      offsetRows () {
        return 1 + this.pages_size * (this.pages - 1)
      }
    },
    activated() {
      console.log(this.getScrollto)
      window.scrollTo(0, this.getScrollto)
    },
    beforeRouteEnter(to, from, next) {
      if (from.path.includes('layout')) {
      console.log('1111')
        next(vm => {
          vm.initData()
          vm.urlParams()
          vm.intersected()
        })
      } else {
        next()
      }
    },
    methods: {
      async loadBottom() {
          if (this.$route.path === '/goodsList') {
            await this.intersected();
          }
      },
      initData() {
        this.iSelectAct= 0,
        this.intervalFlag= false,
        this.goodsList= [],
        this.pages= 1, //页数
        this.pages_size= 10, //每页显示页数
        this.price= '', //判断点击的积分区间
        this.moreShow= false,
        this.brandId= '', //分类id
        this.keyWord='', //关键字
        this.priceRange= '', //判断价格的高低
        this.priceRangeFlag= true, //判断价格的高低
        this.salesVolume= "", //销量排序
        this.productTypeId= "",
        this.token= getToken(),
        this.hightLight= 'all',
        this.allLoaded= false
      },
      goDetail(id) {
        this.setScrollto(document.documentElement.scrollTop || document.body.scrollTop)
        this.$router.push({path: '/goodsDetail/'+ id})
      },
      checkColor(id) {
        if (this.hightLight === 'integral') {
          return id === this.iSelectAct ? 'iSelectCla' : 'iSelectNo'
        }
      },
      ...mapActions({
        setScrollto: 'scrollto/setGoodsList'
      }),
      initData() {
        this.pages = 1
        this.pages_size= 10
        this.goodsList = []
      },
        //搜索框
        parentChild(val) {
            this.keyWord = val;
            this.initData()
            this.brandId = ''
            this.switch = 'name'
            this.$router.push({path: '/goodsList', query:{keyWord: val}})
            this.intersected()
        },
        //价格顺序
        goodsPrice() {
            this.hightLight = 'price'
            if (this.priceRangeFlag == true) {
                this.priceRange = 'asc'
                this.priceRangeFlag = false;
            } else {
                this.priceRange = 'desc'
                this.priceRangeFlag = true;
            }
            this.initData()
            this.salesVolume = "";
            this.intervalFlag = false;
            this.intersected()
        },

        //判断积分区间
        intervalCli() {
            this.hightLight = 'integral'
            this.intervalFlag = !this.intervalFlag;
            this.priceRange='';
            this.priceRangeFlag = true;
        },
        iSelect(item, index) {
             if(item.integral == '0~NaN'){
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
            }else{
                this.initData()
                this.priceRange = "";
                this.salesVolume = "";
                this.iSelectAct = index; //改变积分颜色
                this.intervalFlag = false;
                this.price = item.integral;
                this.intersected()
            }
      },

      //所有
      searchAll() {
        this.hightLight = 'all'
        this.initData()
        this.price = "0~*"
        this.priceRange = "";
        this.salesVolume = "";
        this.intervalFlag = false;
        this.priceRangeFlag = true;
        this.iSelectAct = 1;
        this.intersected()
      },

      //销量排序
      goodsOrder() {
        this.hightLight = 'sell'
        this.initData()
        this.priceRange = "";
        this.salesVolume = "y";
        this.intervalFlag = false;
        this.priceRangeFlag = true;
        this.intersected()
      },

      //判断url参数
      urlParams() {
        this.price = this.$route.query.integra;
        this.brandId = this.$route.query.classfyId;
        this.keyWord = this.$route.query.keyWord;
        this.salesVolume = this.$route.query.salesVolume;
        this.productTypeId = this.$route.query.quickItem;
        switch (this.$route.query.integra) {
          case "0-*":
            this.iSelectAct = 1;
            break;
          case "0-50":
            this.iSelectAct = 2;
            break;
          case "51-200":
            this.iSelectAct = 3;
            break;
          case "201-1000":
            this.iSelectAct = 4;
            break;
          case "1001-5000":
            this.iSelectAct = 5;
            break;
          case "5001-*":
            this.iSelectAct = 6;
            break;
          default:
            this.iSelectAct = 0;
            break;
        }
        if (this.price == undefined) {
          this.price = "0~*";
          this.iSelectAct = 1;
        }
        if (this.$route.query.classfyId == undefined) {
          this.brandId = ""
        }
        if (this.$route.query.keyWord == undefined) {
          this.keyWord = ""
        }
        if (this.$route.query.salesVolume == undefined) {
          this.salesVolume = ""
        }
        if (this.productTypeId == undefined) {
          this.productTypeId = ""
        }
      },
      async intersected() {
        this.allLoaded = true
        let data = await this.axios(jdTestUrl + api.keyword, {
          "categoryId": this.brandId,
          "keyWord": this.keyWord,
          "offset": this.offsetRows,
          "price": this.price.replace('~', '-'),
          "priceRange": this.priceRange,
          "rows": this.pages_size,
          "salesVolume": this.salesVolume,
          "timeSort": "",
          "productTypeId": this.productTypeId
        }, 'post')
        if (data.code == 0) {
          this.goodsList = this.goodsList.concat(data.list);
          this.pages += 1;
          this.allLoaded = !(data.list.length === this.pages_size)
        } else {
          this.Toast(data.message);
        }
      }
    },
    components: {
      "head-search": headSearch,
      "mt-loadmore": Loadmore
      // Observer
    }

  }

</script>
<style lang="less">
  .goodsList {
    height: 100%;
    background: #fff;
    .home-smWrap {
      padding: 0.5rem 0 0 0;
      width: 100%; // align-items: center;
      background: #fff;
      position: fixed;
      z-index: 2;
      max-width: 450px;
      .goodsList-order {
        display: flex;
        justify-content: space-around;

        li {
          display: flex;
          align-items: center;
          padding: 0.5rem 0 0.18rem 0;

          p {
                            display: inline-flex;
    flex-direction: column;
          }

          .gl-orderBg {
            width: 0.22rem;
            height: 0.13rem;
            display: inline-block;
          }
          .gl-orderBga {
            background-position: -0.63rem -1.27rem;
          }
          .gl-orderBgb {
            background-position: -0.63rem -1.59rem;
          }
          .gl-orderBgc {
            background-position: -0.63rem -1.4rem;
          }
          .gl-orderBgd {
            background-position: -0.63rem -1.71rem;
          }
        }
      }
    }
  }


  .goodList-interWrap {
    width: 100%;
    background: #fff; // overflow: auto;
    padding-top: 2.22rem;
    box-sizing: content-box;

    .home-iGoodsW {
      // float: left;
      display: inline-block;
      width: 50%;
      padding: 0 0.32rem;
      box-sizing: border-box;
      margin: 0.2rem 0; // height: 4.1rem;

      .home-iGoods {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
        height: 3.16rem;
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
        word-break: break-all;
        word-wrap: break-word;
        text-align: left;
        overflow: hidden;
        position: relative;
        line-height: 1.5em;
        height: 3em;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 5px;
          background: #fff;
        }
      }

      .home-iMoneyW {
        display: flex;
        align-items: center;
        margin: 0.1rem;

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

  .goodsList {
    .home-iSelectW {
      box-shadow: 0.05rem 0.09rem 0.1rem 0px rgba(0, 0, 0, 0.3);
      border-radius: 0 0 5px 5px;
    }
  }

  .home-iSelectW {
    color: #333333;
    font-size: 0.2rem;
    overflow: auto;
    display: flex;
    justify-content: space-around;
    padding-bottom: 0.15rem;

    .home-iSelect {
      width: 94%;

      li {
        width: 19%;
        height: 0.58rem;
        line-height: 0.58rem;
        text-align: center;
        float: left;
        margin: 0.3rem 0 0 1%;
        padding: 3px 0;
        border-radius: 2rem;
      }
    }

    .home-iMore {
      width: 5.4%;
      height: 0.58rem;
      display: inline-block;
      border: 1px solid #dfdfdf;
      border-radius: 1rem;
      text-align: center;
      margin-top: 3px;

      .home-iMoreGo {
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -3.24rem -0.76rem;
        background-size: 5.8rem 1.86rem;
        -webkit-transform: rotate(45deg);
        transform: rotate(90deg);
        width: 0.25rem;
        height: 0.25rem;
        display: inline-block;
        margin: 0.18rem auto;
      }
    }

    .iSelectNo {
      background: #efefef;
      color: #000;
    }

    .iSelectCla {
      color: #fff;
      background: #30ce84;
      border: none;
    }
  }

  #moreMsg {
    background: #fff;
    width: 100%;
    display: inline-block;
    color: #666;
    padding: 0.2rem 0;

    .mint-spinner-fading-circle {
      margin: 0 auto;
    }

    .loading-more-txt {
      text-align: center;
    }
  }

  .onBottom {
    text-align: center;
    padding: 0.2rem;
    color: #666;
  }

  .hight-light {
    color: #30ce84;
  }


</style>
