import {getToken, setToken} from '@/util/common'
import api from '@/service/api'
import axios from '@/service/http'
import store from '@/store/index'
import qs from 'qs'
export default (router) => {
  router.beforeEach(async(to, from, next) => {
    if (location.href.indexOf('?') != -1) {
      const param = qs.parse(location.href.split('?')[1])
      if (param.token) {
        setToken(param.token)
      }
    }
    if (to.meta.requireAuth) {// 判断是否需要登录权限
      if (getToken()) {// 判断是否登录
        const info = await axios(infoURl + api.info, {token: getToken()}, 'post')
        localStorage.setItem('userName', info.data.userName);
        localStorage.setItem('score', info.data.score);
        localStorage.setItem('isRealCert', info.data.isRealCert);
        store.dispatch('userinfo/setUserInfo', info.data)
        if (/\/layout/.test(to.path)) {
          const cart = await axios(testUrl + api.totalCarts,{token: getToken()},'post')
          store.dispatch('cart/setNum', cart.data)
          if (/^\/layout\/shopCart$/.test(to.path)) {
            const address = await axios(testUrl + api.selectDefaultAddresses, {token: getToken()}, 'post')
            if (address.data) {
              localStorage.setItem('addressId', address.data.id);
              store.dispatch('userinfo/setAddress', address.data)
            }
          }
        }
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      if (/\/layout/.test(to.path)) {
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
