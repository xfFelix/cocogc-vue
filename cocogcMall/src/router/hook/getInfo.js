import {getToken, setToken, getParam} from '@/util/common'
import api from '@/service/api'
import axios from '@/service/http'
import store from '@/store/index'
export default (router) => {
  router.beforeEach(async(to, from, next) => {
    try {
      if (location.href.indexOf('?') != -1) {
        const param = getParam()
        if (param && param.token)
        {
          const user = await axios(infoURl + api.info, {token: param.token}, 'post');
          if(user.error_code == 0)
          {
            setToken(param.token);
            store.dispatch('userinfo/setUserInfo', user.data)
          }
        }
      }
    } catch(e) {
      alert(e)
    }

    try {
      var _token = getToken();

      const info = await axios(infoURl + api.info, {token: _token}, 'post');
      if(info.error_code == 0)
      {
        store.dispatch('userinfo/setUserInfo', info.data);

        //获取购物车数据
        const cart = await axios(testUrl + api.totalCarts,{token: _token},'post');
        if(cart.error_code == 0 && cart.data)
          store.dispatch('cart/setNum', cart.data);
      }
    } catch (e) {
      alert(e)
    }

    if (to.meta.requireAuth && info.error_code == 0)
    {
      //需要登录且已经登录
      //获取地址
      // if (/^\/layout\/shopCart$/.test(to.path))
      // {
      //   const address = await axios(testUrl + api.selectDefaultAddresses, {token: _token}, 'post');
      //   if (address.error_code == 0 && address.data)
      //   {
      //     localStorage.setItem('addressId', address.data.id);
      //     store.dispatch('userinfo/setAddress', address.data)
      //   }
      // }
    }else if(to.meta.requireAuth && info.error_code != 0){
      //需要登录且未登录，跳转登录
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return ;
    }
    next()
  });
}
