import {getToken} from '@/util/common'
import api from '@/service/api'
import axios from '@/service/http'
import store from '@/store/index'

export default (router) => {
  router.beforeEach(async(to, from, next) => {
    if (to.meta.requireAuth) {// 判断是否需要登录权限
      if (getToken()) {// 判断是否登录
        const [info, address, cart] = await Promise.all([
          axios(infoURl + api.info, {token: getToken()}, 'post'),
          axios(testUrl + api.selectDefaultAddresses, {token: getToken()}, 'post'),
          axios(testUrl + api.totalCarts,{token: getToken()},'post')
        ])
        localStorage.setItem('userName', info.data.userName);
        localStorage.setItem('score', info.data.score);
        localStorage.setItem('isRealCert', info.data.isRealCert);
        localStorage.setItem('addressId', address.data.id);
        store.dispatch('userinfo/setUserInfo', info.data)
        store.dispatch('userinfo/setAddress', address.data)
        store.dispatch('cart/setNum', cart.data)
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      if (to.path === '/layout/home') {
        if (getToken()) {// 判断是否登录
          const [info, cart] = await Promise.all([
            axios(infoURl + api.info, {token: getToken()}, 'post'),
            axios(testUrl + api.totalCarts,{token: getToken()},'post')
          ])
          localStorage.setItem('userName', info.data.userName);
          localStorage.setItem('score', info.data.score);
          localStorage.setItem('isRealCert', info.data.isRealCert);
          store.dispatch('userinfo/setUserInfo', info.data)
          store.dispatch('cart/setNum', cart.data)
        }
      }
      next()
    }
  })
}
