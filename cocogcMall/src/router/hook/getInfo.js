import {getToken} from '@/util/common'
import api from '@/service/api'
import axios from '@/service/http'

export default (router) => {
  router.beforeEach(async(to, from, next) => {
    if (getToken()) {// 判断是否登录
      let data = await axios(infoURl + api.info, {token: getToken()}, 'post')
      localStorage.setItem('userName', data.data.userName);
      localStorage.setItem('score', data.data.score);
      localStorage.setItem('isRealCert', data.data.isRealCert);
      next()
    } else {
      if (to.meta.requireAuth) {// 判断是否需要登录权限
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
        console.log(to)
      } else {
        next()
      }
    }
  })
}
