import local from '@/util/local'
// initial state
// shape: [{ id, quantity }]
let defaultUser = ''
try{
  if (local.get('userinfo')) {
    defaultUser = local.get('userinfo')
  }
} catch(e) {
  console.error(e)
}

const state = {
  userinfo: defaultUser,
  address: ''
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
    try {
          local.set('userinfo',userinfo)
    }catch(e) {
      console.error(e)
    }
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
