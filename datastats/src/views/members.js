

export default ({
  namespaced: true,
  state: {
    data: 'jsonData',
    error: null,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {

  },
  getters: {
    getData: (state) => state.data,
    getError: (state) => state.error,
  }
})
