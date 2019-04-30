<template>
    <div>
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
  background: #eef1f6;
<<<<<<< HEAD
  height: 100%;
=======
>>>>>>> a8d0d104ca2f5ee2982cb3b15e7e718087db8c6b
}
</style>
