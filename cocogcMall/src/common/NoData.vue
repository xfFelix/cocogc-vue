<template>
  <div class="no-data">
    <img src="/static/images/nothing.png" alt="" v-if="open">
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
    width: 212px;
    height: 227px;
  }
}
</style>
