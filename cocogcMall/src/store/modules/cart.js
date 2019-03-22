// initial state
// shape: [{ id, quantity }]
const state = {
  num: 0
}

// getters
const getters = {
  getNum: state => {
    return state.num
  }
}

// actions
const actions = {
  setNum ({state, commit}, num) {
    commit('setNum', num)
  }
}

// mutations
const mutations = {
  setNum(state, num) {
    state.num = num
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
