<template>
    <div class="loading" id="moreMsg"  >
        <div class="loading-box tc" v-if="isLoading">
            <mt-spinner type="snake" class="loading-more"></mt-spinner>
            <span class="loading-more-txt">加载中...</span>
        </div>
    </div>
</template>
<script>
export default {
    data:{
      return:{
          isLoading:true,
         
      }  
    },
    mounted() {
        var _this = this
        this.observer = new IntersectionObserver(([entry]) => {
            console.log(entry.target.id)
            if(entry.target.id == 'moreMsg'){
                _this.isLoading = true;
            }
        })
        this.observer.observe(this.$el);
        
    }

}
</script>
<style lang="less" scoped>

</style>
