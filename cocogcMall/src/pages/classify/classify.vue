<template>
    <div class="page" style="position: relative; padding: 1.16rem 0px 0px; box-sizing: border-box;">
      <div class="select-head">
        <div class="home-search" @click="seachClick()">
          <img src="/static/images/superMark/searchb.png"  class="search-logo" alt=""/>
          请输入要搜索的商品名称
        </div>
      </div>

        <div class="select-goodsW">
            <div class="aside select-brandW">
                <ul class="select-brand">
                    <li v-for="(item,index) in cateList" :key="index" class="select-brandLi" @click="activeIndexC(index,item.id)" :style="(activeIndex==index ?' background: #fff':'background: #f3f4f6')">
                        <span class="activeGre" v-if="activeIndex==index"></span>
                        <span :class="(activeIndex==index ?'select-namea':'select-name')">{{item.name}}</span>
                    </li>

                </ul>
            </div>

            <div class="main select-bGoodsW">
                <div class="select-bGoods">
                    <div class="classify-swipeW">
                        <div class="classify-swipe">
                            <div class="swiper-container">
                                <!-- 页面 -->
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="item of banner" :key="item.title">
                                        <a :href="item.url">
                                            <img :src="item.src" alt="" />
                                        </a>
                                    </div>

                                </div>
                                <!-- 分页器 -->
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>

                    <div class="select-bGoodsT" v-for="(item,index) in cateTypeList" :key="index">
                        <h3 class="title"><span>{{item.name}}</span></h3>
                        <ul>
                            <li v-for="(i,index) in item.childCategory" :key="index">
                                <span v-if="i.content != '' && i.content != null">
                                    <a :href="i.content">
                                        <p>
                                            <img v-bind:src="i.picUrl" v-bind:title="i.name" v-if="i.picUrl != null && i.picUrl!=''" />
                                            <span class="product-name">{{i.name}}</span>
                                        </p>
                                    </a>
                                </span>
                                <span v-else>
                                    <router-link :to="{path:'/goodsList',query:{classfyId: i.id}}">
                                        <p>
                                            <img v-bind:src="i.picUrl" v-bind:title="i.name" v-if="i.picUrl != null && i.picUrl!=''" />
                                            <span class="product-name">{{i.name}}</span>
                                        </p>
                                    </router-link>
                                </span>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import api from '../../service/api';
