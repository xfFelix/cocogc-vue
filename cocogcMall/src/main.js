// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './service/http'
import * as filters from './util/filter.js';
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();
// import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import '../static/css/style.css';
import '../static/css/animate.css';
import VueCookie from 'vue-cookies';
import VueLazyload from 'vue-lazyload';
import store from './store/index.js'
import Tips from './common/tips'
import NoData from './common/NoData'
import FastClick from 'fastclick'
import infiniteScroll from 'vue-infinite-scroll'
// import './directives'
Vue.use(infiniteScroll)
// import Vconsole from 'vconsole'
// new Vconsole();
FastClick.attach(document.body);

Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component('no-data', NoData)

Vue.use(VueCookie);
Vue.use(Tips);

//mint-ui
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import {
  MessageBox,
  Indicator,
  Toast,
  Spinner,
  InfiniteScroll,
  TabContainer,
  TabContainerItem,
  Navbar,
  TabItem
} from "mint-ui";
Vue.use(InfiniteScroll);
Vue.use(TabContainer);
Vue.use(TabContainerItem);
Vue.use(Navbar);
Vue.use(TabItem);


window.Toast= Toast;
window.MessageBox= MessageBox;
window.Indicator= Indicator;

Vue.prototype.Toast = Toast;
Vue.prototype.MessageBox = MessageBox;
Vue.prototype.Indicator = Indicator;



Vue.prototype.hideLoading = function () {
  Indicator.close();
};

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/images/loading.jpg',
  loading: 'static/images/loading.jpg',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
Vue.config.productionTip = false

Vue.prototype.axios = axios;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
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

