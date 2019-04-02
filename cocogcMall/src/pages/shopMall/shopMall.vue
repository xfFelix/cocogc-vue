<template>
  <div class="shopMall">

    <div class="home-head">
      <div class="swiper-container">
        <!-- 页面 -->
        <div class="swiper-wrapper">
          <div class="swiper-slide banner-slide" v-for="(item,index) in banList" :key="index">
            <a :href="item.url" class="banner-slidea">
              <img :src="item.src" alt="" class="">
            </a>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
      </div>

      <div class="home-smWrap" v-if="homeSmWrap==false">
        <div class="home-search">
          <span class="home-logo"></span>
          <!-- <span class="home-searchL"></span> -->
          <div class="home-searchI">
            <!-- <input type="text" placeholder="请输入要搜索的内容" v-model="searchCont" @input="searchHint($event)" autocomplete="true"/> -->
            <el-autocomplete v-model="searchCont" :fetch-suggestions="querySearchAsync" placeholder="请输入要搜索的内容" @select="handleSelect" :trigger-on-focus="false" :hide-loading="true" :debounce="1000" class="autocomplete"></el-autocomplete>
          </div>
        </div>
        <span @click="seachClick()" class="seachBnt">搜索</span>
      </div>

      <div class="home-smWrapA" v-if="homeSmWrap==true">
        <div class="home-search">
          <span class="home-logo"></span>
          <!-- <span class="home-searchL"></span> -->
          <p class="home-searchI">
            <!-- <input type="text" placeholder="请输入要搜索的内容" v-model="searchCont" /> -->
            <el-autocomplete v-model="searchCont" :fetch-suggestions="querySearchAsync" placeholder="请输入要搜索的内容" @select="handleSelect" :trigger-on-focus="false"></el-autocomplete>
          </p>
        </div>
        <span @click="seachClick" class="seachBntA">搜索</span>
      </div>

      <div class="home-noticeW">
        <div class="home-notice">
          <span class="home-horn"></span>
          <span style="white-space: nowrap;">椰子分公告：</span>
          <marquee style="width: 65%; font-size: 0.26rem;" loop="infinite">
            <div style="display:flex;">
              <a :href="item.url" v-for="(item,index) in newsList" :key="index" class="link-url" v-if="item.status == 0">
                <span class="home-hotCont">{{item.noticeTitle}}</span>
              </a>
            </div>
          </marquee>
          <span class="home-noticeGo"></span>
        </div>
      </div>

    </div>

    <!-- 快捷通道 -->
    <v-shortcut></v-shortcut>

    <!--  热门爆款 -->
    <v-hotGoods></v-hotGoods>

    <!-- 积分区间 -->
    <v-integral></v-integral>

    <!-- 底部切换 -->

    <!-- 回到顶部 -->
    <div class="goTop" @click="goTop()" v-if="homeSmWrap"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import api from '../../service/api'
import Shortcut from '../../components/home/shortcut.vue'
import HotGoods from '../../components/home/hotGoods.vue'
import Integral from '../../components/home/integral.vue'


export default {
  data() {
    return {
      homeSmWrap: false,
      searchCont: '',
      banList: [],
      swiperBan: '',
      newsList: [],
      timeout: null
    };
  },
  watch: {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.banner()
    this.getNews();

  },
  methods: {
    // 回到顶部
    goTop() {
      document.body.scrollTop -= 500;
      document.documentElement.scrollTop -= 500;
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.goTop(), 16);
      } else {
        clearTimeout(c);
      }
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(async() => {
        let restaurants = await this.axios(jdTestUrl + api.searchHint, { keyword: queryString }, 'get')
        let list = []
        restaurants.list.forEach((item, index) => {
          let cur = {}
          cur.id = item.id
          cur.value = item.name
          cur.parentId = item.parentId
          list.push(cur)
        }, {})
        cb(list);
        // }, 1000);
      }
    },
    handleSelect(item) {
      this.$router.push({ path: '/goodsList', query: { categoryId: item.id, keyWord: this.searchCont } })
    },
    // banner
    banner: function() {
      let _this = this;
      this.axios(testUrl + api.goodsGroups, {
        "id": "1e0615c5b4b54caf97a366059249017d"
      }, 'post')
        .then((data) => {
          if (data.error_code == 0) {
            _this.banList = data.data.data;

            _this.$nextTick(function() {

              _this.swiperBan = new Swiper('.home-head .swiper-container', {
                autoplay: {
                  delay: 2000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false,
                },
                loop: true,
                pagination: {
                  el: '.swiper-pagination',
                  type: 'fraction',
                  renderFraction: function(currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                      '/' +
                      '<span class="' + totalClass + '"></span>';
                  },
                },
              });
            })
          } else {
            this.Toast(data.message)
          }
        })
        .catch((err) => {


        })
    },

    seachClick() {
      this.$router.push({ path: '/goodsList', query: { keyWord: this.searchCont } })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 65) {
        this.homeSmWrap = false;
      } else {
        this.homeSmWrap = true;
      }
    },
    async getNews() {

      let newsList = await this.axios(infoURl + api.newsList, {
        "catId": 206,
        "startNum": 0,
        "num": 3
      }, 'post')
        .then((data) => {
          if (data.resultCode == 0) {
            this.newsList = data.data;
          } else {
            this.Toast(data.message);
          }
        })
        .catch((err) => {
          this.Toast(data.message);
        })
    }
  },
  updated() {

  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/goodsList') {
      to.meta.keepAlive = false
    }
    next()
  },
  components: {
    "v-shortcut": Shortcut,
    "v-hotGoods": HotGoods,
    "v-integral": Integral
  }
};
</script>


