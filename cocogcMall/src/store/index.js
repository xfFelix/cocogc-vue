import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import userinfo from './modules/userinfo'
import scrollto from './modules/scrollto'
import platform from './modules/platform'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    userinfo,
    scrollto,
    platform,
    order
  }
})
