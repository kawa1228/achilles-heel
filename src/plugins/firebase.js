import firebase from 'firebase'
const app = firebase.initializeApp(process.env.firebaseConfig)

// Firestore
export const db = app.firestore()
// ストレージ
export const storage = app.storage()
// auth認証
const provider = new firebase.auth.GoogleAuthProvider()
export const firebaseLogin = () => {
  return app.auth().signInWithPopup(provider)
}

export default app
