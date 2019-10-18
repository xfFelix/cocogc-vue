<template>
    <div class="searchPage" >
        <head-search></head-search>
        <div class="search-contWrap" >
            <div class="discover-all">
              <p><span class="iconBg hotIcon"></span>搜索发现</p>
              <ul>
                <li v-for="(item,index) in discoverList" :key="index" >
                  <a :href="item.url">
                      <img :src="logoImg" alt="" class="logoImg" v-if="item.noticeTitle=='小椰自营'" />
                      {{item.noticeTitle}}
                  </a>
                </li>
              </ul>
            </div>
            <div class="hot-all">
              <p><span class="iconBg rankIcon"></span>热销TOP</p>
              <ul>
                <li v-for="(item,index) in rankList" :key="index">
                  <a :href="item.url">
                    <div class="rankL">
                      <span class="iconBg rankHeight" :style="`background-image: url('/static/images/historyPage/rank-${index+1}.png')`"></span>
                      <p class="imgHeight"> <img :src="item.img " alt=""/></p>
                    </div>
                    <div class="rankR">
                      <span class="iconBg comIcon"></span>
                        <span>{{item.noticeTitle.length>25?item.noticeTitle.substr(1,200)+'...':item.noticeTitle}}</span>
                        <span class="iconBg topHeight" :style="`background-image: url('/static/images/historyPage/top-${index+1}.png')`"></span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>
<script>

import api from '../../service/api';
export default {
    data() {
        return {
            discoverList:[],
            rankList:[],
            logoImg: LOGO_PACKAGE_URL + 'logo.png',
        }
    },
    mounted() {
      this.searchList('228');
      this.searchList('229');
    },
    methods: {
      async searchList(catId){
        let res = await this.axios(infoURl + api.searchApi, {
          'catId':catId
        },'post');
        if(catId=='228'){
          this.discoverList =res.data;
        }else{
          this.rankList =res.data;
          if(this.rankList.length>3){
            this.rankList = this.rankList.splice(0,3);
          }
        }
      }
    },
    components: {
      "head-search": ()=>import ("../../common/headSearch.vue")
    }
}
</script>
<style lang="scss">
.searchPage {
    background: #fff;
    height: 100%;
    min-height: 100%;
}

.search-contWrap {
  padding: 0 0.3rem;
  box-sizing: border-box;
  .discover-all{
    p{
      color: #333333;
      font-weight: bold;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      margin:0.52rem 0 0.3rem 0;
      display: flex;
      align-items: center;
      .hotIcon{
        width: 0.3rem;
        height: 0.3rem;
        background-image: url('/static/images/historyPage/hot.png');
        margin-right: 3px;
      }
    }
    ul{
      li{
        a{
          padding:  0.18rem 0.42rem;
          display: inline-block;

        }

        display: inline-block;
        background: #F2F2F2;
        margin:0.12rem 0.24rem 0.12rem 0;
        border-radius:0.16rem;
        font-size: 0.24rem;
      }
    }
  }

  .hot-all{
     p{
      color: #333333;
      font-weight: bold;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      margin:0.42rem 0 0.4rem 0;
      display: flex;
      align-items: center;
      .rankIcon{
        width: 0.3rem;
        height: 0.3rem;
        background-image: url('/static/images/historyPage/rank.png');
        margin-right: 3px;
      }
    }
    ul{
      li a{
        color: #333333;
        font-size: 0.28rem;
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        border-bottom: 1px solid #EFEFEF;
        .rankL{
          display: flex;
          align-items: center;
        }
        .rankHeight{
          width: 0.4rem;
          height: 0.4rem;
        }
        .imgHeight{
          width: 1.06rem;
          height: 1.06rem;
          margin: 0 0.3rem 0 0.26rem;
          img{
            width: 100%;
            height: auto;
          }
        }
        .topHeight{
          width: 0.22rem;
          height: 0.22rem;
        }
        .comIcon{
          width: 0.32rem;
          height: 0.32rem;
          background-image: url('/static/images/historyPage/recommend.png');
              vertical-align: middle;
        }
      }
    }
  }
  .logoImg{
    width: 0.3rem;
    height: 0.3rem;
    display: inline-block;
        vertical-align: bottom;
  }

}

</style>

