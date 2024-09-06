import RequestAPI from "../api/RequestAPI";
import jsonData from '../assets/json/attendance.json';
import Notification from '../utils/Notification.js'

export default ({
  namespaced: true,
  state: {
    data: jsonData,
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
    async fetchData({ commit, rootState }) {
      const region = rootState.datastats.region;
      
      //commit('setLoading', true);
      try {
        const response = await RequestAPI.GetAttendanceData(region);
        commit('setData', response.data);
      }
      catch (err) {
        let title = "GetAttendanceData";
        let msg;
        if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.details) {
          msg = err.response.data.errors.details;
        } else {
          msg = err.message || 'An error occurred';
        }
        if (err.response && err.response.status) {
          if (err.response.status === 500) {
            Notification.open500(title, msg);
          }
          if (err.response.status === 404) {
            commit('setData', jsonData);
            Notification.open404(title, msg);
          }
        }
      }
      finally {
        //commit('setLoading', false); 
      }
    }
  },
  getters: {
    getData: (state) => state.data,
    getError: (state) => state.error,
  }
})
