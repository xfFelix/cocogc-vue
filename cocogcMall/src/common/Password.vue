<template>
    <div class="code-wrapper">
        <label for="code" class="code-input-main">
          <div class="code-input-main-item" :class="{'active': code.length === 0}">{{code[0]}}</div>
          <div class="code-input-main-item" :class="{'active': code.length === 1}">{{code[1]}}</div>
          <div class="code-input-main-item" :class="{'active': code.length === 2}">{{code[2]}}</div>
          <div class="code-input-main-item" :class="{'active': code.length === 3}">{{code[3]}}</div>
          <div class="code-input-main-item" :class="{'active': code.length === 4}">{{code[4]}}</div>
          <div class="code-input-main-item" :class="{'active': code.length === 5}">{{code[5]}}</div>
        </label>
        <input class="code-input-input" id="code" ref="code" v-model.trim="code" maxlength="6" type="tel" autocomplete="off" pattern="[0-9]*"/>
    </div>
</template>

<script>
export default {
  name: "CodeInput",
  computed: {
    code: {
      get() {
        return this.$store.state.order.password
      },
      set(val) {
        this.$store.dispatch('order/setPassword', val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.code.focus()
    })
  },
  watch: {
    code (val) {
      if (val.length === 6) {
        this.$emit('confirm')
      }
    }
  }
}
</script>
<style scoped>
.code-input-input {
  height: 50px;
  position: absolute;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 transparent;
  width: 200%;
  text-indent: -999em; /*文本向左缩进*/
  margin-left: -100%; /*输入框光标起始点向左左移*/
  top: 0;
  z-index: -1;
  opacity: 0;
}
.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.code-wrapper{
  position: relative;
}
.code-input-main-item {
  width: 50px;
  height: 50px;
  opacity: 0.8;
  border-bottom: solid #000 1px;
  margin: 0 .05rem;
  text-align: center;
  padding-bottom: 0;
  font-size: 30px;
  color: #000;
  -webkit-text-security: disc;
  text-security: disc;
}
.code-input-main-item.active{
  border-bottom: solid #30CE84 1px;
}
</style>
