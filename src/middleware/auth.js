import { app } from '~/plugins/firebase'

export default ({ store, route }) => {
  // 遷移ごとに呼び出されるためstoreに情報があれば処理しない
  if (store.state.user !== null) return

  // 過去にFirebaseユーザー認証しているか
  app.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in.
      console.log('user情報の確認', user)
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      }
      await store.dispatch('addUser', userInfo)
    } else {
      // No user is signed in.
      console.log('ログインしてください')
    }
  })
}
