import local from '@/util/local'
import api from '@/service/api'
import axios from '@/service/http'
import {getToken} from '@/util/common'
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

let defaultAddress = ''
try{
  if (local.get('address')) {
    defaultUser = local.get('address')
  }
} catch(e) {
  console.error(e)
}

const state = {
  userinfo: defaultUser,
  address: defaultAddress
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
  },
  async checkAddress({state, dispatch}) {
    if (state.address) {
      return state.address
    } else {
      let address = await axios(testUrl + api.selectDefaultAddresses, {token: getToken()}, 'post')
      if (address.error_code) {
        await dispatch('setAddress', '')
        return state.address
      }
      await dispatch('setAddress', address.data)
      try {
        local.set('address', address.data)
      }catch(e) {
        console.error(e)
      }
      return state.address
    }
  },
  removeAddressById({commit}, id) {
    commit('removeAddressById', id)
  },
  removeAddress({commit}) {
    commit('removeAddress')
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
  },
  removeAddressById(state, id) {
    if (state.address.id === id) {
      state.address = ''
      try{
        local.remove('address')
      } catch(e) {
        console.error(e)
      }
    }
  },
  removeAddress(state) {
    state.address = ''
    try{
      local.remove('address')
    } catch(e) {
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
