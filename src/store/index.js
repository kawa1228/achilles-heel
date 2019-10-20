import Vue from 'vue'
import Vuex from 'vuex'

import { firebaseLogin, firebaseLogout } from '~/plugins/firebase'
Vue.use(Vuex)

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    Vue.set(state, 'user', payload)
  },
  clearUser(state) {
    Vue.set(state, 'user', null)
  }
}

export const actions = {
  // adminページからの初回ログイン
  async fetchUser({ state, dispatch }) {
    if (state.user !== null) return

    const res = await firebaseLogin().catch((err) => {
      alert('ログインエラー', err)
      throw err
    })
    if (!res) {
      alert('ユーザー情報がありません')
      return
    }
    const user = res.additionalUserInfo.profile
    console.log('初回ログイン', user)
    const userInfo = {
      displayName: user.name ? user.name : 'sample',
      email: user.email ? user.email : 'xxx@sample.com',
      photoURL: user.picture ? user.picture : 'https://placehold.jp/150x150.png'
    }
    dispatch('addUser', userInfo)
  },
  // ユーザー情報の追加
  addUser(context, payload) {
    context.commit('setUser', payload)
  },
  async logoutUser({ state, dispatch }) {
    if (!state.user) return
    await firebaseLogout().catch((err) => {
      alert('ログアウトエラー', err)
    })
    dispatch('clearUser')
  },
  clearUser({ commit }) {
    commit('clearUser')
  }
}
