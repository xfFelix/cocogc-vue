import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import userinfo from './modules/userinfo'
import scrollto from './modules/scrollto'
import platform from './modules/platform'
import order from './modules/order'
import tab from './modules/tab'
import shopMall from './modules/shop_mall'
import searchHis from './modules/searchHis'
import channel from './modules/channel'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    userinfo,
    scrollto,
    platform,
    order,
    tab,
    shopMall,
    searchHis,
    channel,
    home
  }
})
