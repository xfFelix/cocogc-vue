import local from '@/util/local'

let defaultPlatform = 0
let defaultVendorId = ''
let defaultVendorUid = ''
try{
  if (local.get('platform')) {
    defaultPlatform = local.get('platform')
    defaultVendorId = local.get('vendorId')
    defaultVendorUid = local.get('vendorUid')
  }
} catch(e) {
  console.error(e)
}

const state = {
  platform: defaultPlatform,
  vendorId: defaultVendorId,
  vendorUid: defaultVendorUid
}

// getters
const getters = {
  getPlatform: state => {
    return state.platform
  },
  getVendorId: state => {
    return state.vendorId
  },
  getVendorUid: state => {
    return state.vendorUid
  }
}

// actions
const actions = {
  setPlatform ({state, commit}, platform) {
    commit('setPlatform', platform)
  },
  setVendorId ({state, commit}, vendorId) {
    commit('setVendorId', vendorId)
  },
  setVendorUid ({state, commit}, vendorUid) {
    commit('setVendorUid', vendorUid)
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
  },
  setVendorUid(state, vendorUid) {
    state.vendorUid = vendorUid
    try {
      local.set('vendorUid',vendorUid)
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
