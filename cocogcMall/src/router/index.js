import Vue from 'vue';
import Router from 'vue-router';

import home from '@/pages/home/index';
import goodsDetail from '@/pages/home/goodsDetail'; //商品详情页
import goodsList from '@/pages/home/goodsList'; //列表页
import searchPage from '@/pages/home/searchPage'; //列表页


import classify from '@/pages/classify/classify';
import shopMall from '@/pages/shopMall/shopMall';

import account from '@/pages/account/account';
import setUp from '@/pages/account/setUp';
import addressMag from '@/pages/shopCart/addressMag';
import addressEdit from '@/pages/shopCart/addressEdit';



import shopCart from '@/pages/shopCart/shopCart';
import order from '@/pages/shopCart/order';
import orderManage from '@/pages/shopCart/orderManage';
import orderDetails from '@/pages/shopCart/orderDetails';
import logisticsDetail from '@/pages/shopCart/logisticsDetail';



import login from '@/pages/loginRegister/login';
import passSetUp from '@/pages/loginRegister/passSetUp';
import passSetSucess from '@/pages/loginRegister/passSetSucess';
import register from '@/pages/loginRegister/register';
import registerSucess from '@/pages/loginRegister/registerSucess';
import { homedir } from 'os';

import Layout from '@/pages/layout/Layout'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/layout/home',
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
          meta: { title: '首页' },
        },
        {
          path: 'shopMall',
          name: 'shopMall',
          component: shopMall,
          meta: { title: '商城' },
        },
        {
          path: 'shopCart',
          name: 'shopCart',
          component: shopCart,
          meta: { title: '购物车' },
        },
        {
          path: 'account',
          name: 'account',
          component: account,
          meta: { title: '账户' },
        },
        {
          path: 'classify',
          name: 'classify',
          component: classify,
          meta: { title: '分类' },
        }
      ]
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage,
      meta: { title: '搜索列表' },
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList,
      meta: { title: '商品列表' },
    },
    {
      path: '/addressMag',
      name: 'addressMag',
      component: addressMag,
      meta: { title: '地址管理' },

    },
    {
      path: '/addressEdit',
      component: addressEdit,
      meta: { title: '编辑地址' },
      name: 'addressEdit',

    },
    {
      path: '/setUp',
      name: 'setUp',
      component: setUp,
      meta: { title: '设置' },
    },
    {
      path: '/goodsDetail/:goodId',
      name: 'goodsDetail',
      component: goodsDetail,
      meta: { title: '商品详情' },
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: { title: '订单' },
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: orderManage,
      meta: { title: '订单管理' },
    },
    {
      path: '/logisticsDetail',
      name: 'logisticsDetail',
      component: logisticsDetail,
      meta: { title: '物流详情' },
    },
    {
      path: '/orderDetails/:orderId',
      name: 'orderDetails',
      component: orderDetails,
      meta: { title: '订单详情' },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { title: '登录' },
    },
    {
      path: '/passSetUp',
      name: 'passSetUp',
      component: passSetUp,
      meta: { title: '设置密码' },
    },
    {
      path: '/passSetSucess',
      name: 'passSetSucess',
      component: passSetSucess,
      meta: { title: '密码设置成功' },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { title: '注册' },
    },
    {
      path: '/registerSucess',
      name: 'registerSucess',
      component: registerSucess,
      meta: { title: '注册成功' },
    },
  ],
})

