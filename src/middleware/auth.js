import app from '~/plugins/firebase'

export default function({ store, redirect, route }) {
  // 遷移ごとに呼び出されるためstoreに情報があれば処理しない
  if (store.state.user !== null) return

  // 過去にFirebaseユーザー認証しているか
  app.auth().onAuthStateChanged((user) => {
    // 未ログインでルート以外の場合
    if (!user && route.path !== '/') {
      return redirect('/admin')
    }
    // ログイン済みでadminページの場合
    if (user && route.path === '/admin') {
      return redirect('/list')
    }

    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
    store.dispatch('addUser', userInfo)
  })
}
