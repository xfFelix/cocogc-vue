import local from '@/util/local'
import api from '@/service/api'
import axios from '@/service/http'
import {getToken} from '@/util/common'
// initial state
// shape: [{ id, quantity }]

const state = {
  goodsList: 0,
  scrollCart: 0
}

// getters
const getters = {
  getGoodsList: state => {
    return state.goodsList
  },
  getScrollCart: state => {
    return state.scrollCart
  }
}

// actions
const actions = {
  setGoodsList ({state, commit}, scroll) {
    commit('setGoodsList', scroll)
  },
  setScrollCart ({state, commit}, scroll) {
    commit('setScrollCart', scroll)
  }
}

// mutations
const mutations = {
  setGoodsList(state, scroll) {
    state.goodsList = scroll
  },
  setScrollCart(state, scroll) {
    state.scrollCart = scroll
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
