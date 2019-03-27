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
     
    }
}


</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
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


