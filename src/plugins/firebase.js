import firebase from 'firebase'
const app = firebase.initializeApp(process.env.firebaseConfig)

export const storage = app.storage()
export const db = app.firestore()
export default app
