// initial state
// shape: [{ id, quantity }]
import local from '@/util/local'

let defaultShow = false
let defaultTime = 0
try{
  let res = local.get('home_banner_display')
  defaultTime = local.get('home_banner_time')
  if (res || res === null || res === undefined || res === '') {
    defaultShow = true
  } else {
    defaultShow = false
  }
} catch(e) {
  console.error(e)
}

const state = {
  showBanner: defaultShow,
  time: defaultTime
}

// getters
const getters = {
  getShowBanner: state => {
    return state.showBanner
  },
  getShowTime: state => state.time
}

// actions
const actions = {
  setShowBanner ({commit}, val) {
    commit('setShowBanner', val)
  },
  setShowTime: ({commit}, val) => commit('setShowTime', val)
}

// mutations
const mutations = {
  setShowBanner(state, val) {
    state.showBanner = val
    try {
      local.set('home_banner_display', state.showBanner)
    }catch(e) {
      console.error(e)
    }
  },
  setShowTime(state, val) {
    state.time = val
    try {
      local.set('home_banner_time', state.time)
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
