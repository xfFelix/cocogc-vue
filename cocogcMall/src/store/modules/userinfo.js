// initial state
// shape: [{ id, quantity }]
const state = {
  userinfo: {},
  address: {}
}

// getters
const getters = {
  getUserInfo: state => {
    return state.userinfo
  },
  getAddress: state => {
    return state.address
  }
}

// actions
const actions = {
  setUserInfo ({state, commit}, userinfo) {
    commit('setUserInfo', userinfo)
  },
  setAddress ({commit}, address) {
    commit('setAddress', address)
  }
}

// mutations
const mutations = {
  setUserInfo(state, userinfo) {
    state.userinfo = userinfo
  },
  setAddress(state, address) {
    state.address = address
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
