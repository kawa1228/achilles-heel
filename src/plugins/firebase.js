import firebase from 'firebase'
const app = firebase.initializeApp(process.env.firebaseConfig)

export const storage = app.storage()
export const db = app.firestore()

// auth認証
const provider = new firebase.auth.GoogleAuthProvider()
export const firebaseLogin = () => {
  return app.auth().signInWithPopup(provider)
}

export default app
