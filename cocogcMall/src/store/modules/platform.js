import local from '@/util/local'

let defaultPlatform = 0
try{
  if (local.get('platform')) {
    defaultPlatform = local.get('platform')
  }
} catch(e) {
  console.error(e)
}

const state = {
  platform: defaultPlatform,
}

// getters
const getters = {
  getPlatform: state => {
    return state.platform
  }
}

// actions
const actions = {
  setPlatform ({state, commit}, platform) {
    commit('setPlatform', platform)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
