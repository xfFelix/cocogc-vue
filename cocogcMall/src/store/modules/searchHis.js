import local from '@/util/local'

let defaultSearch = [];
try{
  if (local.get('searchHis')) {
    defaultSearch = local.get('searchHis')
  }
} catch(e) {
  console.error(e)
}

const state = {
  searchHis: defaultSearch
}

// getters
const getters = {
  getSearchHis: state => {
    return state.searchHis
  },
}

// actions
const actions = {
  setSearchHis ({state, commit}, val) {
    commit('setSearchHis', val)
  },
}

// mutations
const mutations = {
  setSearchHis(state, val) {
    console.log(val)
    if(val){
      state.searchHis.unshift(val);
    }
    if(state.searchHis.length>20){
      state.searchHis = state.searchHis.slice(0,20);
    }
    try {
      local.set('searchHis',state.searchHis)
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
