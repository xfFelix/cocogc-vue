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
  setNum ({commit}, num) {
    commit('setNum', num)
  },
  incrementNum({commit}) {
    commit('incrementNum')
  },
  decrementNum({commit}) {
    commit('decrementNum')
  }
}

// mutations
const mutations = {
  setNum(state, num) {
    state.num = num
  },
  incrementNum(state) {
    state.num++
  },
  decrementNum(state) {
    if (state.num > 0) {
      state.num--
    } else {
      state.num = 0
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
