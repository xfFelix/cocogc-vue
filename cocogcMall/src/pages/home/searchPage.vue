<template>
    <div class="searchPage" >
        <head-search></head-search>

        <div class="search-contWrap" >

            <div class="search-recent">
                <div class="search-conType">
                    <span>最近搜索</span>
                    <div class="delHandle" v-if="recordFlag" >
                        <p class="delAll" @click="delAll">
                            <span class="j1Png search-delImg"></span>
                            <span>全部删除</span>
                        </p>
                        <span class="delOk"  @click="delOk">完成</span>
                    </div>
                    <div class="delHandle" v-else>
                        <span class="j1Png search-delImgClick" @click="delRecord"></span>
                    </div>

                </div>
                <ul class="seach-list" >
                    <li v-for="(item,index) in list.recent" 
                        :key="index" 
                        :class="recordFlag?'recodeActive':'recodeNo'" >
                        {{item}}
                        <span class="j1Png colseRecord" v-if="recordFlag==true" @click="delThisRecode(item,index)"></span>
                    </li>

                </ul>
            </div>

            <div class="search-hot">
                <p class="search-conType">
                    <span>热门搜索</span>
                    <span></span>
                </p>
                <ul class="seach-list">
                    <li v-for="(item,index) in list.hot" :key="index" class="recodeNo">{{item}}</li>
                </ul>
            </div>

            <div class="search-integral">
                <p class="search-conType">
                    <span>积分区间</span>
                    <span></span>
                </p>
                <ul class="seach-list">
                    <li v-for="(item,index) in list.integral" :key="index" class="recodeNo">{{item}}</li>
                </ul>
            </div>

        </div>

    </div>
</template>
<script>
import headSearch from "../../common/headSearch.vue";



export default {
    data() {
        return {
            list: {
                recent: ["VIVO", "笔记本电脑", "mac", "无损音乐播放器"],
                hot: ["信用卡还款", "代金券"],
                integral: ["我能兑换", "全部", "0-50", "50-200", "200-1000", "1000-5000", "5000以上","我能兑换"]
            },
            recordFlag: false,
           
        }
    },

    mounted() {

    },
    methods: {

        delOk(){
this.recordFlag = false
        },
        delRecord() {
            this.recordFlag = !this.recordFlag
        },
        delThisRecode(item,index) {
           this.list.recent.splice(index,1)
        },
        delAll(){
            this.list.recent.splice(0,this.list.recent.length)
        }
    },
    components: {
        "head-search": headSearch
    }
}
</script>
<style lang="less">
.searchPage {
    padding-top: 0.44rem;
    background: #fff;
}

.search-contWrap {
    // padding: 0 0.32rem;
    padding-left: 0.32rem;
    .search-recent,
    .search-hot,
    .search-integral {
        .search-conType {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.26rem 0 0.28rem 0;
            .delHandle {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                .delAll {
                    display: flex;
                    .search-delImg {
                        width: 0.33rem;
                        height: 0.33rem;
                        background-position: -0.96rem -1.27rem;
                    }
                }
                .search-delImgClick {
                    width: 0.33rem;
                    height: 0.33rem;
                    background-position: -0.96rem -1.27rem;
                    margin-right: 0.3rem;
                }
                .delOk {
                    margin-right: 0.3rem;
                    display: flex;
                    font-size: 0.24rem;
                    align-items: center;
                    &::before {
                        width: 2px;
                        height: 0.3rem;
                        display: inline-block;
                        background: #000;
                        content: "";
                        margin: 0 0.1rem;
                        align-items: center;
                    }
                }
            }
        }
        .seach-list {
            font-size: 0.28rem;
            .recodeNo {
                display: inline-block;
                padding: 0.22rem 0.33rem;
                background: #efefef;
                border-radius: 40px;
                margin: 0 0.2rem 0.2rem 0;
                font-size: 0.28rem;
                border: 1px solid #efefef;
            }
            .recodeActive {
                display: inline-block;
                background: #fff;
                border-radius: 40px;
                border: 1px dashed #999999;
                margin: 0 0.2rem 0.2rem 0;
                padding: 0.22rem 0.07rem 0.22rem 0.33rem;
            }
        }
    }
    .search-recent {
        .search-conType {
            padding: 0.26rem 0 0.28rem 0;
        }
    }
}

.colseRecord {
    width: 0.22rem;
    height: 0.22rem; // border: 1px solid;
    background-position: -0.53rem -0.76rem;
}
</style>

