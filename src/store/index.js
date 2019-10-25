import Vue from 'vue'
import Vuex from 'vuex'

import { firebaseLogin, firebaseLogout, storage, db } from '~/plugins/firebase'

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
    console.log('初回ログイン', res)

    const profile = res.additionalUserInfo.profile
    // todo: articlesが初期化されちゃうからuserにarticleを持たせるのをやめるwhereFieldして取得する
    const userInfo = {
      displayName: profile.name || 'sample',
      email: profile.email || 'xxx@sample.com',
      photoURL: profile.picture || 'https://placehold.jp/150x150.png',
      uid: res.user.uid
    }

    const userRef = db.collection('users')
    await userRef.doc(userInfo.uid).set(userInfo)
    dispatch('addUser', userInfo)
  },
  // ユーザー情報の追加
  addUser(context, payload) {
    console.log('hoge')
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
  },
  // noteを投稿
  async postNote(context, payload) {
    const contents = payload
    const loadImage = await context.dispatch('uploadImage', {
      name: contents.image.name,
      file: contents.image.file
    })
    contents.image = loadImage
    contents.uid = context.state.user.uid
    contents.author = context.state.user

    const articlesRef = db.collection('articles')
    // articleコレクションを更新
    await articlesRef.add(contents)
  },
  // ストレージに画像を追加
  uploadImage(context, payload) {
    if (!payload.file) {
      return {
        name: 'サンプル画像',
        src: 'https://placehold.jp/150x150.png'
      }
    }
    const storageRef = storage.ref()

    return new Promise((resolve, reject) => {
      storageRef
        .child(`images/${payload.name}`)
        .put(payload.file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            resolve({ name: payload.name, src: url })
          })
        })
        .catch((err) => {
          console.log('画像投稿エラー', err)
        })
    })
  }
}
