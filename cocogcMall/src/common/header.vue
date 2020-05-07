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
            routeGo: ''
        }
    },
    methods: {
        goBack() {
            if(this.routeGo == 'orderManage'){
                this.$router.push('/layout/account');
            }else if(this.routeGo == 'orderDetails'){
                this.$router.push('/orderManage');
            }else{
                 this.$router.back();
            }
        }
    },
    mounted() {
        this.routeGo = this.$router.history.current.name;
    },
}
</script>

<style>
@media screen and (min-width: 600px) {
  header{
    position: relative;
  }
}
</style>


