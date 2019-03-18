<template>
    <header>
        <div class="order-head">
            <span class="goBack" @click="$router.go(-1)"></span>
            <h3>{{$route.meta.title}}</h3>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang="less">
header{

}
</style>

