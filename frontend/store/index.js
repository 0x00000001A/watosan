import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      authorized: false
    },
    mutations: {
      setAuthorized (state, value) {
        state.authorized = value
      }
    }
  })
}

export default createStore
