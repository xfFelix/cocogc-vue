<template>
  <div class="no-data" v-if="open">
    <img src="/static/images/nothing.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props:{
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    open () {
      if (this.data && this.data.length) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.no-data{
  display: flex;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  img{
    width: 3.46rem;
    height: 3.48rem;
  }
}
</style>
