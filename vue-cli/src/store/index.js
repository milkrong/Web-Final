import Vue from 'vue'
import Vuex from 'vuex'

import userState from './user_state'
import rStep from './register_step'
import rUser from './register_user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    luser: userState,
    rstep: rStep,
    ruser: rUser
  }
})
