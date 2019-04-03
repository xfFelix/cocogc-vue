<template>
  <div class="observer"></div>
</template>

<script>
export default {
  data: ()=>({
    observer: null
  }),
  props:['options'],
  mounted(){
    const options = this.options || {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
      }
    }, {})
    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer.disconnect()
  }
}
</script>

<style>

</style>
