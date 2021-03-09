import Vue from 'vue';
import Vuex from 'vuex';

import qqmapsdk from './modules/qqmapsdk';
import user from './modules/user';
import all from './modules/all';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        all,
        qqmapsdk
    },
    getters,
    actions
});
