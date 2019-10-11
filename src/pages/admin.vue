<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          ログイン
        </v-card-title>
        <v-card-text>
          <button @click="signIn">googleログイン</button>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebaseLogin } from '~/plugins/firebase'

export default {
  layout: 'login',
  methods: {
    async signIn() {
      try {
        const user = await firebaseLogin()
        if (user) {
          this.$router.push('/list')
        }
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>
