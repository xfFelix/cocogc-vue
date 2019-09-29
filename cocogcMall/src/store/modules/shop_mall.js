// initial state
// shape: [{ id, quantity }]
import local from '@/util/local'

let defaultShow = false
try{
  let res = local.get('shop_mall_banner_show')
  if (res || res === null || res === undefined || res === '') {
    defaultShow = true
  } else {
    defaultShow = false
  }
} catch(e) {
  console.error(e)
}

const state = {
  showBanner: defaultShow
}

// getters
const getters = {
  getShowBanner: state => {
    return state.showBanner
  }
}

// actions
const actions = {
  setShowBanner ({commit}, val) {
    commit('setShowBanner', val)
  },
}

// mutations
const mutations = {
  setShowBanner(state, val) {
    state.showBanner = val.val
    try {
      local.set('shop_mall_banner_show', state.showBanner, val.expireTime)
    }catch(e) {
      console.error(e)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
