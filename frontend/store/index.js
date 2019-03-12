const state = () => ({
  authorized: false
})

const mutations = {
  setAuthorized (state, value) {
    state.authorized = value
  }
}

export default {
  state,
  mutations
}
