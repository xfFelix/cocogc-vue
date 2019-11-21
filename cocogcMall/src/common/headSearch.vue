<template>
    <div class="home-sm">
        <div class="iconBg home-back" @click="$router.back()"></div>
        <div class="home-search">
            <div class="home-smInput">
                <span class="iconBg searchIcon"></span>
                <p class="home-searchI">
                  <el-autocomplete v-model="kewWordC" :fetch-suggestions="querySearchAsync" placeholder="请输入要搜索的内容" @select="handleSelect" :trigger-on-focus="false" :hide-loading="true" :debounce="1000" @keyup.enter.native="goSearch()" autofocus="autofocus"></el-autocomplete>
                </p>
            </div>
            <span class="home-smdel iconBg" @click="kewWordC=''" v-if="kewWordC"></span>
        </div>
        <div class="home-smClose" @click="sendSearch()" ref="searchInput">
            搜索
        </div>
    </div>
</template>
<script>
import api from '@/service/api';
import { mapActions } from 'vuex';
export default {
    data: () => ({
      logoImg: LOGO_PACKAGE_URL + 'logo.png',
      kewWordC:''
    }),
    watch:{
        $route(to,from){
            this.kewWordC = this.$route.query.keyWord;
        }
    },
    methods: {
        ...mapActions({
            searchHis: 'searchHis/setSearchHis'
        }),
        goSearch() {
          this.sendSearch()
          document.activeElement.blur();
        },
        sendSearch() {
            this.searchHis(this.kewWordC);
            this.$emit('searchChild', this.kewWordC);
            // this.$router.push({path:`/goodsList?keyWord=${this.kewWordC?this.kewWordC:''}`})
            this.$router.push({
              path:'/goodsList?'+(this.keyWord||this.$route.query.keyWord?'keyWord='+(this.keyWord||this.$route.query.keyWord):'')+
                                ((this.keyWord||this.$route.query.keyWord)&&this.$route.query.vendorId?'&':'')+
                                (this.$route.query.vendorId?'vendorId='+this.$route.query.vendorId:'')})
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
            this.sendSearch()
        },
    },
    mounted(){
        this.kewWordC = this.$route.query.keyWord;
    },
}
</script>
<style lang="scss">
.home-sm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #30CE84;
    color: #fff;
    height: 1.16rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .home-search {
        width: 5.54rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #26A56A;
        padding: 0 0.3rem;
        box-sizing: border-box;
        .home-smInput {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            flex: 1;
            .home-searchL {
                height: 0.26rem;
                width: 0.26rem;
                background-position: -5.03rem -0.26rem;
                margin-right: 0.04rem;
            }
            .home-searchI {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                flex: 1;
                input {
                    width: 100%;
                    font-size: 0.26rem;
                    border: none;
                    background: transparent;
                    color: #fff;

                    &::-webkit-input-placeholder {
                        color: #fff;
                        font-size: 0.26rem;
                    }
                    &:-moz-placeholder {
                        color: #fff;
                        font-size: 0.26rem;
                    }
                    &::-moz-placeholder {
                        color: #fff;
                        font-size: 0.26rem;
                    }
                    &:-ms-input-placeholder {
                        color: #fff;
                        font-size: 0.26rem;
                    }
                }
            }
        }
        .home-back {
            width: 0.2rem;
            height: 0.36rem;
            background-image: (url('/static/images/home/arrow.png'))
        }
        .searchIcon{
            width: 0.32rem;
            height: 0.32rem;
            background-image: (url('/static/images/superMark/searchb.png'));
            margin-right: 0.2rem;
        }
        .home-smdel{
            width: 0.3rem;
            height: 0.3rem;
            background-image: (url('/static/images/home/close.png'))
        }
    }
     .home-back {
        width: 0.2rem;
        height: 0.36rem;
        background-image: (url('/static/images/home/arrow.png'))
    }

}


</style>
