<template>
  <section>
    <h1>list</h1>
    <button @click="onClick">追加</button>
    <nuxt-link to="/new">
      <button>投稿</button>
    </nuxt-link>
  </section>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  mounted() {
    this.addUsers()
    this.posts()
    // this.setCities()
  },
  methods: {
    onClick() {
      console.log('hoge')

      /*
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
          })
        })
      */
    },
    addUsers() {
      /*
      todo: authを追加したら適用する
      const auther = pp.auth().currentUser.displayName
      */
      const usersRef = db.collection('users')
      usersRef.doc('sumi').set({
        name: 'sumi'
      })
    },
    async posts() {
      /*
      プロフィール情報変更などで author の name などが変わってしまった場合、
      紐付いたpostsすべての author 情報変更が必要

      1. posts から特定の author のドキュメント群を取得
      2. 取得された posts ドキュメント全件の author データを更新
      参考: https://medium.com/google-cloud-jp/firestore2-920ac799345c
      */
      const docRef = db.collection('users').doc('sumi')
      let auther = {}

      await docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            auther = doc.data()
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      db.collection('posts').add({
        authorId: auther,
        body: '内容',
        title: 'タイトル'
      })
    },
    sampleAddUser() {
      db.collection('users')
        .add({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })

      /* Add a second document with a generated ID. */
      db.collection('users')
        .add({
          first: 'Alan',
          middle: 'Mathison',
          last: 'Turing',
          born: 1912
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    },
    setCities() {
      // Add a new document in collection "cities"
      const citiesRef = db.collection('cities')

      citiesRef.doc('SF').set({
        name: 'San Francisco',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 860000,
        regions: ['west_coast', 'norcal']
      })
      citiesRef.doc('LA').set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000,
        regions: ['west_coast', 'socal']
      })
      citiesRef.doc('DC').set({
        name: 'Washington, D.C.',
        state: null,
        country: 'USA',
        capital: true,
        population: 680000,
        regions: ['east_coast']
      })
      citiesRef.doc('TOK').set({
        name: 'Tokyo',
        state: null,
        country: 'Japan',
        capital: true,
        population: 9000000,
        regions: ['kanto', 'honshu']
      })
      citiesRef.doc('BJ').set({
        name: 'Beijing',
        state: null,
        country: 'China',
        capital: true,
        population: 21500000,
        regions: ['jingjinji', 'hebei']
      })
    },
    getCity() {
      const docRef = db.collection('cities').doc('SF')

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data())
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },
    getCities() {
      db.collection('cities')
        .where('capital', '==', true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>
