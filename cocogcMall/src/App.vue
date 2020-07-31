<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { IsEmpty, getToken } from "@/util/common";
import api from '@/service/api';
import { mapActions } from 'vuex';


export default {
    name: 'App',
    created() {

    },
    components: {

    },
    watch: {

    },
    methods: {

    },
    beforeMounted() {

    },
    mounted() {
      let t = performance.timing
      console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
      console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
      console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
      console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
      console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
      console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
      console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

      if(t = performance.memory){
          console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
      }
    }
}


</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    // min-height: 100vh;
    background:#eef1f6;
}

.order-head {
    height: 1.48rem;
    background: #fff;
    text-align: center;
    line-height: 1.48rem;
    font-size: 0.28rem;
    color: #000000;
    font-weight: 100;
    .goBack {
        width: 0.22rem;
        height: 0.38rem;
        background-image: url(/static/images/jl.png);
        background-repeat: no-repeat;
        background-size: 5.8rem 1.86rem;
        background-position: -0.2rem -0.74rem;
        position: absolute;
        left: 0.32rem;
        top: 0.56rem;
        transform: rotate(180deg);
    }
}

.active {
    color: #30CE84;
}
</style>


