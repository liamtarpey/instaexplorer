import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	popupVisible: false,
    popupData: {}
};

const getters = {
	getPopupVisible: (state) => state.popupVisible,
	getPopupData: (state) => state.popupData
};

const mutations = {
	togglePopup(state) {
		state.popupVisible = !state.popupVisible;
	}
};

const actions = {};

export const store = new Vuex.Store({
    state,
  	getters,
    mutations,
    actions
});
