<template>
    <header>
        <div class="order-head">
            <span class="goBack" @click="goBack()"></span>
            <h3>{{$route.meta.title}}</h3>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            shopOrGoods: ''
        }
    },
    methods: {
        goBack() {
            this.$router.back();
            // if (this.$route.path == '/order') {
            //     this.$router.push(this.shopOrGoods);
            // } else {
            //     this.$router.back();
            // }
        }
    },
    mounted() {
    },
}
</script>
<style lang="less">
header {}
</style>

