// src/store/index.js
import { createStore } from 'vuex'
import axios from 'axios'
import members from './members';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    members,
  },
  state: {
    data: 'Test',
    isLoading: false,
    error: '404',
  },
  mutations: {
    setData(state, payload) {
      console.log('setData mutation triggered with:', payload);
      state.data = payload;
    },
    setLoading(state, flag) {
      state.isLoading = flag;
    },
    setError(state, error) {
      state.error = error;
    },
    
  },
  actions: {

  },
  getters: {
    getData: (state) => state.data,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },
  plugins: [  
    createPersistedState({  
      key: 'myCustomKey', 
      paths: ['data','members.data','error','members.error'],  
      storage: window.localStorage  
    })  
  ]
})
