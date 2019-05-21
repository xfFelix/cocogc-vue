const state = {
  password: ''
}

// getters
const getters = {
  getPassword: state => {
    return state.password
  }
}

// actions
const actions = {
  setPassword ({state, commit}, password) {
    commit('setPassword', password)
  },
  clearPassword ({state, commit}) {
    commit('clearPassword')
  }
}

// mutations
const mutations = {
  setPassword(state, password) {
    state.password = password
  },
  clearPassword(state) {
    state.password = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
