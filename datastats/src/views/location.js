// src/store/modules/location.js
const state = {
    region: 'default-region', // 默认区域信息
  };
  
  const mutations = {
    setRegion(state, newRegion) {
      state.region = newRegion;
    }
  };
  
  const getters = {
    getRegion: (state) => state.region,
  };
  
  export default {
    state,
    mutations,
    getters,
  };
  