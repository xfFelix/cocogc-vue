<template>
    <div>
        <router-view></router-view>
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

</style>
