import firebase from 'firebase'

export const app = firebase.initializeApp(process.env.firebaseConfig)

// Firestore
export const db = app.firestore()
// フィールドの配列を追加
export const arrayUnion = (contents) => {
  return firebase.firestore.FieldValue.arrayUnion(contents)
}
// ストレージ
export const storage = app.storage()
// auth認証
const provider = new firebase.auth.GoogleAuthProvider()
export const firebaseLogin = () => {
  return app.auth().signInWithPopup(provider)
}
export const firebaseLogout = () => {
  return app.auth().signOut()
}