<style lang="less">
.link-url {
  margin-right: 100px;
  &:last-of-type {
    margin-right: 0;
  }
}

.banner-slide {
  img {
    width: 100%;
  }
  .banner-slidea {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.home-head {
  position: relative;
  width: 100%;
  height: 4.86rem;
  .home-smWrap,
  .home-smWrapA {
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.2rem 0.15rem 0.2rem;
    width: 100%;
    align-items: center;
    box-sizing: border-box;

    .home-search {
      width: 88%;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.06);
      height: 0.6rem;
      border-radius: 0.6rem;
      display: flex;
      align-items: center; // margin: 0 auto;
      .home-logo {
        height: 0.38rem;
        width: 0.42rem;
        display: inline-block;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -2.16rem -0.18rem;
        background-size: 5.8rem 1.86rem;
        margin: 0.1rem 0.12rem;
      }
      .home-searchL {
        height: 0.26rem;
        width: 0.26rem;
        display: inline-block;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -2.24rem -0.78rem;
        background-size: 5.8rem 1.86rem;
        margin-right: 0.04rem;
      }
      .home-searchI {
        height: 100%;
        width: 80%;
        display: flex;
        align-items: center;
        padding-left: 0.1rem;
        position: relative;
        .search-hint {
          position: absolute;
          background: #fff;
          width: 100%;
          top: 0.61rem;
          border-radius: 5px;
          .hint {
            padding: 0.05rem 0.15rem;
          }
        }
        input {
          width: 100%;
          font-size: 0.26rem;
          border: none;
          background: transparent;
          color: #fff;
        }
        .autocomplete {
           ::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #fff;
            font-size: 0.26rem;
          }
        }
         ::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          font-size: 0.26rem;
        }

         :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          font-size: 0.26rem;
        }

         ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 0.26rem;
        }

        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          font-size: 0.26rem;
        }
      }
    }
    .seachBnt {
      color: #FFF;
    }
  }
  .home-smWrapA {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .home-search {
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.06);
      .home-searchL {
        background-position: -5.03rem -0.255rem;
      }
      .home-searchI {
        input {
          color: #333;
        }
      }
    }
  }

  .home-noticeW {
    height: 0.88rem;
    width: 100%;
    position: absolute;
    bottom: -0.44rem;
    z-index: 1;
    .home-notice {
      margin: 0 0.25rem;
      height: 100%;
      -webkit-box-shadow: 0 4.5px 10px 0px #e1ebff;
      box-shadow: 0 4.5px 10px 0px #e1ebff;
      background: #fff;
      display: flex;
      align-items: center;
      font-size: 0.26rem;
      color: #333;
      .home-horn {
        width: 0.35rem;
        height: 0.22rem;
        display: inline-block;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -2.93rem -0.78rem;
        background-size: 5.8rem 1.86rem;
        margin: 0 0.1rem 0 0.18rem;
      }
      .home-hot {
        color: #d83535;
      }
      .home-hotCont {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 3.2rem;
      }
      .home-noticeGo {
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-position: -3.24rem -0.76rem;
        background-size: 5.8rem 1.86rem;
        width: 0.25rem;
        height: 0.25rem;
        display: inline-block;
        position: absolute;
        right: 0.4rem;
      }
    }
  }
}


// 积分区间
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

.home-head {
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 0.65rem;
  }
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal>.swiper-pagination-bullets {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 10%;
    left: 87%;
    border-radius: 40px;
  }
  .swiper-container {
    .swiper-pagination {
      .swiper-pagination-bullet {
        width: 0.06rem;
        height: 0.06rem;
        border: 0.02rem solid #fff;
        border-radius: inherit;
        background: transparent;
      }
      .swiper-pagination-bullet-active {
        background: #fff;
      }
    }
  }
}

.home-rGoodsW {
  .swiper-container {
    padding: 0 0.2rem;
  }
  .swiper-slide {
    width: 25%;
  }
}

.home-quickW {
  .swiper-pagination-bullet-active {
    background: #30ce84;
  }
  .swiper-container {
    padding-bottom: 0.36rem;
    .swiper-pagination-bullet {
      width: 0.1rem;
      height: 0.03rem;
      margin: -0.12rem 0.04rem;
    }
  }

  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    background: #30ce84;
  }
}

.focusFixed {
  position: fixed;
}
.goTop {
    position: fixed;
    bottom: 1.3rem;
    z-index: 11;
    background: rgba(0, 0, 0, 0.5);
    width: 0.8rem;
    height: 0.8rem;
    right: 0.2rem;
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(/static/images/goTop.png);
        background-size: 25px
    }
}
</style>

