<template>
    <div class="select page">
        <div class="select-head">
            <div class="home-smWrap">
                <div class="home-search">
                    <span class="home-logo"></span>
                    <span class="home-searchL"></span>
                    <p class="home-searchI">
                        <input type="text" placeholder="请输入要搜索的内容" v-model="searchWord" />
                    </p>
                </div>
                <div class="home-message" @click="seachClick()">
                    搜索
                </div>
            </div>
            
            <!-- <div class="select-headBan">
                <ul class="select-headUl">
                    <li>
                        <p class="select-headImg01"></p>
                        <p>全部</p>
                    </li>
                    <li>
                        <p class="select-headImg02"></p>
                        <p>折扣中</p>
                    </li>
                    <li>
                        <p class="select-headImg03"></p>
                        <p>新品上架</p>
                    </li>
                    <li>
                        <p class="select-headImg04"></p>
                        <p>热门推荐</p>
                    </li>
                </ul>
            </div> -->
        </div>

        <div class="view select-goodsW">
            <div class="aside select-brandW">
                <ul class="select-brand">
                    <li v-for="(item,index) in cateList" :key="index" class="select-brandLi" @click="activeIndexC(index,item.id)"  :style="(activeIndex==index ?' background: #fff':'background: #f3f4f6')">
                        <span class="activeGre" v-if="activeIndex==index"></span>
                      
                        <span :style="(activeIndex==index ?'color: #30ce84':'color: #333')">{{item.name}}</span>
                    </li>

                </ul>
            </div>

            <div class="main select-bGoodsW">
                <div class="select-bGoods">
                    <div class="select-bGoodsT" v-for="(item,index) in cateTypeList" :key="index">
                        <h3 class="title">{{item.name}}</h3>
                        <ul>
                         
                            <li v-for="(i,index) in item.childCategory" :key="index">
                              
                                <router-link :to="{path:'/goodsList',query:{classfyId: i.id}}">
                                    <p>
                                        <img v-bind:src="i.picUrl" v-bind:title="i.name" v-if="i.picUrl != null && i.picUrl!=''" />
                                   
                                        <span class="product-name">{{i.name}}</span>
                                    </p>
                                </router-link>
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

export default
    {
        data() {
            return {
                cateId: 0,
                cateList: [],
                activeIndex: 0,
                cateTypeList: [],
                cateGoodsList: [],
                searchWord: ''
            };
        },
        mounted() {
            let that = this;
            //   this.showLoading();
            this.categories(this.cateId, function(data) {
                if (data.length > 0) {
                    console.log(data)
                    that.cateList = data;
                    let first = data[0].id;
                    that.categories(first, function(data) {
                        that.cateTypeList = data;
                        that.hideLoading();
                    });
                }
            });
        },
        methods: {
            seachClick() {
                this.$router.push({ path: '/goodsList', query: { keyWord: this.searchWord } })
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
            }


        }
    };
</script>

<style lang="less">

.product-name{
  font-size: 12px;
  display: block;
  text-align: center;
  padding: 2px 0 ;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
}
.select-head {
    width: 100%;
        border-bottom: 10px solid #f3f4f6;
    height: 1rem;
    background: #fff;
    padding: 0.42rem 0 0.24rem 0;
    // box-shadow: 0.05rem 0.09rem 0.1rem 0px rgba(225, 235, 255, 0.3);
    .home-smWrap {
        display: flex;
        justify-content: space-between;
        .home-search {
            width: 6.26rem;
            height: 0.6rem;
            border-radius: 0.6rem;
            margin-left: 0.12rem;
            display: flex;
            align-items: center;
            margin-top: 0.09rem;
            border: 1px solid rgba(0, 0, 0, 0.06);;
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
                background-position: -5rem -0.25rem;
                background-size: 5.8rem 1.86rem;
                margin-right: 0.04rem;
            }
            .home-searchI {
                height: 0.32rem;
                width: 5rem;
                display: inherit;
                padding-left: 0.1rem;
                input {
                    width: 4.5rem;
                    font-size: 0.26rem;
                    border: none;
                    background: transparent;
                }
                 ::-webkit-input-placeholder {
                    /* WebKit, Blink, Edge */
                    color: #c5c5c5;
                    font-size: 0.26rem;
                }

                 :-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: #c5c5c5;
                    font-size: 0.26rem;
                }

                 ::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #c5c5c5;
                    font-size: 0.26rem;
                }

                input:-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: #c5c5c5;
                    font-size: 0.26rem;
                }
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

    // .select-headBan {
    //     .select-headUl {
    //         display: flex;
    //         justify-content: space-around;
    //         text-align: center;
    //         margin-top: 0.56rem;
    //         font-size: 0.24rem;
    //         color: #333;
    //         .select-headImg01,
    //         .select-headImg02,
    //         .select-headImg03,
    //         .select-headImg04 {
    //             width: 0.42rem;
    //             height: 0.42rem;
    //             background-image: url(/static/images/jl.png);
    //             background-repeat: no-repeat;
    //             background-size: 5.8rem 1.86rem;
    //             margin: 0px auto 0.09rem auto;
    //         }
    //         .select-headImg01 {
    //             background-position: -0.16rem -0.17rem;
    //         }
    //         .select-headImg02 {
    //             background-position: -0.68rem -0.17rem;
    //         }
    //         .select-headImg03 {
    //             background-position: -1.18rem -0.17rem;
    //         }
    //         .select-headImg04 {
    //             background-position: -1.65rem -0.17rem;
    //         }
    //     }
    // }
}

.select-goodsW {
    // margin-bottom: 49px;
    display: flex;
    position: relative;
    height: 100%;
    .select-brandW {
        height: 100%;
        position: relative;
        overflow: scroll;
    }
    .select-brand {
        flex: 0 0 1.58rem;
        width: 1.58rem;
        .select-brandLi {
            height: 0.7rem;
            line-height: 0.7rem;
            position: relative;
            font-size: 0.24rem;
           
            .activeGre {
                width: 0.06rem;
                height: 100%;
                display: block;
                position: absolute;
                background: #30ce84;
            } 
        }
        .activeBand {
            
        }
    }
    .select-bGoodsW {
        width: 100%;
        h3{
            font-size: 0.24rem;
            color: #333;
            text-align: center;
            margin: 0.16rem 0 0.5rem 0;
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
                    span{
                            white-space: nowrap;
                    }
                }
                margin-bottom: 0.38rem;
            }
        }
        .select-bGoodsT:nth-of-type(1){
            margin-top: 0.34rem;
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
    // flex: 2.2;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // background-color: gold;
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

