import { app } from '~/plugins/firebase'

export default async function({ store, redirect, route }) {
  console.log('store', store.state.user)
  console.log('route', route)
  // 遷移ごとに呼び出されるためstoreに情報があれば処理しない
  if (store.state.user !== null) return

  // 過去にFirebaseユーザー認証しているか
  const user = await app.auth().currentUser
  console.log('user情報の確認', user)

  // 未ログインの場合
  if (!user) {
    console.log('ログインしてください')
    return
  }
  const userInfo = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  }
  await store.dispatch('addUser', userInfo)
  return redirect(`/${userInfo.uid}/list`)
}
