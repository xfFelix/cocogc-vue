import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import userinfo from './modules/userinfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    userinfo
  }
})
