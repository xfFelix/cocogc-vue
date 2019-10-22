import local from '@/util/local'

let defaultSearch = [];
try{
  if (local.get('searchHis')) {
    let hisInfo = local.get('searchHis').length>10?local.get('searchHis').slice(0,10):local.get('searchHis');
    defaultSearch = hisInfo;
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
    if(val){
      state.searchHis.unshift(val);
    }
    if(state.searchHis.length>10){
      state.searchHis = state.searchHis.slice(0,10);
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
