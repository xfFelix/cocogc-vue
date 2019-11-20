
const state = {
  typeId: 1,
  vendorId:'',
  vendorFlag:false
}

// getters
const getters = {
  getTypeId: state => {
    return state.typeId
  },
  getTypeName: state => {
    return state.vendorId
  },
  getVendorFlag:state=>{
    return state.vendorFlag
  }
}

// actions
const actions = {
  setTypeId ({commit}, typeId) {
    commit('setTypeId', typeId)
  },
  setVendorFlag ({commit}, vendorFlag) {
    commit('setVendorFlag', vendorFlag)
  },
  initConfig({commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setTypeId(state, typeId) {
    switch (typeId){
      case 1:
        state.vendorId ='jingDong';
        break;
      case 2:
        state.vendorId ='yeyun';
        break;
      case 3:
        state.vendorId ='WangYiYanXuan';
        break;
      case 4:
        state.vendorId ='TianYaYanXuan';
        break;
      default :
        state.vendorId ='';  //
        break;
    }
    state.typeId = typeId;
  },
  initConfig(state) {
    state.typeId=1;
    state.vendorId='';
  },
  setVendorFlag(state,vendorFlag) {
    console.log(vendorFlag)
    state.vendorFlag = vendorFlag;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
