import store from '@/store/index'
import {getParam, getCookie} from '@/util/common'

export default (router) => {
  router.beforeEach((to, from, next) => {
    let cookieVendorId = getCookie('vendorId')
    if (getParam().vendorId || cookieVendorId) {
      store.dispatch('platform/setVendorId', getParam().vendorId || cookieVendorId)
    }
    next()
  });
}
