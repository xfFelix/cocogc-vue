import {getToken, setToken, getParam,delToken} from '@/util/common'
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
          }else{
            delToken(param.token);
          }
        }
      }
    } catch(e) {
      // alert(e)
    }

    try {
      var _token = getToken();
      const info = await axios(infoURl + api.info, {token: _token}, 'post');
      if(info.error_code == 0)
      {
        store.dispatch('userinfo/setUserInfo', info.data);
        if (to.path.includes('layout')) {
          //获取购物车数据
          const cart = await axios(testUrl + api.totalCarts,{token: _token},'post');
          if(cart.error_code == 0 && cart.data)
            store.dispatch('cart/setNum', cart.data);
        }
      }
      if (to.meta.requireAuth && info.error_code == 0){
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
      }else if(info.error_code != 0){
        delToken(_token);
        //需要登录且未登录，跳转登录
        if(to.meta.requireAuth){
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            });
            return ;
        }
      }
    } catch (e) {
      // alert(e)
    }

    next()
  });
  router.afterEach( ( to, from, next ) => {
    setTimeout(()=>{
            var _hmt = _hmt || [];
            (function() {
                //每次执行前，先移除上次插入的代码
                document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?691736653bc9daafe84e2286c9838720";
                hm.id = "baidu_tj"
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
    },0);
  });
}
