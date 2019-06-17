import local from '@/util/local'

let defaultPlatform = 0
let defaultVenderId = ''
try{
  if (local.get('platform')) {
    defaultPlatform = local.get('platform')
    defaultVenderId = local.get('venderId')
  }
} catch(e) {
  console.error(e)
}

const state = {
  platform: defaultPlatform,
  venderId: defaultVenderId
}

// getters
const getters = {
  getPlatform: state => {
    return state.platform
  },
  getVenderId: state => {
    return state.venderId
  }
}

// actions
const actions = {
  setPlatform ({state, commit}, platform) {
    commit('setPlatform', platform)
  },
  setVenderId ({state, commit}, venderId) {
    commit('setVenderId', venderId)
  }
}

// mutations
const mutations = {
  setPlatform(state, platform) {
    state.platform = platform
    try {
      local.set('platform',platform)
    }catch(e) {
      console.error(e)
    }
  },
  setVenderId(state, venderId) {
    state.venderId = venderId
    try {
      local.set('venderId',venderId)
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
