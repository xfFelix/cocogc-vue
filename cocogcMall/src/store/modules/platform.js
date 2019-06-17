import local from '@/util/local'

let defaultPlatform = 0
let defaultVendorId = ''
try{
  if (local.get('platform')) {
    defaultPlatform = local.get('platform')
    defaultVendorId = local.get('vendorId')
  }
} catch(e) {
  console.error(e)
}

const state = {
  platform: defaultPlatform,
  vendorId: defaultVendorId
}

// getters
const getters = {
  getPlatform: state => {
    return state.platform
  },
  getVendorId: state => {
    return state.vendorId
  }
}

// actions
const actions = {
  setPlatform ({state, commit}, platform) {
    commit('setPlatform', platform)
  },
  setVendorId ({state, commit}, vendorId) {
    commit('setVendorId', vendorId)
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
  setVendorId(state, vendorId) {
    state.vendorId = vendorId
    try {
      local.set('vendorId',vendorId)
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
