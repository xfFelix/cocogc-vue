<template>
  <div class="no-data" v-if="open">
    <img src="/static/images/home/nothing.png" alt="">
    <p>暂无数据</p>
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

<style lang="scss" scoped>
.no-data{
  display: flex;
  width: 100%;
  height: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    width: 3rem;
    height: 3rem;
  }
  p {
    margin-top: 0.2rem;
    font-size: 0.27rem;
    color: #7F7F7F;
  }
}
</style>
