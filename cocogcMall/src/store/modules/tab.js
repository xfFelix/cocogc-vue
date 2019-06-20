import local from '@/util/local'
// initial state
// shape: [{ id, quantity }]
let defaultList = ''
try {
  defaultList = local.get('tab_list')
}catch(e) {
  console.log(e)
}
const state = {
  list: defaultList || [
    { title: '首页', path: 'home', icon: 'navGo01', iconGreen: 'navGo11', name: 'home' },
    { title: '商城', path: 'shopMall', icon: 'navGo02', iconGreen: 'navGo12', name: 'shopMall' },
    { title: '分类', path: 'classify', icon: 'navGo03', iconGreen: 'navGo13', name: 'classify' },
    { title: '购物车', path: 'shopCart', icon: 'navGo04', iconGreen: 'navGo14', name: 'shopCart' },
    { title: '我的', path: 'account', icon: 'navGo05', iconGreen: 'navGo15', name: 'account' },
  ]
}

// getters
const getters = {
  getList: state => {
    return state.list
  }
}

// actions
const actions = {
  setList ({commit}, obj) {
    commit('setList', obj)
  }
}

// mutations
const mutations = {
  setList(state, obj) {
    let home = state.list[0]
    let newHome = {
      ...home,
      ...obj
    }
    state.list.splice(0,1, newHome)
    try {
      local.set('tab_list', state.list)
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
