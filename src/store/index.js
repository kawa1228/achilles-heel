import Vue from 'vue'
import Vuex from 'vuex'

import { firebaseLogin } from '~/plugins/firebase'
Vue.use(Vuex)

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    Vue.set(state, 'user', payload)
  }
}

export const actions = {
  // adminページからログインしたとき
  async fetchUser({ state, dispatch }) {
    if (state.user !== null) return

    const user = await firebaseLogin().catch((err) => {
      alert('ログインエラー', err)
    })
    if (!user) {
      alert('ユーザー情報がありません')
      return
    }
    const userInfo = {
      displayName: user.name,
      email: user.email,
      photoURL: user.picture
    }
    dispatch('addUser', userInfo)
  },
  addUser(context, payload) {
    context.commit('setUser', payload)
  }
}
