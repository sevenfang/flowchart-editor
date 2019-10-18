import Vue from 'vue'
import Vuex from 'vuex'

import flowchart from './modules/flowchart'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        flowchart
    },
    getters,
})