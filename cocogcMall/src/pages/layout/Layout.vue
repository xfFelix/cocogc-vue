<template>
    <div class="content">
        <router-view class="content"></router-view>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Footer from '@/common/footer'
export default {
  components: {
    "v-footer": Footer,
  }
}
</script>

<style>
.content{
  padding-bottom: 50px;
}
</style>