import Swiper from 'swiper';
export default
    {
        name: 'classify',
        data() {
            return {
                cateId: 0,
                cateList: [],
                activeIndex: 0,
                cateTypeList: [],
                cateGoodsList: [],
                searchWord: '',
                banner: [],
                timeout: null,
                searchLogo: LOGO_PACKAGE_URL + 'logo.png'
            };
        },
        mounted() {
            let that = this;
            //   this.showLoading();
            this.categories(this.cateId, function(data) {
                if (data.length > 0) {
                    that.cateList = data;
                    if (that.$route.query.id) {
                        that.cateList.forEach((item, index) => {
                            if (that.$route.query.id == item.id) {
                                that.activeIndexC(index, that.$route.query.id)
                            }
                        })
                    } else {
                        let first = data[0].id;
                        that.categories(first, function(data) {
                            that.cateTypeList = data;
                            that.hideLoading();
                        });
                    }
                }
            });

            this.getBanner();

        },
        methods: {
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
                this.seachClick()
            },
            seachClick() {
                this.$router.push({ path: '/searchPage', query: { keyWord: this.searchWord } })
            },
            categories: function(cateId, callback) {
                this.axios(testUrl + api.categories, {
                    "id": cateId
                }, 'post')
                    .then((data) => {
                        if (data.error_code == 0) {
                            if (callback)
                                callback(data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },

            activeIndexC: function(index, itemId) {
                var that = this;
                this.activeIndex = index;
                // this.showLoading();
                this.categories(itemId, function(data) {
                    that.cateTypeList = data;
                    that.hideLoading();
                });
            },

            //轮播图
            async getBanner() {
                let banner = await this.axios(testUrl + api.goodsGroups, {
                    "id": "13bb01753dc84759820aafdfd8a4520d"
                }, 'post')
                this.banner = banner.data.data;
                this.$nextTick(() => {
                    var swiperBan = new Swiper('.classify-swipeW .swiper-container', {
                        loop: true,
                        autoplay: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })
            },


        }
    };
</script>

<style lang="scss">
.el-input {
    height: 100%;
    input {
        height: 100%;
    }
}

.product-name {
    font-size: 12px;
    display: block;
    text-align: center;
    padding: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
}

.classify-swipeW {
    height: 2rem;
    width: 5.32rem;
    margin: 0.22rem auto 0.5rem auto;
    .classify-swipe {
        height: 100%;
        .swiper-container-horizontal>.swiper-pagination-bullets {
            bottom: 0px;
        }
        .swiper-container {
            height: 100%;
            border-radius: 0.2rem;
            .swiper-wrapper {
                .swiper-slide {
                    img {
                        border-radius: 0.2rem;
                    }
                }
            }
        }
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

.select-head {
    width: 100%;
    height: 1.16rem;
    background: #30CE84;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
        .home-search {
            width: 6.9rem;
            height: 0.7rem;
            background: #26A56A;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.28rem;
            color: #FFFFFF;
            border-radius: 0.08rem;
            .search-logo{
              width: 0.34rem;
              height: 0.34rem;
              margin-right: 5px;
            }
        }

        .home-message {
            display: inline-block;
            width: 0.78rem;
            height: 0.78rem; // background: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
            margin-right: 6px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: relative;
            .home-msg {
                width: 0.4rem;
                height: 0.4rem;
                display: inline-block;
                background-image: url(/static/images/jl.png);
                background-repeat: no-repeat;
                background-position: -3.18rem -0.19rem;
                background-size: 5.8rem 1.86rem;
            }
            .home-msgNum {
                position: absolute;
                right: -0.06rem;
                top: 0;
                background: #f63132;
                font-size: 0.18rem;
                padding: 0.06rem 0.12rem 0.02rem 0.12rem;
                border-radius: 40px;
                color: #fff;
            }
        }
}

.select-bGoodsW,.select-brandW{
  height: calc(100vh - 1.16rem - 49px);
}
.select-goodsW {
    display: flex;
    position: relative;
    height: calc(100vh - 1.16rem - 49px);
    .select-brandW {
        height: 100%;
        position: relative;
        overflow: scroll;
    }
    .select-brand {
        flex: 0 0 1.58rem;
        width: 1.58rem;
        .select-brandLi {
            height: 1rem;
            position: relative;
            font-size: 0.26rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .activeGre {
                width: 0.06rem;
                height: 0.32rem;
                display: block;
                position: absolute;
                background: #30ce84;
                top: 36%;
                left: 0;
            }
            .select-name{
              padding: 0 0.1rem 0 0.2rem;
              font-size: 0.26rem;
              color: #787878;
            }
            .select-namea{
              padding: 0 0.1rem 0 0.2rem;
              color: #30ce84;
            }
        }
    }
    .select-bGoodsW {
        width: 100%;
        background: #fff;
        h3 {
            font-size: 0.24rem;
            color: #333;
            text-align: center;

        }
        ul {
            width: 100%;
            li {
                width: 24%;
                margin: 0 4.66%;
                display: inline-block;
                font-size: 0.22rem;
                text-align: center;
                color: #333;
                p {
                    img {
                        width: 100%;
                    }
                    span {
                        white-space: nowrap;
                    }
                }
                margin-bottom: 0.38rem;
            }
        }
        .select-bGoodsT {
            .title{
              width: 5.52rem;
              background: #E8E8E8;
              position: relative;
              height: 1px;
              margin: 0.16rem auto 0.5rem auto;
              span{
                position: absolute;
                padding: 0 15px;
                transform: translate(-50%,-50%);
                background: #fff;
              }
            }
        }
    }
}

.select {
    display: flex;
    flex-direction: column;
}

.view {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.aside {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none
    }
    >ul {
        height: 100%;
        width: 100%;
        li {
            text-align: center;
        }
    }
}

.main {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 9.8;
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
    >h2 {
        font-size: 24px;
        padding: 2vw 4vw;
        color: #333;
        letter-spacing: 2px;
        background-color: rgb(247, 247, 247);
    }
    >ul {
        width: 100%;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        background-color: rgb(247, 247, 247);

        li {
            background-color: rgb(247, 247, 247);
            width: 33%;
            text-align: center;
            a {
                color: #666;
                display: block;
                img {
                    display: block;
                    width: 60%;
                    margin: 4vw auto;
                }
                span {
                    text-align: center;
                }
            }
        }
    }
}
</style>

