import local from '@/util/local'
import api from '@/service/api'
import axios from '@/service/http'
import {getToken} from '@/util/common'
// initial state
// shape: [{ id, quantity }]
let defaultGoodsList = ''
try{
  if (local.get('goodsList')) {
    defaultGoodsList = local.get('goodsList')
  }
} catch(e) {
  console.error(e)
}

const state = {
  goodsList: defaultGoodsList
}

// getters
const getters = {
  getGoodsList: state => {
    return state.goodsList
  }
}

// actions
const actions = {
  setGoodsList ({state, commit}, scroll) {
    commit('setGoodsList', scroll)
  }
}

// mutations
const mutations = {
  setGoodsList(state, scroll) {
    state.goodsList = scroll
    try {
      local.set('goodsList',scroll)
    }catch(e) {
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
