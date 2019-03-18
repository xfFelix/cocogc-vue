<template>
  <div class="index">
    <!-- 头部 -->
    <div class="index-head">
      <div class="ih-noticeW">
        <div class="ih-notice">
          <span class="ih-hormImg j1Png"></span>
          <p>椰云公告：应税务局要求缴税规则调整....</p>
        </div>

        <span class="ih-goImg j1Png"></span>
      </div>

      <div class="ih-balanceW">
        <div class="ih-balance">
          <p class="ih-money">19.01</p>
          <p class="ih-moneya">椰子分余额</p>
        </div>
        <div class="ih-recharge">
          去充值
        </div>
      </div>
    </div>

    <!-- 导航 -->

    <ul class="index-fastNav">
      <li class="ifa-fastNavLi" v-for="(item,index) in fastList" :key="index">
        <router-link :to="item.path">
          <p class="navImg" :class="item.imgBg"></p>
          <p class="ifa-name">{{item.name}}</p>
        </router-link>
      </li>
    </ul>

    <!-- 图片 -->
    <div class="index-banner">
      <img src="static/images/indexBan.jpg" alt="">
    </div>

    <!-- 热门爆款 -->
    <div class="index-hotGoods">
      <div class="ihot-title">
        <h3>热门爆款</h3>
        <p>查看更多</p>
      </div>
      <div class="ihot-goodsW">
        <div class="ihot-goods" v-for="(item,index) in goodList" :key="index">
          <div class="ihot-goodsImg">
            <img :src="item.goodImg" alt="" />
          </div>
          <p class="ihot-name">{{item.name}}</p>
          <p class="ihot-moneyW">
            <span class="ihot-logo accountImg"></span>
            <span class="ihot-money">{{item.money}}</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: 'index',
  data() {
    return {
      fastList: [
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
        { id: 1, name: "黄金兑换", imgBg: 'ifa-ImgW', path: '/huangjin' },
      ],
      goodList: [
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' },
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' },
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' },
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' },
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' },
        { id: 1, goodImg: 'static/images/goods_03.jpg', name: "联想", money: '2222.00' }
      ]
    }
  },
  created() {
  },
  mounted() {

  },
  components: {
    // LinkTab
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.index-head {
  background: url("/static/images/indexBg.jpg") no-repeat;
  background-size: 100% 100%;
  height: 1.82rem;
  padding: 0.55rem 0;
  .ih-noticeW {
    width: 88%;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.6rem;
    margin: 0 auto;
    line-height: 0.6rem;
    .ih-notice {
      display: flex;
      align-items: center;
      .ih-hormImg {
        width: 0.24rem;
        height: 0.24rem;
        background-position: -4.31rem -1.64rem;
        margin-left: 0.1rem;
        display: inline-block;
      }
      p {
        font-size: 0.26rem;
        color: #ffffff;
      }
    }
    .ih-goImg {
      width: 0.24rem;
      height: 0.24rem;
      background-position: -5.6rem -0.8rem;
      margin-right: 0.13rem;
    }
  }
  .ih-balanceW {
    display: flex;
    width: 80%;
    margin-left: 1.23rem;
    justify-content: space-between;
    margin-top: 0.45rem;
    .ih-balance {
      .ih-money {
        font-size: 0.48rem;
        font-weight: bold;
        margin-top: -0.1rem;
      }
      .ih-moneya {
        font-size: 0.24rem;
        font-weight: bold;
        margin-top: -0.05rem;
      }
      p {
        // margin-top: -0.1rem;
        color: #fff;

        text-align: center;
      }
    }
    .ih-recharge {
      font-size: 0.24rem;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 40px;
      height: 0.34rem;
      line-height: 0.34rem;
      margin-right: 0.2rem;
      width: 1.1rem;
      text-align: center;
    }
  }
}

.index-fastNav {
  font-size: 0.24rem;
  color: #000;
  padding: 0 0.3rem;
  height: 4.84rem;
  margin-bottom: 0.2rem;
  background: #fff;
  .ifa-fastNavLi {
    width: 25%;
    text-align: center;
    margin: 0.34rem 0 0.1rem 0;
    float: left;
    .ifa-ImgW {
      width: 0.5rem;
      height: 0.5rem;
      background-position: -0.09rem -0.09rem;
      position: relative;
    }
    .ifa-name {
      padding: 0.15rem 0 0.05rem 0;
    }
  }
}

.index-banner {
  margin-bottom: 0.1rem;
  img {
    width: 100%;
  }
}

.index-hotGoods {
  background: #fff;
  .ihot-title {
    padding: 0 0.4rem 0 0.33rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.2rem;
    h3 {
      font-size: 0.3rem;
      font-weight: bold;
    }
    p {
      font-size: 0.24rem;
      color: #333333;
    }
  }
  .ihot-goodsW {
    height: 6.9rem;
    .ihot-goods {
      width: 33.33%;
      float: left;
      text-align: center;
      margin-top: 0.11rem;
      .ihot-goodsImg {
        height: 2rem;
        width: 2rem;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }



    .ihot-name {
      font-size: 0.22rem;
      font-weight: bold;
      margin-top: 0.12rem;
    }
    .ihot-moneyW {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.12rem;
      margin-bottom: 0.4rem;
      .ihot-logo {
        width: 0.28rem;
        height: 0.28rem;
        background-position: -2.17rem -1.08rem;
      }
      .ihot-money {
        font-size: 0.24rem;
        color: #30ce84;
      }
    }
  }
}
</style>
