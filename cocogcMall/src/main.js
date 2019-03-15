// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './service/http'
import * as filters from './util/filter.js';
// import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import '../static/css/style.css';
import VueCookie from 'vue-cookies';
import VueLazyload from 'vue-lazyload';

import Tips from './common/tips'


Vue.component(Spinner.name, Spinner)
Vue.use(VueCookie);
Vue.use(Tips);

//mint-ui
import 'mint-ui/lib/style.css'
import {
  MessageBox,
  Indicator,
  Toast,
  Spinner//无限滚动
} from "mint-ui";

Vue.prototype.Toast = Toast;
Vue.prototype.Messagebox = MessageBox;
Vue.prototype.Indicator = Indicator;
// Vue.prototype.InfiniteScroll = InfiniteScroll;

Vue.prototype.hideLoading = function () {
  Indicator.close();
};

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'static/images/loading.jpg',
//   loading: 'static/images/loading.jpg',
//   attempt: 1,
//   // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
//   listenEvents: [ 'scroll' ]
// })
Vue.config.productionTip = false

Vue.prototype.axios = axios;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

// router.beforeEach((to, from, next) => {
//     // while (Vue.Cancel.length > 0) {
//     //     Vue.Cancel.shift()('cancel');
//     // }
//     // next();
//     console.log(to);
//     console.log(from)
//     console.log(next)
//     console.log('路由切换')
// })

